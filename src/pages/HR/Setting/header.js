import React from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { iconSetting, iconUser } from '../../../assets'
import { Col, Gap, Icon, PageContentMenu, PageHeader, Row, SubMenu, SubMenuItem } from '../../../components'



const HRMenuSetting = (props) => {
    // console.log(props)
    
    const menuSetting = [
        { text: 'Perusahaan', href: '/setting/company', subMenu: [
            {text: 'Informasi Perusahaan', href: '/setting/company/info'},
            {text: 'Cabang', href: '/setting/company/branch'},
            {text: 'Departemen', href: '/setting/company/department'},
            {text: 'Jabatan', href: '/setting/company/position'}
        ] },
        { text: 'Jadwal Kerja', href: '/setting/schedule', subMenu: [
            {text: 'Tim/Grup', href: '/setting/schedule/team-group'},
            {text: 'Lokasi', href: '/setting/schedule/location'},
            {text: 'Shift', href: '/setting/schedule/shift'},
            {text: 'Hari Libur', href: '/setting/schedule/holiday'}
        ] },
        { text: 'Cuti', href: '/setting/leave', },
        { text: 'Izin', href: '/setting/permit', },
        { text: 'Lembur', href: '/setting/overtime', },
        { text: 'Pinjaman', href: '/setting/loan', },
        { text: 'BPJS Kes & TK', href: '/setting/bpjs', },
        { text: 'PPh 21', href: '/setting/pph21', },
        { text: 'Penggajian', href: '/setting/payroll', },
        
    ];
    return (
        <>
            <PageHeader
                title={`Pengaturan ${props.pageName}`}
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            {/* <Gap height={20} /> */}
            <PageContentMenu rightLeftBorder>
                {menuSetting.map(menu => (
                    <div key={menu.href} data={menu.href} className={`menu-item ${  props.location.split('/')[2] == menu.href.split('/')[2] ? 'active' : '' }`} text={menu.text} onClick={props.setPageSetting}>                    
                        {menu.text}
                    {/* loop sub Menu */}
                    {menu.subMenu && <SubMenu>
                        {menu.subMenu.map(sub_menu => (
                            <SubMenuItem key={sub_menu.href}>
                                <a text={sub_menu.text} data={sub_menu.href} onClick={props.setPageSetting} className={`sub-menu-link ${ props.location.split('/')[3] == sub_menu.href.split('/')[3] ? 'active' : '' }`}>
                                    {sub_menu.text}
                                </a>
                            </SubMenuItem>
                            // console.log(sub_menu)
                        ))}
                    </SubMenu> }
                    </div>
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
export default connect(reduxState, reduxDispatch)(HRMenuSetting)