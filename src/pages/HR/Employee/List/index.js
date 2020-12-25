import React from 'react'
import { connect } from 'react-redux';
import { iconUser } from '../../../../assets';
import { Gap, PageHeader, PageContent } from '../../../../components'
import { ListEmployeeContainer } from './employee-list.elements';

const EmployeeList = (props) => {
    console.log(props);
    return (
        <>
            <PageHeader
                title="Daftar Karyawan"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
                
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
export default connect(reduxState, reduxDispatch)(EmployeeList)