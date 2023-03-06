import style from "../style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Subject } from "@/types/subject.type";
import useSWR from "swr";
import { Lesson } from "@/types/lesson.type";

export default function SideNavigatorComponent() {
  const [prams, setPrams] = useState<string>();
  const [subject, setSubject] = useState<Subject[]>([]);
  const [lesson, setLesson] = useState<Lesson[]>([]);
  const router = useRouter();
  

  const {data, error, isLoading} = useSWR('/api/subject', async () => {
    return await fetch('/api/subject').then(res => res.json()).then(res => {
 
      setSubject(res)

    })
  } )
  useEffect( () => {
    if (!router.query) return;

    
    console.log("router ==> ", router.query);
  }, [router.query]);
  return (
    <>
      {router["query"]["page"] != "subject" ? (
        <ul className={style["side-menu-navigator"]}>
          {router.query["page"] == "lesson" && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled " >Subject</span>
              </li>
              {subject.map(data => (<>
                <li key={data.id} className={`${router.query['subject'] == data.id ? 'bg-accent-focus': ''} rounded-md`}>
                  <a onClick={() => window.location.href = window.location.href+"?subject_id="+data.id}>{data.title}</a>
                </li>
              </>))}
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
  href.replace(/\?\w*/g, '')

}
