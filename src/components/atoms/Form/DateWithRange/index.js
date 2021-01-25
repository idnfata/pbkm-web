import React, { useState } from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import 'react-datepicker/dist/react-datepicker.css'

function DateWithRange (props) {
    const { label, name, ...rest } = props
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = (val, setFieldValue) => {
        const [start, end] = val;
        console.log(val)
        setStartDate(start);
        setEndDate(end);
        setFieldValue('from_date', start)
        setFieldValue('to_date', end)
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
                onChange={val => onChange(val, setFieldValue)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                maxDate={() => {
                    const date = new Date();
                    return date.setMonth(date.getMonth()+3)
                }}
                showDisabledMonthNavigation
              />
            )
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    )
  }
  
  export default DateWithRange