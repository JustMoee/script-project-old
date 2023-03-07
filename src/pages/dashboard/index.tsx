import SideMenuComponent from "./components/sidemenu";
import SideNavigatorComponent from "./components/side-navgator";
import ContentComponent from './components/content'
import style from "./style.module.css";
import { TableHeader } from "./type";
import { useEffect, useState } from 'react';
import { Subject } from "@/types/subject.type";
import { useRouter } from "next/router";
export default function DashboardPage() {
  const [data, setData] = useState<Subject[]>([])
  const router = useRouter()
  return (
    <>
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent pramsQuery={router.query}/>
        <section className={style["dashboard-content-layout"]}>
          <div className={style["dashboard-content-grid-layout"]}>
            <SideNavigatorComponent></SideNavigatorComponent>
            <section className={style["dashboard-nav-and-table"]}>
              <div className="navbar bg-base-100">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
              </div>
            </section>

          </div>
        </section>
      </main>
    </>
  );
}


