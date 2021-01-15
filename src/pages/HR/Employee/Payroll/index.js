import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components'

const EmployeePayroll = (props) => {
    return (
        <>
             <PageHeader
                title="Penggajian Karyawan"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/employee' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                {/* <button onClick={handleAdd} className="back-button">
                            Back

                </button> */}
                </Col>
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
export default connect(reduxState, reduxDispatch)(EmployeePayroll)
