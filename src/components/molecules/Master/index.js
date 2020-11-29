import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { setLoading } from '../../../config/redux/action';
import { Col, Gap, Row } from '../../atoms';
import MasterHeader from '../Header/Master';

const Master = (props) => {
    // console.log(props)
    const table = [
        { name: 'User', href: '/master/user'},
        { name: 'User Role', href: '/master/user-role'}
    ];
    return (
        <>
            <MasterHeader
                title="Master Page"
                table={table}
                buttonName="Add Master"
                buttonTo="/add-master"
            />
            <Gap height={100} />
            <Row>
                <Col>halaman untuk ke masing masing master</Col>
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
    setLoading : (isLoading) => dispatch(setLoading(isLoading))
    

})
export default connect(reduxState, reduxDispatch)(Master)