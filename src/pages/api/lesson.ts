import { Lesson } from "@/types/lesson.type";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "../../shared/http-status-code.enum";
const TABLE = "Lesson";
// control handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Lesson>
) {
  if (req["method"] === "POST") return post(req, res);
  else if (req["method"] === "GET") return get(req, res);
  else if (req["method"] === "DELETE") return remove(req, res);
  else if (req["method"] === "PUT" || req["method"] === "PATCH")
    return put(req, res);
  return res.status(HttpStatusCode.NotFound);
}
/**
 * @url /api/lesson
 * @description create lesson
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = req["body"] as Lesson;
  // check if body exist or not
  if (!body || !Object.keys(body).length)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "there no fields to update",
      code: HttpStatusCode.BadRequest,
    });
  if (!body["subject_id"])
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] subject_id is messing",
      code: HttpStatusCode.BadRequest,
    });
  const { data, error } = await supabase
    .from(TABLE)
    .insert<Lesson>([
      {
        title: body["title"],
        status: true,
        subject_id: body["subject_id"],
      },
    ])
    .select();
  if (data) {
    const _data = data[0] as Lesson;
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

  if (data && data[0]) return data[0] as Lesson;
  return null;
}
/**
 * @url /api/lesson
 * @description get all lesson
 *
 * @url /api/lesson?id=
 * @description get lesson by id
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
      .select()
      .eq("isActive", true)
      .eq("isDeleted", false);
    if (data) return res.status(HttpStatusCode.Ok).json(data as Lesson[]);
    else
      return res
        .status(HttpStatusCode.NotFound)
        .json({ message: error["message"], code: HttpStatusCode.NotFound });
  }
}
/**
 * @url /api/lesson?id=LESSON_ID
 * @description update lesson data
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
  const { data, error } = await supabase
    .from(TABLE)
    .update(body)
    .eq("id", param["id"])
    .select();
  if (data) return res.status(HttpStatusCode.Accepted).json(data[0]);
  if (error)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] somthing wrong happend",
      code: HttpStatusCode.BadRequest,
    });
  return res.status(HttpStatusCode.NotFound).json({ message: "not found" });
}
/**
 * @url /api/lesson?id=LESSON_ID
 * @description delete lesson
 */
async function remove(req: NextApiRequest, res: NextApiResponse) {
  const body = await getById(req, true, false);
  if (!body)
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: "[FAILED] delete failed, lesson not found" });
  const { data, error } = await supabase
    .from(TABLE)
    .update({ isDeleted: true })
    .eq("id", req.query.id)
    .select();
  if (data)
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: "[SUCCESS] Lesson deleted successfully" });
  return res.status(HttpStatusCode.BadRequest).json({
    message: "[FAILED] somthing wrong happend while deleting lesson",
  });
}
