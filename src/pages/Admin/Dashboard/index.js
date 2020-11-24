import React, { useEffect, useState } from 'react'
import {Gap, Row, Col, ProfileMenu, UserPageTitle } from '../../../components'
import { connect } from 'react-redux'
import { iconUser } from '../../../assets'

const AdminDashboard = (props) => {
    const [title, setTitle] = useState('');
    
    const tanggal = new Date();

    const jam = tanggal.getHours();
    useEffect(() => {
        if((jam >= 19 && jam <= 24) || jam < 5 ){
            setTitle('Selamat Malam');
        }else if(jam >= 5 && jam < 11){
            setTitle('Selamat Pagi');
        }else if(jam >= 11 && jam < 16){
            setTitle('Selamat Siang');
        }else if(jam >= 16 && jam < 19 ){
            setTitle('Selamat Sore');
        }
    }, []);
    return (
        <>
        <Row>
            <UserPageTitle title={title} />
            <ProfileMenu name={props.user.name} photo={iconUser} />
        </Row>
        
        <Gap height={20} />
        <Row>
            <Col>
                <h2>Dashboard Admin</h2>
            </Col>
        
        </Row>
        </>
    )
}


const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
})
  
  
const reduxDispatch = (dispatch) => ({
    setUserData : (data) => dispatch(setUser(data))
    

})
export default connect(reduxState, reduxDispatch)(AdminDashboard)

