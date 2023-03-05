import { FC } from "react";
import { Subject, SubjectSchema } from "@/types/subject.type";
import { Lesson, LessonSchema } from "@/types/lesson.type";
import { Exercise } from "@/types/exercise.type";
import { Content } from "@/types/content.type";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import style from '../style.module.css';
const FormComponent: FC<{
  type: "exercies" | "subject" | "lesson" | "content";
  data: Subject | Lesson | Content | Exercise;
  op: "add" | "edit";
}> = (e) => {
  return (
    <Formik
      initialValues={e.data}
      validationSchema={toFormikValidationSchema(SubjectSchema)}
      onSubmit={console.log}
    >
      {({ errors, values, handleChange }) => {
        const value = values as Subject;
        const error = errors as Subject
        return (
          <form className={style['form']}>
            <div className={style["form-control"]}>
            <input value={value["title"]} onChange={handleChange("title")} />
              <small>{error['title']}</small>
            </div>
            <div className={style["form-control"]}>
            <input value={value["language"]} onChange={handleChange("language")} />
              <small>{error['language']}</small>
            </div>
            <div className={style["form-control"]}>
            <input value={value["level"]} onChange={handleChange("level")} />
              <small>{error['level']}</small>
            </div>
            <div className="action">
              <button onClick={() => console.log('vlaues ==>', value)} className="btn">
                {e.op}
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormComponent;
