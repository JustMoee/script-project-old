
import style from "../style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {SubjectData } from "@/types/subject.type";
import useSWR from "swr";
import {  LessonData } from "@/types/lesson.type";
import { Content, ContentData } from "@/types/content.type";
import { Exercise } from '@/types/exercise.type';
import Loader from "@/components/Loader";

export default function SideNavigatorComponent(
  prop: any
) {
  const [prams, setPrams] = useState<string>();
  const [subject, setSubject] = useState<SubjectData[]>([]);
  const [lesson, setLesson] = useState<LessonData[]>([]);
  const [content, setContent] = useState<ContentData[]>([]);
  const [exercise, setExercise] = useState<ContentData[]>([]);

  const {sSubjectId, setSSubjectId, sLessonId, setSLessonId, sContentId, setSContentId, sExericesId, setSExericesId} = prop






const getSubject = () => {
  setLesson([]);
  setContent([]);
  setSLessonId('');
  setSContentId('');
  fetch("/api/subject")
  .then((res) => res.json() as Promise<SubjectData[]>)
  .then(res => {

    if(!Array.isArray(res))
      return []
    return res;
  })
  .then((res) => setSubject(() => res ));
}
const getLesson = () => {
  setSContentId('');
  setContent([]);
  fetch("/api/lesson?subject_id=" + sSubjectId)
  .then((res) => res.json() as Promise<LessonData[]>)
  .then((res) => setLesson(() => res || []));
}
const getContent = () => {
  fetch("/api/content?lesson_id=" + sLessonId)
  .then((res) => res.json() as Promise<ContentData[]>)
  .then((res) => setContent(() => res|| []));
}



  const router = useRouter();


  useEffect(() => {
    if(!router.query)
      return;
      getSubject();
  },[router.query])
  useEffect(() => {
    if(!sSubjectId)
      return;
      getLesson();
  },[sSubjectId])
  useEffect(() => {
    if(!sLessonId)
      return;
     getContent();
  },[sLessonId])
 
  return (
    <>
      {router.query["page"]  !== "subject" && (
        <ul className={style["side-menu-navigator"]}>

          {(router.query["page"] == "lesson" ||
            router.query["page"] == "content" ||
            router.query["page"] == "exercise") && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled ">Subject</span>
              </li>

              {subject && subject.map((data) => (
                <>
                  <li
                    key={data.id}
                    className={`${
                      sSubjectId == data.id
                        ? "bg-accent-focus"
                        : ""
                    } rounded-md`}
                  >
                    <a
                      onClick={() =>
                       setSSubjectId((pre) => data.id!)
                      }
                    >
                      {data.title}
                    </a>
                  </li>
                </>
              ))}
            </>
          )}
          {(router.query["page"] == "content" ||
            router.query["page"] == "exercise") && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled ">Lesson</span>
              </li>
              {lesson &&
                lesson?.map((data) => (
                  <>
                    <li
                      key={data.id}
                      className={`${

                        sLessonId == data.id
                          ? "bg-accent-focus"
                          : ""
                      } rounded-md`}
                    >
                      <a
                        onClick={() => setSLessonId((pre) => data.id!)

                        }
                      >
                        {data.title}
                      </a>
                    </li>
                  </>

                ))}
            </>
          )}
          {router.query["page"] == "exercise" && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled ">content</span>
              </li>
              {content.map((data) => (
                <>
                  <li
                    key={data.id}
                    className={`${
                      sContentId == data.id
                        ? "bg-accent-focus"
                        : ""
                    } rounded-md`}
                  >
                    <a
                      onClick={() =>
                        setSContentId((pre) => data.id!)
                      }
                    >
                      {data.title}
                    </a>
                  </li>
                </>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  );
}

const navigateTo = (to: string, id: string) => {
  const href = window.location.href;
  href.replace(/\?\w*/g, "");
};
