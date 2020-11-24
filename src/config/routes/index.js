import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Login, ResetPassword, MainApp} from '../../pages';
// import Guard from './Guard';
// import AssetRoutes from './AssetRoutes';
// import HRRoutes from './HRRoutes';
// import EmployeeRoutes from './EmployeeRoutes'


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login" exact strict component={Login} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/" component={MainApp} />
                
                
            </Switch>
        </Router>
    )
}

export default Routes
