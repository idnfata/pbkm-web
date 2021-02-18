import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components'


const RequestUsingAsset = (props) => {
    
    return (
        <>
            <PageHeader
                title="Form Pengajuan Menggunakan Aset"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                    <Link to='/using-asset' className="back-button" >                    
                        <Icon icon={iconLeft} color="#fff" />
                        <p>Back</p>
                    </Link>
                </Col>
      
            </Row>
            <Row>
                Form pengajuaan menggunakan aset perusahaan
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
export default connect(reduxState, reduxDispatch)(RequestUsingAsset)
