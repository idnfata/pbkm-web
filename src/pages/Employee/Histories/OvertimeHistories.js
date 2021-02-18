import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'

const OvertimeHistories = (props) => {
    // console.log(props)
    const token = props.user.token;
    const employee = props.user.info;
    const [overtimes, setOvertimes] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        API.getEmployeeOvertimeRequest(token, employee.id).then(res => {
            console.log(res);
            setOvertimes(res.data);
        }).catch(err => {
            // console.log(err);
            setMessage(err.response.data.message);
        })
    }, []);


    return (
        <>
            <PageHeader
                title="Riwayat Lembur"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/request' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Link to='/request/overtime' className="add-button">
                            <Icon icon={iconAdd} color="#fff" />
                            Ajukan Lembur

                    </Link>
                </Col>
            </Row>
            <Gap height={20} />

            <div className="riwayat-lembur">
                {(overtimes.length > 0) ?
                    <div className="ada-riwayat-lembur">
                        {overtimes.map(overtime => (
                            <p>
                                {YMdtoDateMonth(overtime.date)} : 
                                <span>
                                {`${overtime.start_from} - ${overtime.ends_on}`}
                                </span>
                            </p>
                        ))}
                    </div> :
                    <div className="tidak-ada-riwayat-lembur">
                        {message}
                    </div>
                }
            </div>

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
export default connect(reduxState, reduxDispatch)(OvertimeHistories)
