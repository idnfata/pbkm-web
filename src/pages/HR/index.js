import React from 'react'
import { HRDashboard } from '../../components'
const HRPage = () => {
    return (
        <>
            <div>
                <p>header hr</p>
                <p>Sidebar hr</p>
                <Router>
                <Switch>
                    <Route path="/master/hr" exact component={MasterHR} />
                    <Route path="/master/hr/create" exact component={CreateMasterHR} />
                    <Route path="/master/hr/detail" exact component={DetailMasterHR} />
                    <Route path="/" exact component={HRDashboard} />

                    {/* <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/change-password" exact component={ChangePassword} /> */}
                </Switch>
                </Router>
                <p>Footer</p>
            </div>
        </>
    )
}

export default HRPage
