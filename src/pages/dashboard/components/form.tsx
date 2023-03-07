import { FC } from "react";
import { Subject, SubjectSchema } from "@/types/subject.type";
import { Lesson, LessonSchema } from "@/types/lesson.type";
import { Exercise } from "@/types/exercise.type";
import { Content } from "@/types/content.type";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import style from "../style.module.css";
const FormComponent: FC<{
  type: "exercies" | "subject" | "lesson" | "content";
  data: Subject | Lesson | Content | Exercise;
  op: "add" | "edit";
  mutator: () => void;
}> = (e) => {
  console.log("data from form ==> ", e.data);
  return (
    <Formik
      initialValues={e.data}
      validationSchema={toFormikValidationSchema(SubjectSchema)}
      onSubmit={console.log}
    >
      {({ errors, values, handleChange, initialValues }) => {
        console.log("value initialValues==> ", initialValues);
        return (
          <>
            <form className={style["form"]}>
              {e.type == "subject" ? (
                <SubjectForm
                  error={errors}
                  value={values}
                  handleChange={handleChange}
                />
              ) : (
                <LessonForm
                  error={errors}
                  value={values}
                  handleChange={handleChange}
                />
              )}
            </form>
            <div className={style.action}>
              <button
                onClick={() => {
                  action(values, "subject", e.op)
                    .then(e.mutator)
                    .then(() => document.getElementById("my-modal-4")?.click());
                }}
                className="btn"
              >
                {e.op + " " + e.type}
              </button>
            </div>
          </>
        );
      }}
    </Formik>
  );
};
// Subject form for subject add and edit
const SubjectForm: FC<{
  value: any;
  error: any;
  handleChange: (d: string) => void;
}> = (e) => {
  return (
    <>
      <div className={style["form-control"]}>
        <input
          value={e.value["title"]}
          onChange={e.handleChange("title")!}
          placeholder="title"
        />
        <small>{e.error["title"]}</small>
      </div>
      <div className={style["form-control"]}>
        <input
          value={e.value["language"]}
          onChange={e.handleChange("language")!}
          placeholder="language"
        />
        <small>{e.error["language"]}</small>
      </div>
      <div className={style["form-control"]}>
        <input
          value={e.value["level"]}
          onChange={e.handleChange("level")!}
          placeholder="level"
          type="number"
        />
        <small>{e.error["level"]}</small>
      </div>
    </>
  );
};

const LessonForm: FC<{
  value: any;
  error: any;
  handleChange: (d: string) => void;
}> = (e) => (
  <>
    <div className={style["form-control"]}>
      <input
        value={e.value["title"]}
        onChange={e.handleChange("title")!}
        placeholder="title"
      />
      <small>{e.error["title"]}</small>
    </div>
    <div className={style["form-control"]}>
      <input
        value={e.value["language"]}
        onChange={e.handleChange("language")!}
        placeholder="language"
      />
      <small>{e.error["language"]}</small>
    </div>
    <div className={style["form-control"]}>
      <input
        value={e.value["level"]}
        onChange={e.handleChange("level")!}
        placeholder="level"
        type="number"
      />
      <small>{e.error["level"]}</small>
    </div>
  </>
);

const action = async (data: Subject, router: string, op: "add" | "edit") => {
  const res = await fetch(`/api/${router}`, {
    body: JSON.stringify(data),
    method: "POST",
  }).then(async (re) => await re.json());

  console.log("res ==>", res);
};
export default FormComponent;
