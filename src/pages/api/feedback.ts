import {
  FeedbackSchema,
  Feedback,
  FeedbackUpdateDTOSchema,
} from "@/types/feedback.type";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "../../shared/http-status-code.enum";
const TABLE = "Feedback";
// control handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback>
) {
  if (req["method"] === "POST") return post(req, res);
  else if (req["method"] === "GET") return get(req, res);
  else if (req["method"] === "DELETE") return remove(req, res);
  else if (req["method"] === "PUT" || req["method"] === "PATCH")
    return put(req, res);
  return res.status(HttpStatusCode.NotFound);
}
/**
 * @url /api/feedback
 * @description create feedback
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req["body"] as Feedback;
  // check if body exist or not
  const check = FeedbackSchema.safeParse(body);
  if (!check.success)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "Invalid data",
      errors: check.error.formErrors.fieldErrors,
      code: HttpStatusCode.BadRequest,
    });
  const { data, error } = await supabase
    .from(TABLE)
    .insert<Feedback>([
      {
        comment: body["comment"],
        user_id: body["user_id"],
        exercise_id: body["exercise_id"],
      },
    ])
    .select();
  if (data) {
    const _data = data[0] as Feedback;
    return res.status(HttpStatusCode.Accepted).json(_data);
  }
  return res.status(HttpStatusCode.BadRequest).json({
    message: error["message"],
    code: HttpStatusCode.BadRequest,
  });
}
/**
 *
 * @param req
 * @param isActive
 * @param isDeleted
 * @returns
 */
async function getById(
  req: NextApiRequest,
  isActive = true,
  isDeleted = false
) {
  const param = req["query"];
  // chech if record id exist or not
  if (!param || !param["id"]) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select()
    .eq("isDeleted", isDeleted)
    .eq("isActive", isActive)
    .eq("id", param["id"]);

  if (data && data[0]) return data[0] as Feedback;
  return null;
}
/**
 * @url /api/feedback
 * @description get all feedback
 *
 * @url /api/feedback?id=
 * @description get feedback by id
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
  const param = req["query"];
  if (param && param["id"]) {
    const data = await getById(req);
    if (data) return res.status(HttpStatusCode.Ok).json(data);
    else
      return res.status(HttpStatusCode.NotFound).json({
        message: "feedback - not found or not exist",
        code: HttpStatusCode.NotFound,
      });
  } else {
    const { data, error } = await supabase
      .from(TABLE)
      .select()
      .eq("isActive", true)
      .eq("isDeleted", false);
    if (data) return res.status(HttpStatusCode.Ok).json(data as Feedback[]);
    else
      return res
        .status(HttpStatusCode.NotFound)
        .json({ message: error["message"], code: HttpStatusCode.NotFound });
  }
}
/**
 * @url /api/feedback?id=FEEDBACK_ID
 * @description update feedback data
 */
async function put(req: NextApiRequest, res: NextApiResponse) {
  const body = req["body"];
  const param = req["query"];

  // chech if record id exist or not
  if (!param || !param["id"])
    return res.status(HttpStatusCode.NotFound).json({
      message: "id param is messing",
      code: HttpStatusCode.NotFound,
    });
  if (!body || Object.keys(body))
    return res.status(HttpStatusCode.BadRequest).json({
      message: "there no data to update, body is messing",
      code: HttpStatusCode.BadRequest,
    });
  // check if body exist or not
  const check = FeedbackUpdateDTOSchema.safeParse(body);
  if (!check.success)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "Invalid data",
      errors: check.error.formErrors.fieldErrors,
      code: HttpStatusCode.BadRequest,
    });
  const { data, error } = await supabase
    .from(TABLE)
    .update(body)
    .eq("id", param["id"])
    .select();
  if (data) return res.status(HttpStatusCode.Accepted).json(data[0]);
  console.log("error ==> ", error);

  if (error)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "somthing wrong happend",
      code: HttpStatusCode.BadRequest,
    });
  return res.status(HttpStatusCode.NotFound).json({ message: "not found" });
}
/**
 * @url /api/feedback?id=FEEDBACK_ID
 * @description delete feedback
 */
async function remove(req: NextApiRequest, res: NextApiResponse) {
  const body = await getById(req, true, false);
  if (!body)
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: "delete failed, feedback not found" });
  const { data, error } = await supabase
    .from(TABLE)
    .update({ isDeleted: true })
    .eq("id", req.query.id)
    .select();
  if (data)
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: "Feedback deleted successfully" });
  return res.status(HttpStatusCode.BadRequest).json({
    message: "somthing wrong happend while deleting feedback",
  });
}
