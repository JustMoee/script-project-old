import CodeHighlight from "@/components/coder";
import PageContentComponent from "./components/pageContent";
import { Fira_Sans } from "@next/font/google";
import style from "./style.module.css";
import SidebarComponent from "./components/sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const fira_sans = Fira_Sans({
  subsets: ["vietnamese"],
  weight: ["200", "400", "500", "600"],
});

const SubjectContent = () => {
  const [load, setLoad] = useState<any[]>([]);
  const [lesson, setLesson] = useState('');
  const [pageContent, setPageContent] = useState<any> ({})

  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    if (!query ||  query["subject"] === undefined) return;

    fetch(
      `/api/loadDoc?load=getSubjectWithLessonByLangauge&language=${query["subject"]}`
    )
      .then((data) => data.json())
      .then((data) => setLoad(data || []));
  }, [query]);


  useEffect(() => {
    if(lesson == '')
      return;
      fetch(
        `/api/loadDoc?load=getPageContentByLessonId&lessonId=${lesson}`
      )
        .then((data) => data.json())
        .then((data) => setPageContent(data[0] || {}));
  }, [lesson])
  return (
    <>
      <div className={fira_sans.className}>
        <section className={style.doc}>
          <div>
            <SidebarComponent subject={load}  setLesson={setLesson} lessonId={lesson}/>
          </div>
          <div className={style.content}>
            <PageContentComponent pageContent={pageContent}/>
            {/* <CodeHighlight
              text={`  const session = useSession()
                 const supabase = useSupabaseClient();`}
            /> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default SubjectContent;
