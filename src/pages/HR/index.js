import React from 'react'
import { ContentWrapper, HRDashboard, MenuWrapper, Wrapper } from '../../components'
import {  BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Menu from '../../components/molecules/Menu'
import { connect } from 'react-redux'

const HRPage = (props) => {
    // console.log(props)
    const {user} = props;
    return (
        <>
            <Router>
                <Switch>
                    <Wrapper>
                        <MenuWrapper>
                            <Menu role={user.role} />
                        </MenuWrapper>
                    
                        <ContentWrapper>
                        
                            {/* <Route path="/master/hr" exact component={MasterHR} /> */}
                            {/* <Route path="/master/hr/create" exact component={CreateMasterHR} /> */}
                            {/* <Route path="/master/hr/detail" exact component={DetailMasterHR} /> */}
                            <Route path="/" exact component={HRDashboard} />

                            {/* <Route path="/profile" exact component={Profile} />
                            <Route path="/profile/change-password" exact component={ChangePassword} /> */}

                        </ContentWrapper>
                    </Wrapper>
                </Switch>
            </Router>
        </>
    )
}

// export default HRPage
const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading
})
  
  
const reduxDispatch = (dispatch) => ({
    // setUserData : (data) => dispatch(setUser(data))
    

})
export default connect(reduxState, reduxDispatch)(HRPage)