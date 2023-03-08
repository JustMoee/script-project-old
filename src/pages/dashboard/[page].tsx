import ContentComponent from "./components/content";
import SideNavigatorComponent from "./components/side-navgator";
import SideMenuComponent from "./components/sidemenu";
import style from "./style.module.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "@/components/Loader";

export default function DashboardPage() {
  const {
    query: { page },
  } = useRouter();

  const { data, isLoading, mutate } = useSWR(
    ["/api/", page],
    async () => await fetch("/api/" + page).then((res) => res.json().then()),
    {
      isPaused: () => page == undefined,
    }
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
            <SideNavigatorComponent />
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
                />
              )}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
