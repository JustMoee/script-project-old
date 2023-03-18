import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "../../shared/http-status-code.enum";
import { Exercise } from "@/types/exercise.type";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query } = req;
  if (query["load"] == "getSubjectWithLessonByLangauge")
    return getSubjectWithLessonByLangauge(req, res);
  else if (query["load"] == "getPageContentByLessonId")
    return getPageContentByLessonId(req, res);
  return res.status(HttpStatusCode.NotFound);
}

function get(req: NextApiRequest, res: NextApiResponse<any>) {}

// /api/loadData?load=subjectWithLessonByLanguage&language=javascript

async function getSubjectWithLessonByLangauge(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query } = req;
  let request = supabase
    .from("Subject")
    .select("title,id,level, Lesson(title,id, level)")
    .eq("isActive", true)
    .eq("isDeleted", false);

  if (query["language"]) request = request.eq("language", query["language"]);
  const { data, error } = await request;

  if (data) return res.status(HttpStatusCode.Accepted).json(data);
  return res.status(HttpStatusCode.NotFound).json(error);
}

async function getPageContentByLessonId(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { query } = req;

  let request = supabase
    .from("Lesson")
    .select("title,id,level, isDeleted, Content(*, Exercise(*))")
    .eq("isActive", true)
    .eq("isDeleted", false)
    .eq("id", query["lessonId"])


  const { data, error } = await request;

  if (data) {
    data.map((lesson) => {
      return lesson.Content.map((content: any) => {
        return content.Exercise.map((e: any) => {
          e["answers"] = e["answers"].split(";");
          return e;
        });
      });
    });

    return res.status(HttpStatusCode.Accepted).json(data);
  }
  return res.status(HttpStatusCode.NotFound).json(error);
}
