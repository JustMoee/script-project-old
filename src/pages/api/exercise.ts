import { Exercise, ExerciseSchema, ExerciseUpdateDTOSchema } from "@/types/exercise.type";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "@/shared/http-status-code.enum";
const TABLE = "Exercise";
// control handler
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Exercise>
) {
  if (req["method"] === "POST") return post(req, res);
  else if (req["method"] === "GET") return get(req, res);
  else if (req["method"] === "DELETE") return remove(req, res);
  else if (req["method"] === "PUT" || req["method"] === "PATCH")
    return put(req, res);
  return res.status(HttpStatusCode.NotFound);
}
/**
 * @url /api/exercise
 * @description create exercise
 */
async function post(req: NextApiRequest, res: NextApiResponse) {
  let body = req["body"] as Exercise;
  if(typeof body == 'string')
    body = JSON.parse(body) as Exercise
  // check if body exist or not
  if (!body || !Object.keys(body).length)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "there no fields to update",
      code: HttpStatusCode.BadRequest,
    });
  if (!body["content_id"])
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] content_id is messing",
      code: HttpStatusCode.BadRequest,
    });
  if (body["answers"]) {
    if (Array.isArray(body["answers"]))
      body["answers"] = body["answers"].join(";");
  }
  const check = ExerciseSchema.safeParse(body);
  if (!check.success)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "Invalid data",
      errors: check.error.formErrors.fieldErrors,
      code: HttpStatusCode.BadRequest,
    });
  const { data, error } = await supabase
    .from(TABLE)
    .insert<Exercise>([
      {
        answers: body["answers"],
        content_id: body["content_id"],
        point: body["point"],
        code: body["code"],
        description: body["description"] || '',
        header: body["header"] || '',
      },
    ])
    .select();
  if (data) {
    const _data = data[0] as Exercise;
    _data["answers"] = (_data["answers"] as string).split(";");
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

  if (data && data[0]) {
    const _data = data[0] as Exercise;
    _data["answers"] = (_data["answers"] as string).split(";");
    return _data as Exercise;
  }
  return null;
}
/**
 * @url /api/exercise
 * @description get all exercise
 *
 * @url /api/exercise?id=
 * @description get exercise by id
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
    if (data) {
      for (let i = 0; i < data.length; i++)
        data[i]["answers"] = (data[i]["answers"] as string).split(";");
      return res.status(HttpStatusCode.Ok).json(data as Exercise[]);
    } else
      return res
        .status(HttpStatusCode.NotFound)
        .json({ message: error["message"], code: HttpStatusCode.NotFound });
  }
}
/**
 * @url /api/exercise?id=ESERCISE_ID
 * @description update exercise data
 */
async function put(req: NextApiRequest, res: NextApiResponse) {
  let body = req["body"];
  const param = req["query"];
  if(typeof body == 'string')
    body = JSON.parse(body) as Exercise
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
    if (body["answers"]) {
       if (Array.isArray(body["answers"]))
        body["answers"] = body["answers"].join(";");
    }
    const check = ExerciseUpdateDTOSchema.safeParse(body);
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
  if (data) {
    const _data = data[0] as Exercise;
    _data["answers"] = (_data["answers"] as string).split(";");
    return res.status(HttpStatusCode.Accepted).json(_data);
  }
  if (error)
    return res.status(HttpStatusCode.BadRequest).json({
      message: "[FAILED] somthing wrong happend",
      code: HttpStatusCode.BadRequest,
    });
  return res.status(HttpStatusCode.NotFound).json({ message: "not found" });
}
/**
 * @url /api/exercise?id=ESERCISE_ID
 * @description delete exercise
 */
async function remove(req: NextApiRequest, res: NextApiResponse) {
  const body = await getById(req, true, false);
  if (!body)
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: "[FAILED] delete failed, exercise not found" });
  const { data, error } = await supabase
    .from(TABLE)
    .update({ isDeleted: true })
    .eq("id", req.query.id)
    .select();
  if (data)
    return res
      .status(HttpStatusCode.Ok)
      .json({ message: "[SUCCESS] Exercise deleted successfully" });
  return res.status(HttpStatusCode.BadRequest).json({
    message: "[FAILED] somthing wrong happend while deleting exercise",
  });
}
