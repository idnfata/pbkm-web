import React from 'react'
import { Formik, Form, getIn } from 'formik'

const initialValues = {
    email: '',
    password: '',
  }

const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email'),
    password: Yup.string().required('Required')

})




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

const MasterForm = () => {
    const onSubmit = async data => {
        // console.log('Form data', data)
        // console.log('Saved data', JSON.parse(JSON.stringify(data)))
        const {history} = props;
        const res = await props.loginAPI(data).catch(err => err);
        if(res){
          history.push('/');
        }
      }
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    {({errors, touched, isValid}) => (
                        <Form>
                            <FormControl
                              control='input'
                              type='email'
                              label='Email'
                              name='email'
                              style={getStyle(errors, touched, 'email')}
                            />
                            <FormControl
                              control='input'
                              type='password'
                              label='Password'
                              name='password'
                              style={getStyle(errors, touched, 'password')}
                            />

                            <Button shadowSetting buttonFull buttonColor='#222' buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{props.isLoading ? 'Loading...' : 'Login'}</Button>
                        </Form>
                    )}
            </Formik>
        </>
    )
}

export default MasterForm

/**
 * 1. Definisikan form-form input apa saja yang diperlukan oleh masing-masing master data
 * 2. 
 */
