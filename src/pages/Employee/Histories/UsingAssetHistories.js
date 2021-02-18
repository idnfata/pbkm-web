import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'

const UsingAssetHistories = (props) => {
    // console.log(props)
    const token = props.user.token;
    const employee = props.user.info;
    const [overtimes, setOvertimes] = useState([]);
    const [message, setMessage] = useState('');
    


    return (
        <>
            <PageHeader
                title="Riwayat Penggunaan Aset Perusahaan"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                    <Link to='/request' className="back-button" >                    
                        <Icon icon={iconLeft} color="#fff" />
                        <p>Back</p>
                    </Link>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Link to='/request/using-asset' className="add-button">
                            <Icon icon={iconAdd} color="#fff" />
                            Ajukan Penggunaan Aset
                    </Link>
                </Col>
            </Row>
            halaman history penggunaan aset perusahaan
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
export default connect(reduxState, reduxDispatch)(UsingAssetHistories)
