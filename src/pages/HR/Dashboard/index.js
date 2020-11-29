import React, { useEffect, useState } from 'react'
import { Col, DashboardHeader, Gap, Row } from '../../../components'
import { connect } from 'react-redux'
import { iconUser } from '../../../assets'
import { setLoading } from '../../../config/redux/action'

const HRDashboard = (props) => {
    console.log(props)

    const {history, isLoading, loading} = props;
   
    useEffect(() => {
        loading(true)
        setTimeout(() => {
            loading(false)
        }, 500)

    }, [])
    

    return (
        <>
        
        <DashboardHeader name={props.user.name} photo={iconUser} />
        <Gap height={20} />
        <Row>
            <Col>
                <h2>Dashboardnya HR</h2>
            </Col>
        {isLoading ? 'loading...' : 'selesai loading'}

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
export default connect(reduxState, reduxDispatch)(HRDashboard)