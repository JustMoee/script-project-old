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
    
      </DocLyaout>
    </>
  );
}
