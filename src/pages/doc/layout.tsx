import CodeHighlight from "@/components/coder";
import { Fira_Sans } from "@next/font/google";
import style from "./style.module.css";
import SidebarComponent from "./components/sidebar";

const fira_sans = Fira_Sans({
  subsets: ["vietnamese"],
  weight: ["200", "400", "500", "600"],
})


export default function Layout({ children }:any) {
  return (
    <>
    <div  className={fira_sans.className}>
      <section className={style.doc}>
        <div>
          <SidebarComponent />
        </div>
        <div className={style.content}>
        <main>{children}</main>
          <CodeHighlight
            text={`  const session = useSession()
                 const supabase = useSupabaseClient();`}
          />
        </div>
      </section>
      </div>
     
    </>
  )
}