import { Session } from "@supabase/supabase-js";
import { AppProps } from "next/app";

export default function DocLayout({ Component, pageProps }:AppProps<{
    initialSession: Session,
  }>) {
  return (<>
    <section className="docsPage">
        xcxc
        <Component {...pageProps} />
    </section>
  
  </>);
}
