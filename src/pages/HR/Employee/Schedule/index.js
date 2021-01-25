import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components'
import API from '../../../../config/api'

const EmployeeSchedule = (props) => {
    const [groups, setGroups] = useState([]);
    const [message, setMessage] = useState('');
    // console.log(props);
    const token = props.user.token;
    useEffect(() => {
        API.getGroupScheduleInfo(token).then((res) => {
            // console.log(res);
            setGroups(res.data)
            // console.log(groups);
            // groups.map(group => (

            // ))
            
        }).catch(err => {
            // console.log(err.response.data.message);
            setMessage(err.response.data.message);
        })
    }, []);
    return (
        <>
             <PageHeader
                title="Jadwal Kerja Karyawan"
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
            <Gap height={20} />
         
            <Row>

            {
                groups.length > 0 ? 
                groups.map(group => (
                    <Link key={group.name} to={{
                        pathname: `schedule/${group.id}`,
                        state:group
                    }} >                    
                        {group.name}
        
                    </Link>
                ))
                :
                <Col>
                    Tim/Grup tidak ditemukan, tambahkan terlebih dahulu.
                </Col>
            }
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
export default connect(reduxState, reduxDispatch)(EmployeeSchedule)
