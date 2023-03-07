import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DashboardPage() {
  const { query, asPath, isReady } = useRouter();
  const { page } = query;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/api/" + isReady ? page : new URL(asPath).pathname.split("/")[2],
    async () => await fetch("/api/" + page).then((res) => res.json().then())
  );
  const passData = typeof data == "object" ? data : [{ name: "#", key: "pos" }];

  const mutator = () => {
    mutate("/api/" + page);
  };
  const header = [
    { name: "#", key: "pos" },
    ...Object.keys(data?.[0] || {}).map((e) => ({ name: e, key: e })),
  ];

  return (
    <>
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent pramsQuery={query} />
        <section className={style["dashboard-content-layout"]}>
          <div
            className={
              style[
                `dashboard-content-grid-layout${
                  query.page == "subject" ? "-full" : ""
                }`
              ]
            }
          >
            <SideNavigatorComponent />
            <section className={`${style["dashboard-nav-and-table"]}`}>
              <div className="navbar bg-base-100 border-solid border-[1px] border-accent">
                <a className="btn btn-ghost normal-case text-xl">
                  {query.page}
                </a>
              </div>
              {isLoading || !isReady ? (
                <>
                  <div
                    className="radial-progress  animate-spin"
                    style={{ "--value": 80 }}
                  />
                </>
              ) : (
                <ContentComponent
                  header={header}
                  data={passData}
                  mutator={mutator}
                  type={page as "subject" | "lesson" | "content" | "exercies"}
                />
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
