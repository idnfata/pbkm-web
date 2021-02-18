import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconSetting, iconUser } from '../../../assets'
import { PageContentMenu, PageHeader } from '../../../components'

const MakeARequest = (props) => {
    // console.log(props)
    const menuRequest = [
        { text: 'Cuti', href: '/leave'},
        { text: 'Lembur', href: '/overtime'},
        { text: 'Izin', href: '/permit'},
        // { text: 'Penggantian Biaya', href: '/reimbursement'},
        { text: 'Pinjaman', href: '/loan'},
        { text: 'Ubah Data', href: '/request/change-data'},
        { text: 'Pakai Aset', href: '/using-asset'},
     
    ];
    return (
        <>
        <PageHeader
            title="Pengajuan & Izin"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
        />
        <PageContentMenu height={'165px'} mobileHeight={'105px'} bgColor={'white'} color={'#222'} gap={'15px'}>
                {menuRequest.map(menu => (
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
export default connect(reduxState, reduxDispatch)(MakeARequest)