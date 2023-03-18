import CodeHighlight from "@/components/coder";
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
  const router = useRouter();
  const { query } = router;
  useEffect(() => {
    console.log(query)
    if (!query &&  query["subject"] !== undefined) return;

    fetch(
      `/api/loadDoc?load=getSubjectWithLessonByLangauge&language=${query["subject"]}`
    )
      .then((data) => data.json())
      .then((data) => setLoad(data || []));
  }, [query]);
  return (
    <>
      <div className={fira_sans.className}>
        <section className={style.doc}>
          <div>
            <SidebarComponent subject={load}/>
          </div>
          <div className={style.content}>
            <CodeHighlight
              text={`  const session = useSession()
                 const supabase = useSupabaseClient();`}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default SubjectContent;
