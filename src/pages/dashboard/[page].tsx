import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { query, asPath, isReady } = useRouter();
  const { page } = query;
  const [header, setHeader] = useState<any[]>([]);


  const [sSubjectId, setSSubjectId] = useState('');
  const [sLessonId, setSLessonId] = useState('');
  const [sContentId, setSContentId] = useState('');
  const [sExericesId, setSExericesId] = useState('');

  // const { data, error, isLoading, isValidating, mutate } = useSWR(
  //   "/api/" + isReady ? page : new URL(asPath).pathname.split("/")[2],
  //   async () => await fetch("/api/" + page).then((res) => res.json().then())
  // );
  const {
    data = [],
    error,
    isLoading,
    mutate,
  } = useSWR("/api/" + page, async () => {
    
    const prams = Object.keys(query)
      .filter((e) => e.includes("_id"))
      .map((e, i) => (i == 0 ? `?${e}=${query[e]}` : `&${e}=${query[e]}`))
      .join();
    console.log("prams ==> ", prams);
    if (page !== undefined)
      if (page === "subject")
        return await fetch("/api/" + page + prams).then((res) =>
          res.json().then().catch(res => [])
        );

    if (page === "lesson" && sSubjectId)
      return await fetch("/api/" + page +'?subject_id='+ sSubjectId).then((res) =>
        res.json().then().catch(res => [])
      );
    if (page === "content" && sLessonId)
      return await fetch("/api/" + page + '?lesson_id='+sLessonId).then((res) =>
        res.json().then().catch(res => [])
      );
    if (page === "exercise" && sContentId)
      return await fetch("/api/" + page + '?content_id='+sContentId).then((res) =>
        res.json().then().catch(res => [])
      );
  }, {
      isPaused: () => page == undefined,
    }
    );
  const passData = typeof data == "object" ? data : [{ name: "#", key: "pos" }];
  useEffect(() => {
    if (data.length)
      setHeader(() => [
        { name: "#", key: "pos" },
        ...Object.keys(data?.[0]).map((e) => ({ name: e, key: e })),
        ,
      ]);
  }, [data]);
  const mutator = () => {
    mutate("/api/" + page);
  };

  



  // const header = [
  //   { name: "#", key: "pos" },
  //   ...Object.keys(data?.[0] || {}).map((e) => ({ name: e, key: e })),
  // ];

  return (
    <>
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent page={page as string} />
        <section className={style["dashboard-content-layout"]}>
          <div
            className={
              style[
                `dashboard-content-grid-layout${
                  page == "subject" ? "-full" : ""
                }`
              ]
            }
          >
            <SideNavigatorComponent
              sSubjectId={sSubjectId}
              setSSubjectId={setSSubjectId}
              sLessonId={sLessonId}
              setSLessonId={setSLessonId}
              sContentId={sContentId}
              setSContentId={setSContentId}
              sExericesId={sExericesId}
              setSExericesId={setSExericesId}
            />
            <section className={`${style["dashboard-nav-and-table"]}`}>
              <div className="navbar bg-base-100 border-solid border-[1px] border-accent">
                <a className="btn btn-ghost normal-case text-xl">{page}</a>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <ContentComponent
                  header={header}
                  data={passData}
                  mutator={mutator}
                  type={page as "subject" | "lesson" | "content" | "exercies"}
                  sSubjectId={sSubjectId}
                  sContentId={sContentId}
                  sLessonId={sLessonId}

                />
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
