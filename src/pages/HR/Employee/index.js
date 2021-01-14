import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconSetting, iconUser } from '../../../assets'
import { PageHeader, PageContentMenu, Icon } from '../../../components'

const Employee = (props) => {
    // console.log(props)
    const menuEmployee = [
        { text: 'Daftar Karyawan', href: '/employee/list' },
        { text: 'Jadwal', href: '/employee/schedule'},
        { text: 'Kehadiran', href: '/employee/attendance'},
        { text: 'Tugas', href: '/employee/task'},
        { text: 'Izin', href: '/employee/permit'},
        { text: 'Cuti', href: '/employee/leave'},
        { text: 'Lembur', href: '/employee/overtime'},
        { text: 'Penggantian Biaya', href: '/employee/reimbursement'},
        { text: 'Pinjaman', href: '/employee/loan'},
        { text: 'BPJS Kes & TK', href: '/employee/bpjs'},
        { text: 'PPh 21', href: '/employee/pph21'},
        { text: 'Penggajian', href: '/employee/payroll'},
        { text: 'Surat Peringatan', href: '/employee/warning-letter'},        
    ];
    return (
        <>
        <PageHeader
            title="Karyawan"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
        />
        <PageContentMenu height={'165px'} mobileHeight={'105px'} bgColor={'white'} color={'#222'} gap={'15px'}>
                {menuEmployee.map(menu => (
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
export default connect(reduxState, reduxDispatch)(Employee)