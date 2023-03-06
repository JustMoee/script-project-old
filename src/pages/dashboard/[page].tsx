
import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
export default function DashboardPage() {
  const router = useRouter();
  const { query } = router;
  const { page } = query;
  const {
    data = [{ name: "#", key: "pos" }],
    error,
    isLoading,
  } = useSWR("/api/" + page, async () => {
    return await fetch("/api/" + page).then((res) => res.json().then());
  });
  const header = [
    { name: "#", key: "pos" },
    ...Object.keys(data?.[0]).map((e) => ({ name: e, key: e })),
    ,
  ];
  return (
    <>
    {/*           <div className={`${router.query.page != 'subject' ?style["dashboard-content-grid-layout-full"]: style['dashboard-content-grid-layout']}'`}>
 */}
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent pramsQuery={router.query} />
        <section className={style["dashboard-content-layout"]}>
          <div className={style[`dashboard-content-grid-layout${router.query.page == 'subject'? '-full': ''}`]}>
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
                  >
                  
                  </div>
                </>
              ) : (
                <ContentComponent header={header} data={data} type={page as 'subject' | 'lesson' | 'content' | 'exercies'}/>
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
