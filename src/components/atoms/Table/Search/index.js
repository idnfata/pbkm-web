import React, {useMemo} from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import '../table.css';
import { GlobalFilter } from '../GlobalFilter';

export const SearchTable = (props) => {
    const { tableData, tableColumns, ...rest } = props
    const columns = useMemo(() => tableColumns, []);
    // const columns = useMemo(() => GROUPED_COLUMNS, []);
    const data = useMemo(() => tableData, []);
    /**
     *  3. Use data and columns defined to create a table instance using react-table
     * useTable menerima parameter berisi objek, kolom yang sudah didefinisikan, dan data 
     */
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data
    },
    useGlobalFilter,
    useSortBy);

    const {globalFilter} = state;

    /*
     *  4. Define a basic table structure using plain HTMl
     */
    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        { column.render('Header') }
                                        {/* <span>
                                            {column.isSorted ? (column.isSortedDesc ? '⇑' : '⇓') : `⇅`}
                                        </span> */}
                                        {column.isSorted ? (column.isSortedDesc ? <span className="sorted">⇊</span> : <span className="sorted">⇈</span>) : <span>⇅</span>}
                                    </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return (<td {...cell.getCellProps()}>{ cell.render('Cell') }</td>)
                                })
                            }
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>

        </>
    )
}