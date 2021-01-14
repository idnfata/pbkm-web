import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { iconLeft, iconUser } from '../../../../assets';
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components';
import { DetailEmployeeMenu, DetailEmployeeOverview, HeaderDetailEmployee } from './employee-detail.elements';


const HeaderDetail = (props) => {
    const employee = props.employee
    const menuDetail = [
        { text: 'Informasi Dasar', href: '/employee/detail/basic-information', },
        { text: 'Kehadiran', href: '/employee/detail/attendance', },
        { text: 'Penugasan', href: '/employee/detail/history-assignment', },
        { text: 'Payroll', href: '/employee/detail/payroll', },
        { text: 'Aset', href: '/employee/detail/asset', },
        { text: 'Riwayat Aktivitas', href: '/employee/detail/log-activities', },
        
        
    ];

    
    return (
        <>
            <PageHeader
                title={`Detail Karyawan`}
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/employee/list' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                {/* <button onClick={handleAdd} className="back-button">
                            Back

                </button> */}
                </Col>
            </Row>
            <Gap height={20} />
                <HeaderDetailEmployee>
                    <DetailEmployeeOverview>
                        <div className="profile-image">
                            <img src={iconUser} alt="employee-photo" className="employee-photo" />
                        </div>
                        <p className="employee-name">{employee.name}</p>
                        
                        <p className="employee-division-group">{employee.division_name} - {employee.position_name}</p>
                        
                    </DetailEmployeeOverview>
                    <DetailEmployeeMenu>
                    {menuDetail.map(menu => (
                        <div key={menu.href} data={menu.href} className={`menu-item ${  props.location.split('/')[3] == menu.href.split('/')[3] ? 'active' : '' }`} text={menu.text} onClick={props.setPageDetail}>                    
                            {menu.text}
                        </div>
                    ))
                    }
                    </DetailEmployeeMenu>
                </HeaderDetailEmployee>
                
                
        
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
export default connect(reduxState, reduxDispatch)(HeaderDetail)
