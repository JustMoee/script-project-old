import Loader from "@/components/Loader";
import { Subject } from "@/types/subject.type";
import { useRouter } from "next/router";
import useSWR from "swr";
import style from "../style.module.css";

export default function SideNavigatorComponent() {
  const {
    query: { page, subject },
  } = useRouter();

  const { data, isLoading } = useSWR<Subject[]>(
    ["/api/", "subject"],
    async () => await fetch("/api/subject").then((res) => res.json().then())
  );
  return (
    <>
      {page !== "subject" && (
        <ul className={style["side-menu-navigator"]}>
          {page === "lesson" && (
            <>
              <li className="menu-title text-accent ">
                <span className="text-bold text-[2rem] disabled ">Subject</span>
              </li>
              {isLoading ? (
                <Loader />
              ) : (
                data?.map((data) => (
                  <>
                    <li
                      key={data.id}
                      className={`${
                        subject === data.id ? "bg-accent-focus" : ""
                      } rounded-md`}
                    >
                      <a
                        onClick={() =>
                          (window.location.href =
                            window.location.href + "?subject_id=" + data.id)
                        }
                      >
                        {data.title}
                      </a>
                    </li>
                  </>
                ))
              )}
            </>
          )}
        </ul>
      )}
    </>
  );
}

const navigateTo = (to: string, id: string) => {
  const href = window.location.href;
  href.replace(/\?\w*/g, "");
};
