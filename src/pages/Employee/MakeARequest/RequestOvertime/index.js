import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../../assets'
import { Button, Col, FormControl, Gap, Icon, PageHeader, Row } from '../../../../components'
import API from '../../../../config/api'
import { tahun_bulan_tanggal } from '../../../../utils/helpers/date'
import { getStyle } from '../../../../utils/helpers/errorMessage'
import { RequestOvertimeFields, RequestOvertimeValidationSchema } from '../fields'

const RequestOvertime = (props) => {
    // console.log(props)
    const token = props.user.token;
    const employee = props.user.info;
    const [message, setMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(tahun_bulan_tanggal(new Date));
    const [schedule, setSchedule] = useState(null);

    const initialValues = {
        date : null,
        start_from: '',
        ends_on: '',
        desc: ''
    };

    const handleSubmit = async data => {
        console.log('simpan data');
        console.log(data)
    }

  
    RequestOvertimeFields[0].callback;
    RequestOvertimeFields[0].callback = (value) => {
        setSelectedDate(value);

    };
    useEffect(() => {
        //check apakah tanggal yang dipilih punya jadwal? jika tidak maka jenis lemburnya adalah lembur di hari libur
        //check apakah tanggal yang dipilih hari libur? jika iya maka jenis lemburnya adalah lembur di hari libur
        //check apakah hari liburnya adalah hari libur jam kerja terpendek, jika iya maka jenis lemburnya adlaah lembur di hari libur jam kerja terpendek
        console.log(selectedDate);

        API.checkTodayScheduleOfEmployee(token, employee.id, selectedDate).then(res => {
            setSchedule(res.data);
            

        }).catch(err => {
            console.log(err.response.data.message)
            setSchedule(null);
        });
    }, [selectedDate])
    return (
        <>
            <PageHeader
                title="Form Pengajuan Lembur"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/overtime' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                </Col>
            
            </Row>
            <Gap height={20} />
            <Row>
                <Formik enableReinitialize initialValues={initialValues}
                 validationSchema={RequestOvertimeValidationSchema}
                 onSubmit={handleSubmit} >
                    {({errors, touched, isValid}) => (
                    <Form>
                         {
                            RequestOvertimeFields.map(field => (
                                // console.log(field)
                                <FormControl key={field.name}
                                    control={field.control}
                                    type={field.type}
                                    label={field.label}
                                    name={field.name}
                                    style={getStyle(errors, touched, field.name)}
                                    options={field.options}
                                    callback={field.callback}
                                />
                            ))
                        }    
                        <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" 
                        disabled={!isValid || props.isLoading}
                        className={props.isLoading ? 'btnLoading' : null}>Ajukan</Button>
                    </Form>
                    )}
                </Formik>   
            </Row>

        
        </>
    )
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),

    

})
export default connect(reduxState, reduxDispatch)(RequestOvertime)
