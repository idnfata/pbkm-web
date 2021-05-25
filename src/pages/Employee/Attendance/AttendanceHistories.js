import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconUser } from '../../../assets'
import { PageHeader } from '../../../components'

const AttendanceHistories = (props) => {
    // console.log(props)

    return (<>
        <PageHeader
            title="Riwayat Kehadiran"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
            mobileTitle="Riwayat Kehadiran"
            
        />
        
    </>)
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),

    

})
export default connect(reduxState, reduxDispatch)(AttendanceHistories)