import React, { useMemo } from "react";
import { useTable } from "react-table";
import "../table.css";

const DataTable = (props) => {
  const { tableData, tableColumns, ...rest } = props;
//   const columns = useMemo(() => tableColumns, []);
    const columns = tableColumns
    const data = tableData

  // const columns = useMemo(() => GROUPED_COLUMNS, []);
//   const data = useMemo(() => tableData, []);

  /**
   *  3. Use data and columns defined to create a table instance using react-table
   * useTable menerima parameter berisi objek, kolom yang sudah didefinisikan, dan data
   */

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id;
      }),
    },
  });

  /*
   *  4. Define a basic table structure using plain HTMl
   */
  return (
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
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;

// import React, {useState, useEffect, useMemo} from 'react';
// import { useTable, useSortBy, useGlobalFilter } from 'react-table';
// import '../table.css';
// import { GlobalFilter } from '../GlobalFilter';
// import axios from 'axios'

// //apabila diketik suatu keyword, cari data berdasar keyword itu, munculkan paginasinya jua

// export const DataTable = () => {
//     const [tableData, setTableData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPage, setTotalPage] = useState(0);
//     const perPageList = [
//         {label: "2 Data", value: 2},
//         {label: "4 Data", value: 4},
//         {label: "6 Data", value: 6},
//         {label: "10 Data", value: 10},
//     ];
//     const [perPage, setPerPage] = useState(10);
//     //buat select option yang bila diklik nilainya tu, setPerPage jadi nilainya tu

//     const prevButton = () => {
//         setCurrentPage(currentPage - 1);
//     }
//     const nextButton = () => {
//         setCurrentPage(currentPage + 1);

//     }
//     const pageNumberClick = (e) => {
//         // setCurrentPage(e => e.target.id)
//         setCurrentPage(Number(e.target.id));
//     }
//     const changePerPage = (e) => {
//         setPerPage(e.target.value)
//     }

//     const pageNumbers = [];

//         let i = 0;
//         do {
//             i++;
//             // console.log(`halaman sekarang,`, i);
//             pageNumbers.push(i);
//         }while(i < totalPage)

//     const renderPageNumbers = pageNumbers.map(number => {
//         return (
//           <li
//             key={number}
//             id={number}
//             onClick={pageNumberClick}
//           >
//             {number}
//           </li>
//         );
//       });
//     const tableColumns = [
//         {
//             Header: 'Id',
//             Footer: 'Id',
//             accessor: 'id',
//         },
//         {
//             Header: 'First Name',
//             Footer: 'First Name',
//             accessor: 'first_name',
//         },
//         {
//             Header: 'Last Name',
//             Footer: 'Last Name',
//             accessor: 'last_name',
//         },
//         {
//             Header: 'Email',
//             Footer: 'Email',
//             accessor: 'email',
//         },
//         {
//             Header: 'Avatar',
//             Footer: 'Avatar',
//             accessor: 'avatar',
//         }
//     ];
//     const getData = async (page = 1, per_page = 10) => {
//         const result = await axios(
//             `https://reqres.in/api/users?page=${page}&per_page=${per_page}`,
//           )
//           if(result.status == 200){
//               setTableData(result.data.data);
//               setTotalPage(result.data.total_pages);

//             //   console.log(result.data)
//           }
//     };
//     // const renderPageNumber = () => {
//     //     for(let i = 1; i <= totalPage; i++){
//     //         return (
//     //             console.log(i)
//     //         )
//     //     }
//     // }

//     useEffect(() => {
//         getData(currentPage, perPage);
//     }, [currentPage, perPage])

//     const columns = useMemo(() => tableColumns, []);

//     // const columns = useMemo(() => GROUPED_COLUMNS, []);
//     const data = useMemo(() => tableData);

//     /**
//      *  3. Use data and columns defined to create a table instance using react-table
//      * useTable menerima parameter berisi objek, kolom yang sudah didefinisikan, dan data
//      */
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         rows,
//         state,
//         setGlobalFilter,
//     } = useTable({
//         columns,
//         data
//     },
//     useGlobalFilter,
//     useSortBy);

//     const {globalFilter} = state;

//     /*
//      *  4. Define a basic table structure using plain HTMl
//      */
//     return (
//         <>
//          <div>
//              <span>Show :</span>
//             <select onChange={changePerPage} value={perPage}>
//             {perPageList.map(perPage => {
//                 return (
//                 <option key={perPage.value} value={perPage.value}>
//                 {perPage.label}
//                 </option>
//                 )
//                 })
//             }
//             </select>
//             <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//         </div>
//         <table {...getTableProps()}>
//             <thead>
//                 {
//                     headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {
//                                 headerGroup.headers.map( column => (
//                                     <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                         { column.render('Header') }
//                                         {/* <span>
//                                             {column.isSorted ? (column.isSortedDesc ? '⇑' : '⇓') : `⇅`}
//                                         </span> */}
//                                         {column.isSorted ? (column.isSortedDesc ? <span className="sorted">⇊</span> : <span className="sorted">⇈</span>) : <span>⇅</span>}
//                                     </th>
//                                 ))
//                             }
//                         </tr>
//                     ))
//                 }
//             </thead>
//             <tbody {...getTableBodyProps()}>
//                 {
//                     rows.map(row => {
//                         prepareRow(row)
//                         return (
//                         <tr {...row.getRowProps()}>
//                             {
//                                 row.cells.map(cell => {
//                                     return (<td {...cell.getCellProps()}>{ cell.render('Cell') }</td>)
//                                 })
//                             }
//                         </tr>
//                         )
//                     })
//                 }
//             </tbody>
//         </table>
//         <div>
//             {currentPage}
//             <button onClick={() => prevButton()} disabled={currentPage <= 1}>Prev</button>
//             {renderPageNumbers}
//             <button onClick={() => nextButton()} disabled={currentPage >= totalPage}>Next</button>
//         </div>
//         </>
//     )
// }
