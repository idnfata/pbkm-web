import React, { useState } from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from '../TextError'
import 'react-datepicker/dist/react-datepicker.css'
import { tahun_bulan_tanggal } from '../../../../utils/helpers/date'

function DateWithRange (props) {
    const { label, name, ...rest } = props
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = (val, setFieldValue) => {
        const [start, end] = val;
        // console.log(val)
        
        // setFieldValue('date', val.date);

  
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
                minDate={new Date() }
                // maxDate={() => {
                //     // const date = new Date();
                //     // return date.setMonth(date.getMonth()+3)
                //     return new Date(new Date().setDate(new Date().getMonth()+5))
                // }}
                
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