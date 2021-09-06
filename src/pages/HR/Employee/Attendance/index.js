import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageContentMenu, PageHeader, Row } from '../../../../components'
import API from '../../../../config/api'

const EmployeeAttendance = (props) => {
    const [division, setDivision] = useState(null);
    const token = props.user.token;

    useEffect(() => {
        //get division by client_id
        API.getAllDivision(token).then((res) => {
            setDivision(res.data)
            
            
        }).catch(err => {
            console.log(err.response);
            // console.log(err.response.data.message);
        })
    }, [])
    return (
        <>
             <PageHeader
                title="Kehadiran Karyawan"
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
            <PageContentMenu height={'165px'} mobileHeight={'105px'} bgColor={'white'} color={'#222'} gap={'15px'}>
                {division && division.map(div => (
                    
                    <Link key={div.name} 
                    to={{
                        pathname: `attendance/division/${div.id}`,
                        state:div
                    }} 
                    className="menu-item" >                    
                        <p>{div.name}</p>
    
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
export default connect(reduxState, reduxDispatch)(EmployeeAttendance)
