import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconUser } from '../../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../../components'
import { WrapperFormRequest } from '../request.elements'
import LeaveForm from './LeaveForm'


const RequestLeave = (props) => {
    const history = props.history;
    const leave = props.location.state.leave;
    const employee = props.user.info;
    // console.log(props)


    

    useEffect(() => {
        
        // console.log(leave)
    }, []);


    return (
        <>
            <PageHeader
                title="Form Pengajuan Cuti"
                subtitle={props.user.client_id}
                mobileTitle="Pengajuan Cuti"
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                    <Link to='/leave' className="back-button" >                    
                        <Icon icon={iconLeft} color="#fff" />
                        <p>Back</p>
                    </Link>
                </Col>

            </Row>
            <WrapperFormRequest>
                <div className="fr-header">
                    Form Pengajuan {leave.leave_type_name}
                </div>
                <div className="fr-body">
                    <LeaveForm setting={leave} employee_id={employee.id} token={props.user.token} history={history} />
                </div>
            </WrapperFormRequest>
            
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
export default connect(reduxState, reduxDispatch)(RequestLeave)
