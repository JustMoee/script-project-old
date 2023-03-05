/* eslint-disable react/jsx-key */
import { AppProps } from "next/app";
import React from "react";
import { FC, useState } from "react";
import { TableData, TableHeader } from "../type";
import { useAsyncDebounce, useGlobalFilter, useTable } from "react-table";
import FormComponent from "./form";
const ContentComponent: FC<{
  header: TableHeader[] | any[] | undefined;
  data: TableData[] | any[];
}> = (prpo) => {
  const { header } = prpo;
  const { data } = prpo;
  //  const {filter, setFilter} = useState<string>('');
  let counter = 0;
  console.log(prpo);
  return (
    <>
      <section className="md:max-w-[80%] w-full">
        <Table
          columns={header?.map((th) => ({ Header: th.name, accessor: th.key }))}
          data={data}
        />
      </section>
    </>
  );
};
const Table = ({ columns, data }: any) => {
  // Use the state and functions returned from useTable to build your UI
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
        <div >
        <label  className="btn btn-accent" htmlFor="my-modal-4">
          Button
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
            <FormComponent data={{title: '', level: 0, language: ''}} op="add" type="subject" />
        </label>
      </label>
    </>
  );
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
