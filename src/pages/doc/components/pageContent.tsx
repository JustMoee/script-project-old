import style from "../style.module.css";
import CodeHighlight from "@/components/coder";
import React from "react";

export default function PageContentComponent(prop: {
  pageContent: PageContent;
}) {
  const { pageContent } = prop;
  return (
    <main>
      {pageContent && (
        <section>
          <h1>{pageContent.title}</h1>
          {Array.isArray(pageContent.Content) &&
            pageContent.Content.map((content) => {
              return (
                <div key={content.id} className={style.content_blcok}>
                  <h2>{content.title}</h2>
                  {content.subtitle && <h3>{content.subtitle}</h3>}
                  <p className={style.description}>{content.description}</p>
                  {content.subdescription && (
                    <p className={style.subdescription}>
                      {content.subdescription}
                    </p>
                  )}
                  {Array.isArray(content.Exercise) &&
                    content.Exercise.map((exericse) => {
                        const eKey = exericse.id.substring(0,5);
                        return(
                      <React.Fragment key={exericse.id}>
                        <h4>{exericse.header}</h4>
                        {exericse.description && <p className={style.exerices_dsec}>{exericse.description}</p>}
                        <CodeHighlight text={exericse.code} eKey={eKey}/>
                        {Array.isArray(exericse.answers) &&
                          exericse.answers.length > 0 &&
                          exericse.answers[0] != "" && (
                            <div>
                              <button className={style.run_btn} onClick={() => {
                                checkAnswer(exericse.answers, eKey)
                              }}>Run</button>
                            </div>
                          )}
                      </React.Fragment>
                    )})}
                </div>
              );
            })}
        </section>
      )}
    </main>
  );
}
const checkAnswer = (answers: string [], eKey: string) => {
    const inputs = document.querySelectorAll<HTMLInputElement>(`input.${eKey}`) 
    inputs.forEach((inp, i) =>  {
        if(answers.length == inputs.length)
         alert(answers[i] == inp.value ? 'correct' : 'false')
    })
}

type PageContent = {
  level: number;
  title: string;
  id: string;
  Content: {
    id: string;
    level: number;
    title: string;
    subtitle: string;
    description: string;
    subdescription: string;
    Exercise: {
      answers: string[];
      code: string;
      id: string;
      point: number;
      level: number;
      header: string;
      description: string;
    }[];
  }[];
};
