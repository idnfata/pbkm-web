import React from 'react'
import { Redirect } from 'react-router-dom';
import { AssetDashboard } from '../../components';

const AssetPage = () => {
    return (
        <>
            <div>
                <p>header asset</p>
                <p>Sidebar asset</p>
                <Router>
                <Switch>
                    {/* <Route path="/master/asset" exact component={Masterasset} /> */}
                    {/* <Route path="/master/asset/create" exact component={CreateMasterHR} /> */}
                    {/* <Route path="/master/hr/detail" exact component={DetailMasterHR} /> */}
                    <Route path="/" exact component={AssetDashboard} />

                    {/* <Route path="/profile" exact component={Profile} />
                    <Route path="/profile/change-password" exact component={ChangePassword} /> */}
                </Switch>
                </Router>
                <p>Footer</p>
            </div>
        </>
    )
}

export default AssetPage
