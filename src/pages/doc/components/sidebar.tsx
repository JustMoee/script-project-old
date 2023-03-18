import Link from 'next/link';
import React from 'react';
import style from '../style.module.css';
export default function SidebarComponent(prop: {subject: LoadSubject[]}) {
  const {subject} = prop
  return (
    <>
      <nav className={style.sidebar}>
        <div className={style.logo_section}> 
            <h1>Logo</h1>
        </div>
        {
          subject.map(sub => (
          <React.Fragment key={sub.id}>
          <div className={style.subject_list}>
            <label>{sub.title}</label>
            <ul>
              {sub.Lesson.map((lesson, i) => 
              <React.Fragment key={lesson.id}>
                <li>
                  <a>
                  <span>{i}</span>
                    <div>{lesson.title}</div>
                  </a>
                </li>
              </React.Fragment>
              )}
            </ul>
          </div>
          </React.Fragment>))
        }
      </nav>
    </>
  );
}




 type LoadSubject  = {
  title: string, 
  id: string,
  level: number,
  Lesson: {
    title: string,
    id: string,
    level: number
  } []
 }