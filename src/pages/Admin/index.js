import React, { useEffect } from 'react'
import {  BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import {
    AdminMenu,
    MenuWrapper,
    Wrapper,
    ContentWrapper,
    Master,
    TableMaster,
    CreateMaster,
    DetailMaster,
    EditMaster,
    DeleteMaster,
} from '../../components'
import MainApp from '../MainApp';
import AdminDashboard from './Dashboard';

const AdminPage = () => {
    return (
       <>
       <Router>
            <Switch>
                <Wrapper>
                    <MenuWrapper>
                        <AdminMenu />
                    </MenuWrapper>
                  
                    <ContentWrapper>
                        
                        <Route path="/master" exact component={Master} />
                        <Route path="/master/:table" exact component={TableMaster} />
                        {/* <Route path="/add-master/" exact component={DetailMaster} /> */}
                        <Route path="/master/:table/add" exact component={CreateMaster} />
                        <Route path="/master/:table/edit/:id" exact component={EditMaster} />
                        <Route path="/master/:table/delete/:id" exact component={DeleteMaster} />
                        <Route path="/master/:table/detail/:id" exact component={DetailMaster} />
                        <Route path="/" exact component={AdminDashboard} />

                        {/* <Route path="/profile" exact component={Profile} /> */}
                        {/* <Route path="/profile/change-password" exact component={ChangePassword} /> */}
                        
                        {/* <div>content</div>
                        <p>footer</p> */}
                    </ContentWrapper>
                    
                   
                </Wrapper>
            </Switch>
        </Router> 
           
        </>
    )
}

export default AdminPage
