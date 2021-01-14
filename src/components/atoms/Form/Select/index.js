import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'

function Select (props) {
  const { label, name, options, ...rest } = props
  const handleChange = (name, e, setFieldValue) => {
    const value = e.target.value;
    // console.log(e.target.value);
    setFieldValue(name, value)
    if(name == 'division_id'){
      // console.log(`division id ${value}`)
      props.callback(value);

    }
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
            <Field as='select' id={name} name={name} {...rest} onChange={e => handleChange(name, e, setFieldValue)}>
            {options.map(option => {
              return (
                <option key={option.key} value={option.value}>
                  {option.key}
                </option>
              )
            })}
          </Field>
            
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  
    </>
  )
}

export default Select