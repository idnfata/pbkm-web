import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {GetAccount, Login, ResetPassword, MainApp} from '../../pages';


const Routes = () => {
    // console.log(props)
    return (
        <Router>
            <Switch>
                <Route path="/login" exact strict component={Login} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/get-account" component={GetAccount} />
                <Route path="/" component={MainApp} />  
            </Switch>
        </Router>
    )
}

export default Routes
