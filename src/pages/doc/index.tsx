import React from "react";
import SidebarComponent from "./components/sidebar";
import style from "./style.module.css";
import { Fira_Sans } from "@next/font/google";
import CodeHighlight from "../../components/coder";
import DocLyaout from './layout'
const fira_sans = Fira_Sans({
  subsets: ["vietnamese"],
  weight: ["200", "400", "500", "600"],
});
export default function DocPage() {
  return (
    <>
    <DocLyaout>
    <div  className={fira_sans.className}>
      <section className={style.doc}>
        <div>
          <SidebarComponent />
        </div>
        <div className={style.content}>
          <CodeHighlight
            text={`  const session = useSession()
                 const supabase = useSupabaseClient();`}
          />
        </div>
      </section>
      </div>
      </DocLyaout>
    </>
  );
}
