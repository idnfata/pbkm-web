import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import NumberFormat from 'react-number-format'



function FormatNumber (props) {
  const { label, name, ...rest } = props
  const [formattedValue, setFormattedValue] = useState();
  return (
    // <div className='form-control'>
    //   <label htmlFor={name}>{label}</label>
    //   <Field name={name}>
    //     {({ form, field }) => {
    //       const { setFieldValue } = form
    //       const { value } = field
    //       return (
    //         <NumberFormat
    //           id={name}
    //           {...field}
    //           {...rest}
    //           thousandSeparator={true} prefix={'Rp. '}
    //           onValueChange={val => setFieldValue(name, val.floatValue)}
    //           value={value}
    //         />
    //       )
    //     }}
    //   </Field>
    //   <ErrorMessage component={TextError} name={name} />
    // </div>
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