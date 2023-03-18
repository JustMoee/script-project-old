import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useState, useEffect } from "react";
import { IconType } from "react-icons";
import { CiPlug1, CiShirt } from "react-icons/ci";
import style from "../style.module.css";
type NavItem = {
  name: string;
  path: string;
  icon: IconType;
};
export default function SideMenuComponent(props: { pramsQuery: any }) {
  const { pramsQuery } = props;
  const [navItem, setNavItem] = useState([] as NavItem[]);
  
  useEffect(() => {
    setNavItem([
      {
        name: "subject",
        path: "/dashbard/subject",
        icon: CiShirt,
      },
      {
        name: "lesson",
        path: "/dashbard/subject",
        icon: CiPlug1,
      },
    ]);
  }, []);

  const router = useRouter();
  return (
    <>
      <ul className={style["side-menu"]}>
        <li>
          <Link
            href={"/dashboard/subject"}
            className={`${
              pramsQuery["page"] == "subject" ? style["active"] : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/lesson"
            className={`${
              pramsQuery["page"] == "lesson" ? style["active"] : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/content"
            className={`${
              pramsQuery["page"] == "content" ? style["active"] : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/exercise"
            className={`${
              pramsQuery["page"] == "exercise" ? style["active"] : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Link>
        </li>
      </ul>
      {/* <ul className="menu bg-base-100 w-56 rounded-box">
        <li className="bordered">
          <a>
            {navItem.map((ele, i) => {
              return (
                <Link key={i} href={ele.path} className="flex gap-4">
                  <span>{React.createElement(ele.icon)}</span>
                  <span>{ele.name}</span>
                </Link>
              );
            })}
          </a>
        </li>
      </ul> */}
      {/* <nav className=" w-[40px] min-h-[100vh] flex flex-col gap-4 bg-">
        

      </nav> */}
    </>
  );
}
