/* eslint-disable react/jsx-key */
import { Subject } from "@/types/subject.type";
import { FC, useState } from "react";
import { useGlobalFilter, useTable } from "react-table";
import { TableData, TableHeader } from "../type";
import FormComponent from "./form";
const ContentComponent: FC<{
  header: TableHeader[] | any[] | undefined;
  data: TableData[] | any[];
  type: "subject" | "lesson" | "content" | "exercies";
  sContentId: string, sLessonId:string, sSubjectId: string
  mutator: () => void;
}> = (prpo) => {
  const { header, data, type, mutator, sContentId, sLessonId, sSubjectId } = prpo;
  return (
    <>
      <section className="md:max-w-[80%] w-full">
        <Table
        sContentId={sContentId}  sLessonId={ sLessonId} sSubjectId={sSubjectId}
          columns={
            header?.map((th) => ({ Header: th.name, accessor: th.key })) || []
          }
          data={data}
          type={type}
          mutator={mutator}
        />
      </section>
    </>
  );
};
const Table = ({ columns, data, type, mutator, sContentId, sLessonId, sSubjectId  }: any) => {
  const [form, setForm] = useState< any>({
    title: "",
    language: "",
    level: 0,
    code: '',    
    comment: '', 
    user_id: '', 
    exercise_id: '', 
    content_id: '', 
    lesson_id: '', 
    point: '', 
    answers: '', 
    id: '', 
    description: '', 
    subdescription: '', 
    subtitle: '', 
  });
  const [op, setOp] = useState<"add" | "edit">("add");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  // Render the UI for your table
  return (
    <>
      <div className="flex justify-between items-center mb-20 w-full">
        <div></div>
        <div>
          <label
            className="btn btn-accent"
            htmlFor="my-modal-4"
            onClick={() => {
              setForm({
                title: "",
                language: "",
                level: 0,
                code: '',    
                comment: '', 
                user_id: '', 
                exercise_id: '',  
                content_id: '', 
                lesson_id: '', 
                point: '', 
                answers: '', 
                id: '', 
                description: '', 
                subdescription: '', 
                subtitle: '', 
              });
              setOp("add");
            }}
          >
            {type}
          </label>
        </div>
      </div>
      <div className="overflow-x-auto  w-full">
        <table {...getTableProps()} className="table table-zebra w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
                <th></th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  <td className="flex justify-end">
                    <label
                      htmlFor="my-modal-4"
                      className="btn bg-warning text-white"
                      onClick={() => {
                        setOp("edit");
                        setForm(() => row["original"] as Subject);
                        console.log("form ==<", form);
                        console.log("row ==<", row);
                      }}
                    >
                      edit
                    </label>
                    <label
                    onClick={() => {
                        deletItem((row["original"] as Subject).id!, type).then(
                          mutator
                        );
                      }}
                      className="btn bg-error text-white"
                    >
                      delete
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer ">
        <label
          className="modal-box relative flex flex-col gap-8 text-[1.6rem]"
          htmlFor=""
        >
          <div className="">{type}</div>
          <FormComponent
            sSubjectId= {sSubjectId} 
            sLessonId={sLessonId} 
            sContentId={sContentId}
          
          mutator={mutator} data={form} op={op} type={type} />
        </label>
      </label>
    </>
  );
};
const deletItem = async (id: string, type: string) => {
  await fetch("/api/" + type + "/?id=" + id, {
    method: "DELETE",
  }).then(() => console.log("delete success"));
};
export default ContentComponent;

{
  /* <div className="overflow-x-auto  w-full">
  <table className="table table-zebra w-full">
    <thead>
      <tr>
        {header?.map((th, i) => (
          <>
            <th key={i}>{th.name}</th>
          </>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((d, i) => {
        (d["pos"] = counter++);
        const key = header?.map((h) => h.name as string);
        return (
          <React.Fragment  key={d['id']}>
            <tr>
              {key?.map((td) => (
                <React.Fragment  key={d[td]}>
                  <td key={d["pos"]}>{d[td]}</td>
                </React.Fragment> 
              ))} 
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  </table>
</div> */
}
