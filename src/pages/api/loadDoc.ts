
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";
import { HttpStatusCode } from "../../shared/http-status-code.enum";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {query} = req
   if (query['load'] == 'getSubjectWithLessonByLangauge') return getSubjectWithLessonByLangauge(req, res);
   else if(query['load'] == 'getPageContentByLessonId') return getPageContentByLessonId(req, res)
  return res.status(HttpStatusCode.NotFound);
}




function get(  req: NextApiRequest,
    res: NextApiResponse<any>) {
}


// /api/loadData?load=subjectWithLessonByLanguage&language=javascript

async function getSubjectWithLessonByLangauge(  
    req: NextApiRequest,
    res: NextApiResponse<any>) {
    const {query} = req
    let request = supabase.from('Subject')
    .select('title,id,level, Lesson(title,id, level)');
    
    if(query['language'])
      request = request.eq('language',query['language'] )
    const {data, error} = await request;

    if(data)
    return  res.status(HttpStatusCode.Accepted).json(data)
    return res.status(HttpStatusCode.NotFound).json(error)
}


async function getPageContentByLessonId(    req: NextApiRequest,
  res: NextApiResponse<any>
  ) {


    const {query} = req

    let request = supabase.from('Lesson')
    .select('title,id,level, Content(*, Exercise(*))').eq('id', query['lessonId']);
    
    const {data, error} = await request;

    if(data)
    return  res.status(HttpStatusCode.Accepted).json(data)
    return res.status(HttpStatusCode.NotFound).json(error)
}