import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import BasicInformation from './BasicInformation'
import DetailPayroll from './DetailPayroll'
import EmployeeDetailAttendance from './EmployeeDetailAttendance'
import EmployeeLogActivities from './EmployeeLogActivities'
import HeaderDetail from './header'
import HistoryAssignment from './HistoryAssignment'
import UsedAsset from './UsedAsset'

const DetailEmployee = (props) => {
    console.log(props)
    const {employee} = props.location.state
    const [pageName, setPageName] = useState('Informasi Dasar');
    const [location, setLocation] = useState('/employee/detail/basic-information');
    const setPageDetail = (e) => {
        e.stopPropagation();
        const link = e.target.getAttribute('data');
        const text = e.target.getAttribute('text');
        setPageName(text);
        setLocation(link);
    
    }
    let element;

    switch (pageName) {
        case 'Informasi Dasar':
            element = <BasicInformation employee={employee} />;
            break;
    
        case 'Kehadiran':
            element = <EmployeeDetailAttendance employee={employee} />
            break;
    
        case 'Penugasan':
            element = <HistoryAssignment employee={employee} />
            break;
    
        case 'Payroll':
            element = <DetailPayroll employee={employee} />
            break;
    
        case 'Aset':
            element = <UsedAsset employee={employee} />
            break;
    
        case 'Riwayat Aktivitas':
            element = <EmployeeLogActivities employee={employee} />
            break;
    
        default:
            break;
    }
    return (
        <>
            <HeaderDetail setPageDetail={setPageDetail} location={location} pageName={pageName} employee={employee} />
            {element}
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
export default connect(reduxState, reduxDispatch)(DetailEmployee)