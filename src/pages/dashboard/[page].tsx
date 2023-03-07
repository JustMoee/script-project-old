import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
export default function DashboardPage() {
  const router = useRouter();
  const [header, setHeader] = useState<any[]>([]);

  const { query } = router;
  const { page } = query;
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
        
    if (page === "lesson" && prams &&  query['subject_id'] !== undefined)
      return await fetch("/api/" + page + prams).then((res) =>
        res.json().then().catch(res => [])
      );
    if (page === "content" && prams &&  query['lesson_id'] !== undefined)
      return await fetch("/api/" + page + '?lesson_id='+query['lesson_id']).then((res) =>
        res.json().then().catch(res => [])
      );
    if (page === "exercise" && prams &&  query['content_id'] !== undefined)
      return await fetch("/api/" + page + '?content_id='+query['content_id']).then((res) =>
        res.json().then().catch(res => [])
      );
  });
  useEffect(() => {
    if (data.length)
      setHeader(() => [
        { name: "#", key: "pos" },
        ...Object.keys(data?.[0]).map((e) => ({ name: e, key: e })),
        ,
      ]);
  }, [data]);

  const mutated = () => {
    mutate("/api/" + page, { revalidate: true });
  };
  return (
    <>
      {/*           <div className={`${router.query.page != 'subject' ?style["dashboard-content-grid-layout-full"]: style['dashboard-content-grid-layout']}'`}>
       */}
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent pramsQuery={router.query} />
        <section className={style["dashboard-content-layout"]}>
          <div
            className={
              style[
                `dashboard-content-grid-layout${
                  router.query.page == "subject" ? "-full" : ""
                }`
              ]
            }
          >
            <SideNavigatorComponent></SideNavigatorComponent>
            <section className={`${style["dashboard-nav-and-table"]}`}>
              <div className="navbar bg-base-100 border-solid border-[1px] border-accent">
                <a className="btn btn-ghost normal-case text-xl">
                  {router.query.page}
                </a>
              </div>
              {isLoading ? (
                <>
                  <div
                    className="radial-progress  animate-spin"
                    style={{ "--value": 80 }}
                  ></div>
                </>
              ) : (
                <ContentComponent
                  header={header}
                  data={data}
                  type={page as "subject" | "lesson" | "content" | "exercies"}
                  mutated={mutated}
                />
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
