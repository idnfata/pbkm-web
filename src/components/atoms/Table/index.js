/*
 1. Get Data to display
 2. Define the columns of table
 3. Use data and columns defined to create a table instance using react-table
 4. Define a basic table structure using plain HTMl
 5. Use the table instance created in step 3 to bring life to the HTML defined in step 4
 6. Styling
*/

import React from 'react'
import {BasicTable} from './Basic'
import {CheckTable} from './Check'
import DataTable from './DataTable'
import {SearchTable} from './Search'


function Table (props) {
  const { type, ...rest } = props
  switch (type) {
    case 'basic':
      return <BasicTable {...rest} />
    case 'dataTable':
      return <DataTable {...rest} />
    case 'withSearch':
      return <SearchTable {...rest} />
    case 'withCheck':
      return <CheckTable {...rest} />
    default:
      return null
  }
}

export default Table

