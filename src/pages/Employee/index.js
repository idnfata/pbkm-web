import React from 'react'
import { EmployeeDashboard } from '../../components'


const EmployeePage = () => {
    return (
        <>
            <div>
                <p>header employee</p>
                <p>Sidebar employee</p>
                <Router>
                <Switch>
                    {/* <Route path="/master/hr" exact component={MasterHR} /> */}
                    {/* <Route path="/master/hr/create" exact component={CreateMasterHR} /> */}
                    {/* <Route path="/master/hr/detail" exact component={DetailMasterHR} /> */}
                    <Route path="/" exact component={EmployeeDashboard} />

                    {/* <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/change-password" exact component={ChangePassword} /> */}
                </Switch>
                </Router>
                <p>Footer</p>
            </div>
        </>
    )
}

export default EmployeePage
