import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import DatePicker from './DatePicker'
import FormatNumber from './FormatNumber'
import TimeInput from './Time'
// import ChakraInput from '../ChakraInput'

function FormControl (props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'date':
      return <DatePicker {...rest} />
    case 'time':
      return <TimeInput {...rest} />
    case 'format-number':
      return <FormatNumber {...rest} />
    // case 'chakraInput':
    //   return <ChakraInput {...rest} />
    default:
      return null
  }
}

export default FormControl