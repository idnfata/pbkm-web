import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'

function Input (props) {
  const { label, name, ...rest } = props
  const handleChange = (name, e, setFieldValue) => {
    const value = e.target.value;
    // console.log(props.callback);
    setFieldValue(name, value)
    if(props.callback){
      // console.log(`value ${value}`)
      props.callback(value);

    }
  }
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      {/* <Field id={name} name={name} {...rest} /> */}
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <Field id={name} name={name} {...rest} onChange={e => handleChange(name, e, setFieldValue)} />
            
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input