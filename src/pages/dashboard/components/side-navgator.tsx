import style from "../style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {SubjectData } from "@/types/subject.type";
import useSWR from "swr";
import {  LessonData } from "@/types/lesson.type";
import { Content, ContentData } from "@/types/content.type";

export default function SideNavigatorComponent() {
  const [prams, setPrams] = useState<string>();
  const [subject, setSubject] = useState<SubjectData[]>([]);
  const [lesson, setLesson] = useState<LessonData[]>([]);
  const [content, setContent] = useState<ContentData[]>([]);
  const router = useRouter();

  // const { data, error, isLoading } = useSWR("/api/subject", async () => {
  //   return await fetch("/api/subject")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setSubject(res);
  //     });
  // });

  useEffect(() => {
    if (!router.query) return;

    if (router.query["page"] != "Subject"  )
      fetch("/api/subject")
        .then((res) => res.json() as Promise<SubjectData[]>)
        .then((res) => setSubject(() => res));
    if (
      (router.query["page"] == "content" || router.query["page"] == "exercise" )  && 
      router["query"]["subject_id"] !== undefined 
    )
      fetch("/api/lesson?subject_id=" + router["query"]["subject_id"])
        .then((res) => res.json() as Promise<LessonData[]>)
        .then((res) => setLesson(() => res));
    if (
      router.query["page"] == "exercise" &&
      router["query"]["lesson_id"] !== undefined
    )
      fetch("/api/content?lesson_id=" + router["query"]["lesson_id"])
        .then((res) => res.json() as Promise<ContentData[]>)
        .then((res) => setContent(() => res));
  }, [router.query]);
  return (
    <>
      {router["query"]["page"] != "subject" ? (
        <ul className={style["side-menu-navigator"]}>
          {(router.query["page"] == "lesson" ||
            router.query["page"] == "content" ||
            router.query["page"] == "exercise") && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled ">Subject</span>
              </li>
              {subject.map((data) => (
                <>
                  <li
                    key={data.id}
                    className={`${
                      router.query["subject_id"] == data.id
                        ? "bg-accent-focus"
                        : ""
                    } rounded-md`}
                  >
                    <a
                      onClick={() =>
                        (window.location.href =
                          window.location.href + "?subject_id=" + data.id)
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
                        router.query["lesson_id"] == data.id
                          ? "bg-accent-focus"
                          : ""
                      } rounded-md`}
                    >
                      <a
                        onClick={() =>
                          (window.location.href =
                            window.location.href + "&lesson_id=" + data.id)
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
                      router.query["content_id"] == data.id
                        ? "bg-accent-focus"
                        : ""
                    } rounded-md`}
                  >
                    <a
                      onClick={() =>
                        (window.location.href =
                          window.location.href + "&content_id=" + data.id)
                      }
                    >
                      {data.title}
                    </a>
                  </li>
                </>
              ))}
            </>
          )}
          {/* <li>
            <a>Item 2</a>
          </li> */}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

const navigateTo = (to: string, id: string) => {
  const href = window.location.href;
  href.replace(/\?\w*/g, "");
};
