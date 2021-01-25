import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'

function RadioButtons (props) {
  const { label, name, options, ...rest } = props
  const handleChange = (name, e, setFieldValue) => {
    const value = e.target.value;
    // console.log(props.callback);
    setFieldValue(name, value)
    if(props.callback){
      // console.log(`division id ${value}`)
      props.callback(value);

    }
  }
  return (
    <div className='form-control'>
      <label>{label}</label>
      <Field name={name} >
        {({ form, field }) => {
          const { setFieldValue } = form
          return options.map(option => {
            return (
              <React.Fragment key={option.value}>
                <input
                  type='radio'
                  id={option.key}
                  {...field}
                  {...rest}
                  value={option.value}
                  onChange={e => handleChange(name, e, setFieldValue)}
                  checked={field.value === option.value}
                />&nbsp; &nbsp;
                <label htmlFor={option.key}>{option.key}</label>
              </React.Fragment>
            )
          })
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default RadioButtons