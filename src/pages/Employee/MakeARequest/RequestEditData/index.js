import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components'


const RequestEditData = (props) => {
    
    return (
        <>
            <PageHeader
                title="Ubah Data"
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
                {/* <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <button className="add-button">
                        <Icon icon={iconAdd} color="#fff" />
                        Ajukan Pinjaman
                    </button>
                </Col> */}
            </Row>
            halaman request edit data
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
export default connect(reduxState, reduxDispatch)(RequestEditData)
