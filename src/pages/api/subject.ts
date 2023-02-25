import {
  Subject,
  SubjectSchema,
  SubjectUpdateDTOSchema,
} from "@/types/subject.type";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "../../shared/http-status-code.enum";
const TABLE = "Subject";
// control handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subject>
) {
  if (req["method"] === "POST") return post(req, res);
  else if (req["method"] === "GET") return get(req, res);
  else if (req["method"] === "DELETE") return remove(req, res);
  else if (req["method"] === "PUT" || req["method"] === "PATCH")
    return put(req, res);
  return res.status(HttpStatusCode.NotFound);
}
/**
 * @url /api/subject
 * @description create subject
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req["body"] as Subject;
  // check if body exist or not
  const check = SubjectSchema.safeParse(body);
  if (!check.success)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "Invalid data",
      errors: check.error.formErrors.fieldErrors,
      code: HttpStatusCode.BadRequest,
    });
  const { data, error } = await supabase
    .from(TABLE)
    .insert<Subject>([
      {
        title: body["title"],
        status: true,
        level: body["level"],
        language: body["language"],
      },
    ])
    .select();
  if (data) {
    const _data = data[0] as Subject;
    return res.status(HttpStatusCode.Accepted).json(_data);
  }
  return res.status(HttpStatusCode.BadRequest).json({
    message: error["message"],
    code: HttpStatusCode.BadGateway,
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

  if (data && data[0]) return data[0] as Subject;
  return null;
}
/**
 * @url /api/subject
 * @description get all subject
 *
 * @url /api/subject?id=
 * @description get subject by id
 */
async function get(req: NextApiRequest, res: NextApiResponse) {
  const param = req["query"];
  if (param && param["id"]) {
    const data = await getById(req);
    if (data) return res.status(HttpStatusCode.Ok).json(data);
    else
      return res.status(HttpStatusCode.NotFound).json({
        message: "[FAILED] user not found or not exist",
        code: HttpStatusCode.NotFound,
      });
  } else {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("isActive", true)
      .eq("isDeleted", false);
    if (data) return res.status(HttpStatusCode.Ok).json(data as Subject[]);
    else
      return res
        .status(HttpStatusCode.NotFound)
        .json({ message: error["message"], code: HttpStatusCode.NotFound });
  }
}
/**
 * @url /api/subject?id=SUBJECT_ID
 * @description update subject data
 */
async function put(req: NextApiRequest, res: NextApiResponse) {
  const body = req["body"];
  const param = req["query"];
  // check if body exist or not
  if (!body || !Object.keys(body).length)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] there no fields to update",
      code: HttpStatusCode.BadRequest,
    });
  // chech if record id exist or not
  if (!param || !param["id"])
    return res.status(HttpStatusCode.NotFound).json({
      message: "[FAILED] id param is messing",
      code: HttpStatusCode.NotFound,
    });
  const check = SubjectUpdateDTOSchema.safeParse(body);
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
  if (error)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] somthing wrong happend",
      code: HttpStatusCode.BadGateway,
    });
  return res.status(HttpStatusCode.NotFound).json({ message: "not found" });
}
/**
 * @url /api/subject?id=SUBJECT_ID
 * @description delete subject
 */
async function remove(req: NextApiRequest, res: NextApiResponse) {
  const body = await getById(req, true, false);
  if (!body)
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: "[FAILED] delete failed, subject not found" });
  const { data, error } = await supabase
    .from(TABLE)
    .update({ isDeleted: true })
    .eq("id", req.query.id)
    .select();
  if (data)
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: "[SUCCESS] Subject deleted successfully" });
  return res.status(HttpStatusCode.BadRequest).json({
    message: "[FAILED] somthing wrong happend while deleting subject",
  });
}
