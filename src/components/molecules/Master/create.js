import React, { useEffect, useState } from 'react'
import { Formik, Form, getIn } from 'formik'
import { Button, Col, FormControl, Gap, Row, Title } from '../../atoms'
import { connect } from 'react-redux'
import { fieldsUser, usersInitVal, usersValidationSchema } from './form'
import splitEvery from '../../../utils/helpers/splitArrayEvery'
import { createUserAPI } from '../../../config/redux/action'
import swal from 'sweetalert';



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

const CreateMaster = (props) => {
    // console.log(props);
    const token = localStorage.getItem('token');
    const pageName = props.match.params.table;
    const tableName = pageName.split('-').join('_') + 's';
    // console.log(tableName);
    const [formField, setFormField] = useState([]);
    // const [submitAction, setSubmitAction] = useState();
    const [schemaValidation, setSchemaValidation] = useState({});
    const [initialValues, setInitialValues] = useState({});
    //buat form field yang diperlukan oleh masing-masing master data,
    //nanti const array of object tu di looping supaya membentuk sebuah form

    const onSubmit = async data => {
        // console.log('Form data', data)
        // console.log('Saved data', JSON.parse(JSON.stringify(data)))
        const {history} = props;
        props.createUser(token, data).then(res => {
            // console.log(res);
            swal({
                title: res.status,
                text: res.message,
                icon: "success",
            });
            history.goBack();

        }).catch(err => {
            console.log(err);
            swal({
                title: err.status,
                text: err.message,
                icon: "error",
            });

        });
      
      }
    useEffect(() =>{
        switch (tableName) {
            case 'users':
                setFormField(fieldsUser)
                setInitialValues(usersInitVal)
                setSchemaValidation(usersValidationSchema)
                // console.log(initialValues);
                //ambil form users di component FormUsers yang ada di folder masterform
                break;
            case 'user_roles':
                // setFormField('form field user_roles')
                break;
        
            default:
                break;
        }
    }, [initialValues, schemaValidation])
    let i = 0;
    return (
        <>
        <Row>
            <Button buttonColor='#222' buttonFull width="20px" align="left" onClick={() => props.history.goBack()} >Back</Button>
        </Row>
        <Gap height={30} />
        <Title>Add {pageName}</Title>
        <Gap height={20} />

            <Formik initialValues={initialValues} validationSchema={schemaValidation} onSubmit={onSubmit} >
                    {({errors, touched, isValid}) => (
                        <Form>
                            <div className="form-row">
                            {
                                formField.map(field => (
                                    // console.log(field)
                                    <FormControl key={field.name}
                                        control={field.control}
                                        type={field.type}
                                        label={field.label}
                                        name={field.name}
                                        style={getStyle(errors, touched, field.name)}
                                        options={field.options}
                                    />
                                ))
                                // splitEvery(formField, 2).map(fields => (
                                //     <div className="form-row" key={i++}>
                                //         {fields.map(field => (
                                //             <Col key={field.name}>
                                //             <FormControl key={field.name}
                                //                 control={field.control}
                                //                 type={field.type}
                                //                 label={field.label}
                                //                 name={field.name}
                                //                 style={getStyle(errors, touched, field.name)}
                                //                 options={field.options}
                                //             />
                                //             </Col>
                                //         ))}
                                //     </div>
                                // ))
                            }
                                </div>
                            <Gap height={30} />
                            <Button shadowSetting buttonFull buttonColor='#48c774' buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{props.isLoading ? 'Loading...' : 'Submit'}</Button>
                        </Form>
                    )}
            </Formik>
        </>
    )
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
})
  
  
const reduxDispatch = (dispatch) => ({
    // setUserData : (data) => dispatch(setUser(data))
    createUser : (token, data) => dispatch(createUserAPI(token, data))
    

})
export default connect(reduxState, reduxDispatch)(CreateMaster)


// export default CreateMaster
