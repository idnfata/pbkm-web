import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import 'react-datepicker/dist/react-datepicker.css'

function DatePicker (props) {
  const { label, name, ...rest } = props
  const handleChange = (name, e, setFieldValue) => {
    const value = e;
    // console.log(e);
    setFieldValue(name, value)
    if(props.callback){
      // console.log(`value ${value}`)
      props.callback(value);

    }
  }
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={e => handleChange(name, e, setFieldValue)}
              placeholderText="Pilih tanggal..."
              autoComplete="off"
            />
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default DatePicker