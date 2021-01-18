import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import NumberFormat from 'react-number-format'



function FormatNumber (props) {
  const { label, name, ...rest } = props
  const [formattedValue, setFormattedValue] = useState();
  return (
 
    <div className='form-control'>
      <label htmlFor={name}>{label} <NumberFormat style={{marginLeft: 'auto'}} value={formattedValue} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} /></label>
      
      <Field id={name} name={name} {...rest}
        onKeyUp={e => {
          setFormattedValue(e.target.value)
          // <NumberFormat value={e.target.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />

        }}
      />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default FormatNumber