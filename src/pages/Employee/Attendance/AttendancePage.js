import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconSetting, iconUser } from '../../../assets'
import { PageContentMenu, PageHeader } from '../../../components'

const AttendancePage = (props) => {
    // console.log(props)
    const menuAttendance = [
        { text: 'Rekam Kehadiran', href: '/attendance/record'},
        { text: 'Absen Lembur', href: '/attendance/record/overtime'},
        { text: 'Riwayat Kehadiran', href: '/attendance/histories'},
        
     
    ];
    return (
        <>
        <PageHeader
            title="Kehadiran"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
            mobileTitle="Kehadiran"
            
        />
        <PageContentMenu height={'165px'} mobileHeight={'105px'} bgColor={'white'} color={'#222'} gap={'15px'}>
                {menuAttendance.map(menu => (
                    <Link key={menu.href} to={menu.href} className="menu-item" >                    
                        <p>{menu.text}</p>
    
                    </Link>
                ))
                }
        </PageContentMenu>
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
export default connect(reduxState, reduxDispatch)(AttendancePage)