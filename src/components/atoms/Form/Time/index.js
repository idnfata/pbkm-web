import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import 'react-datepicker/dist/react-datepicker.css'
import TimeField from 'react-simple-timefield'

function TimeInput (props) {
  const { label, name, ...rest } = props
  const handleChange = (name, e, val, setFieldValue) => {
    const value = e.target.value;
    // console.log(name);
    // console.log(e);
    // console.log(val);
    // console.log(setFieldValue);
    setFieldValue(name, value)
    
  }
  return (
    <>
     <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <TimeField
              id={name}
              {...field}
              {...rest}
              value={value}
              colon=":" 
              onChange={(e, val) => handleChange(name, e, val, setFieldValue)}
              style={{width: '92%'}}
              
            />
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
     </div>
    </>
  )
}

export default TimeInput