import React from 'react'
import { Formik, Form, getIn } from 'formik'
import * as Yup from 'yup'
import { LoginBg, Logo } from '../../assets'
import { Button, FormControl, Gap, Title } from '../../components'
import { FormWrapper, ImageWrapper, LoginContainer, LoginImage, LoginLogo, LoginFailed } from './login.elements'
import { connect } from 'react-redux'
import { userLoginAPI } from '../../config/redux/action'
import { Link, Redirect, useHistory } from 'react-router-dom'





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

const Login = (props) => {
  const token = localStorage.getItem('token');
  // console.log(`login page:`);
  // console.log(props);
  const {history} = props;
  // console.log(history);
  if(token) {
    // console.log('sudah login');
    return <Redirect to='/' />


  }


  const onSubmit = async data => {
    // console.log('Form data', data)
    // console.log('Saved data', JSON.parse(JSON.stringify(data)))
    const res = await props.loginAPI(data).catch(err => err);

    if(res){
      // history.go(0);
      history.push('/');
      
    }
  }
 
  
    return (
      <>
        
        
        <LoginContainer>
       
            <ImageWrapper>
                <LoginImage src={LoginBg} alt="Login Background" />
            </ImageWrapper>

            <FormWrapper>
                <LoginLogo src={Logo} alt="Logo" />
                <Gap height={50} />
                <Title>Login Page</Title>
                <Gap height={10} />
                {
                  props.message && (
                    <LoginFailed>{props.message}</LoginFailed>
                  )
                }

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
                

                <Gap height={70} />
                    <p>{props.popupProps}</p>
              <Link to="/get-account">Belum punya akun?</Link>
            </FormWrapper>
        </LoginContainer>
      </>
    )
}
//mengambil state yang ada di store, memasukkannya ke state komponen ini
const reduxState = (state) => ({
  isLoading: state.isLoading,
  // isLogin: state.isLogin,
  message: state.message,
  // user: state.user
})

//panggil dispatch dengan cara onclick atau on apa kaitu na

const reduxDispatch = (dispatch) => ({
  loginAPI : (data) => dispatch(userLoginAPI(data))
})

//connect itu digunakan supaya komponen ini bisa membaca store redux
export default connect(reduxState, reduxDispatch)(Login);
