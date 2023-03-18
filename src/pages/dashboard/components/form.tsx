import { FC } from "react";
import { Subject, SubjectSchema } from "@/types/subject.type";
import { Lesson, LessonSchema } from "@/types/lesson.type";
import { Exercise } from "@/types/exercise.type";
import { Content } from "@/types/content.type";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState, useEffect } from "react";

import style from "../style.module.css";
const FormComponent: FC<{
  type: "exercise" | "subject" | "lesson" | "content";
  data: (Subject | Lesson | Content | Exercise | any);
  op: "add" | "edit";
  sSubjectId: string,
  sLessonId: string,
  sContentId: string,
  mutator: () => void;
}> = (e) => {
  console.log("data from form ==> ", e.data);
  return (
    <Formik
      initialValues={{}}
      validationSchema={toFormikValidationSchema(SubjectSchema)}
      onSubmit={() => {}}
    >
      {({ errors, values, handleChange, initialValues, setFieldValue }) => {
        console.log("value initialValues==> ", initialValues);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          console.log('data before change ==> ', e.data)
          const keys = Object.keys(e.data );
         keys.forEach(key => setFieldValue(key, e.data[key],false)) 

        },[e.data])

        return (
          <>
            <form className={style["form"]}>
              {e.type == "subject" ? (
                <SubjectForm
                  error={errors}
                  value={values}
                  handleChange={handleChange}
                />
              ) : e.type == 'lesson' ?  (
                <LessonForm
                  error={errors}
                  value={values}
                  handleChange={handleChange}
                  subjectId={e.sSubjectId}
                />
              ): 
              e.type == 'content' ? (
                <ContentForm
                error={errors}
                value={values}
                handleChange={handleChange}
                lessonId={e.sLessonId}

                ></ContentForm>
              ):
              e.type == 'exercise' ? (
                <ExrciesForm              
                error={errors}
                value={values}
                handleChange={handleChange} 
                contentId={e.sContentId}

                />
                
              ) : (<></>)
              }
            </form>
            <div className={style.action}>
              <button
                onClick={() => {
                  const fkId = e.type == 'lesson' ? e.sSubjectId : e.type == 'content' ? e.sLessonId : e.type =='exercise' ? e.sContentId : ''
                  action(values, e.type, e.op, fkId)
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
  subjectId: string
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
        value={e.value["level"]}
        onChange={e.handleChange("level")!}
        placeholder="level"
        type="number"
      />
      <small>{e.error["level"]}</small>
    </div>
  </>
);
const ContentForm: FC<{
  value: any;
  error: any;
  lessonId: string
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
        value={e.value["subtitle"]}
        onChange={e.handleChange("subtitle")!}
        placeholder="subtitle"
      />
      <small>{e.error["subtitle"]}</small>
    </div>
    
    <div className={style["form-control"]}>
      <textarea
        value={e.value["description"]}
        onChange={e.handleChange("description")!}
        placeholder="description"
        rows={3}
      ></textarea>
      <small>{e.error["description"]}</small>
    </div>

    <div className={style["form-control"]}>
      <textarea
        value={e.value["subdescription"]}
        onChange={e.handleChange("subdescription")!}
        placeholder="subdescription"
        rows={3}
      ></textarea>
      <small>{e.error["subdescription"]}</small>
    </div>
  </>
);
const ExrciesForm: FC<{
  value: any;
  error: any;
  handleChange: (d: string) => void;
  contentId: string
}> = (e) => (
  <>
    <div className={style["form-control"]}>
      <input
        value={e.value["point"]}
        onChange={e.handleChange("point")!}
        placeholder="point"
      />
      <small>{e.error["title"]}</small>
    </div>

    
    <div className={style["form-control"]}>
      <textarea
        value={e.value["code"]}
        onChange={e.handleChange("code")!}
        placeholder="code"
        rows={3}
      ></textarea>
      <small>{e.error["code"]}</small>
    </div>

    <div className={style["form-control"]}>
      <textarea
        value={e.value["answers"]}
        onChange={e.handleChange("answers")!}
        placeholder="answers"
        rows={3}
      ></textarea>
      <small>{e.error["answers"]}</small>
    </div>
  </>
);

const action = async (data: any , router: string, op: "add" | "edit", fkId?:string ) => {
  if(router == 'subject')
    await subjectAction(data, op)
  else if (router == 'lesson')
    await LessonAction(data, fkId || '' , op)
  else if (router == 'content')
    await contentAction(data, fkId || '' , op)
  else if (router == 'exercise')
    await exerciseAction(data, fkId || '' , op)
};


const subjectAction = async (data: Subject,  op: 'add' | 'edit') => {
  const formData: Subject = {
    level: data['level'],
    language: data['language'],
    title: data['title'], 
  }
  const res = await fetch('/api/subject' + (op == 'add'? '' : `?id=${data.id}`), {
    method: op == 'add'? 'POST' : "PATCH",
    body: JSON.stringify(formData)
  })
  return res;
}
const LessonAction = async (data: Lesson, subjectId:string, op: 'add' | 'edit') => {
  const formData: Lesson = {
    level: data['level'],
    title: data['title'],
    subject_id: subjectId
  }
  const res = await fetch('/api/lesson' + (op == 'add'? '' : `?id=${data.id}`), {
    method: op == 'add'? 'POST' : "PATCH",
    body: JSON.stringify(formData)
  })
  return res;
}
const contentAction = async (data: Content, lessonId:string, op: 'add' | 'edit') => {
  const formData: Content = {
    level: data['level'],
    title: data['title'],
    lesson_id: lessonId,
    subdescription: data['subdescription'],
    description: data['description'],
    subtitle: data['subtitle'],
  }
  const res = await fetch('/api/content' + (op == 'add'? '' : `?id=${data.id}`), {
    method: op == 'add'? 'POST' : "PATCH",
    body: JSON.stringify(formData)
  })
  return res;
}
const exerciseAction = async (data: Exercise, contentId:string, op: 'add' | 'edit') => {
  console.log('exe ==> ', data)
  const formData: Exercise = {
    level: data['level'],
    answers: !Array.isArray(data['answers']) ? (data['answers'] as string).split(','): data['answers'],
    code: data['code'],
    point: data['point'],
    content_id: contentId
  }
  const res = await fetch('/api/exercise' + (op == 'add'? '' : `?id=${data.id}`), {
    method: op == 'add'? 'POST' : "PATCH",
    body: JSON.stringify(formData)
  })
  return res;
}
export default FormComponent;
