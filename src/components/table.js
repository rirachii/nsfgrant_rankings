import { useTable, useExpanded, usePagination } from "react-table";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./table.css"; 

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    page,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 25 },
        }, 
        useExpanded, 
        usePagination
    );

  return ( 
  <>
      {/* <button className="page-button" onClick={() => nextPage()} disabled={!canNextPage} >
          {'>'}
      </button>
      <button className="page-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
      </button> */}
      
      <ul className="pagination">
        <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <a className="page-link">First</a>
        </li>
        <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
            <a className="page-link">{'<'}</a>
        </li>
        <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
            <a className="page-link">{'>'}</a>
        </li>
        <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <a className="page-link">Last</a>
        </li>
        <li>
            <a className="page-link">
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </a>
        </li>
      <select
        className="form-control"
        value={pageSize}
        onChange={e => {
            setPageSize(Number(e.target.value))
        }}
        style={{ width: '120px', height: '38px' }}
      > 
      {[25, 50, 100, 250, 500].map(pageSize => (
          <option key={pageSize} value={pageSize}>
              Show {pageSize}
          </option>
      ))}
      </select>
        
    </ul>
        
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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
      
    </>
  );
}