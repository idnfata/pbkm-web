import React from 'react'
import { Formik, Form, getIn } from 'formik'
import * as Yup from 'yup'
import FormControl from './index'

function FormikContainer () {

  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' }
  ]

  const radioOptions = [
    { key: 'Option 1', value: 'rOption1' },
    { key: 'Option 2', value: 'rOption2' },
    { key: 'Option 3', value: 'rOption3' }
  ]

  const checkboxOptions = [
    { key: 'Option 1', value: 'cOption1' },
    { key: 'Option 2', value: 'cOption2' },
    { key: 'Option 3', value: 'cOption3' }
  ]

  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    birthDate: null
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email'),
    description: Yup.string().required('Required').min(5, 'Too Short!').max(70, 'Too Long!'),
    selectOption: Yup.string().required('Required'),
    radioOption: Yup.string().required('Required'),
    checkboxOption: Yup.array().required('Required'),
    birthDate: Yup.date()
      .required('Required')
      .nullable()
  })


  const onSubmit = values => {
    console.log('Form data', values)
    console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }


  function getStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
      return {
        border: '1px solid red',
        borderLeft: '5px solid red'
      }
    }else if(!getIn(errors, fieldName) && getIn(touched, fieldName)){
      return {
        border: '1px solid green',

      }
    }
  }


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({errors, touched}) => (
        <Form>
          <FormControl
            control='input'
            type='email'
            label='Email'
            name='email'
            style={getStyle(errors, touched, 'email')}
          />
          <FormControl
            control='textarea'
            label='Description'
            name='description'
            style={getStyle(errors, touched, 'description')}

          />
          <FormControl
            control='select'
            label='Select a topic'
            name='selectOption'
            options={dropdownOptions}
            style={getStyle(errors, touched, 'selectOption')}

          />
          <FormControl
            control='radio'
            label='Radio topic'
            name='radioOption'
            options={radioOptions}

          />
          <FormControl
            control='checkbox'
            label='Checkbox topics'
            name='checkboxOption'
            options={checkboxOptions}

          />
          <FormControl
            control='date'
            label='Pick a date'
            name='birthDate'

          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikContainer