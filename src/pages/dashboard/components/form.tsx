import { FC } from "react";
import { Subject } from "@/types/subject.type";
import { Lesson } from "@/types/lesson.type";
import { Exercise } from "@/types/exercise.type";
import { Content } from "@/types/content.type";
import { Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const FormComponent: FC<{
  type: "exercies" | "subeject" | "lesson" | "content";
  data: Subject | Lesson | Content | Exercise;
}> = () => {
//   return  <Formik
//   initialValues={initialValues}
//   validationSchema={toFormikValidationSchema(Schema)}
//   onSubmit={console.log}
// >
//     </Formik>;
};

export default FormComponent;
