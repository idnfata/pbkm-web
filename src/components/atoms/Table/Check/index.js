import React, {useMemo} from 'react';
import { useTable } from 'react-table';
import '../table.css';

export const CheckTable = (props) => {
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
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    const firstPageRows = rows.slice(0, 10);

    /*
     *  4. Define a basic table structure using plain HTMl
     */
    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map( column => (
                                    <th {...column.getHeaderProps()}>{ column.render('Header') }</th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    firstPageRows.map(row => {
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
    )
}
