import SideMenuComponent from "./components/sidemenu";
import SideNavigatorComponent from "./components/side-navgator";
import ContentComponent from './components/content'
import style from "./style.module.css";
import { TableHeader } from "./type";
import { useEffect, useState } from 'react';
import { Subject } from "@/types/subject.type";
export default function DashboardPage() {
  const [data, setData] = useState<Subject[]>([])

  return (
    <>
      <main className={style["dashboard-layout"]}>
        <SideMenuComponent />
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


