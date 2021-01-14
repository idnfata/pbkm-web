import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { ContentWrapper, CreateMaster, DetailMaster, EditMaster, Master, MenuWrapper, TableMaster, Wrapper } from '../../components'
import AdminDashboard from '../Admin/Dashboard'
import HRDashboard from '../HR/Dashboard'
import AssetDashboard from '../Asset/Dashboard'
import EmployeeDashboard from '../Employee/Dashboard'
import Menu from '../../components/molecules/Menu'
import { AuthKEY } from '../../config/api'
import { setUser } from '../../config/redux/action'
import Employee from '../HR/Employee'
import EmployeeList from '../HR/Employee/List'
import DetailEmployee from '../HR/Employee/Detail'
import HRSettingMenu from '../HR/Setting'
import HRReport from '../HR/Report'
import HRSetting from '../HR/Setting/setting'


const MainApp = (props) => {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token');
    if(!token){
        return <Redirect to='/login' />
        
    }
    // console.log(`dashboar page:`);
    // console.log(token);
    //check apakah ada token yang tersimpan di localstorage
    //jika ada dan itu verified, maka tetap login, jika tidak ada
    //maka kembalikan ke halaman login
    useEffect(() => {    
        jwt.verify(token, AuthKEY, (err, decoded)=> {
            if (err) {
                //jika gagal diverifikasi, hapus 
                localStorage.removeItem('token');
                props.history.push('/login');
            }else {
                // console.log(decoded)
                const userData = {
                    client_id: decoded.client_id,
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role,
                    token: token,
                }
                props.setUserData(userData);
                if(!props.isLogin){
                    props.history.push('/login')
                }
    
            }
    
        });
       
        

    }, [props.isLogin]);


    
      //check role user yang sedang login
    /*
        0 -> admin, 1 -> hr, 2 -> asset
        3 -> ops, 4 -> keu, 5 -> staff ops
        6 -> staff keu, 7 -> staff umum, 8 -> pandu
        9 -> mooring, 10 -> radio,
    */


   return (
    <>
    <Router>
         <Switch>
             <Wrapper>
                 {/* panggil menu sesuai rolenya */}
                <MenuWrapper>
                    <Menu role={props.user.role} />
                </MenuWrapper>
                <ContentWrapper>
                {
                    // definisikan route tiap role
                    (() => {
                        switch (props.user.role) {
                            case '0':
                                return (<>
                                    <Route path="/master" exact component={Master} />
                                    <Route path="/master/:table" exact component={TableMaster} />
                                    {/* <Route path="/add-master/" exact component={DetailMaster} /> */}
                                    <Route path="/master/:table/add" exact component={CreateMaster} />
                                    <Route path="/master/:table/edit/:id" exact component={EditMaster} />
                                    {/* <Route path="/master/:table/delete/:id" exact component={DeleteMaster} /> */}
                                    <Route path="/master/:table/detail/:id" exact component={DetailMaster} />
                                    <Route path="/" exact component={AdminDashboard} />
                                    </>
                                )
                                break;
                            case '1':
                                return (<>
                                    <Route path="/" exact component={HRDashboard} />
                                    <Route path="/report" exact component={HRReport} />
                                    <Route path="/setting" exact component={HRSettingMenu} />
                                    {/* <Route path="/setting/:table/" exact component={HRSetting} /> */}
                                    {/* <Route path="/setting/:table/:table" exact component={HRSetting} /> */}
                                    <Route path="/employee" exact component={Employee} />
                                    <Route path="/employee/list" exact component={EmployeeList} />
                                    <Route path="/employee/detail" exact component={DetailEmployee} />
                                    </>
                                )
                                break;
                            case '2':
                                return (<>
                                    <Route path="/" exact component={AssetDashboard} />
                                    </>
                                )
                                break;
                            case '3':
                                return (<>
                                    <Route path="/" exact component={EmployeeDashboard} />
                                    </>
                                )
                                break;
                            default:
                                return null;
                                break;
                    }
                    })()
                }
                </ContentWrapper>

               
            </Wrapper>
        </Switch>
    </Router>
    </>
    )
 
  

    

  
    


}

//mengambil state yang ada di store, memasukkannya ke state komponen ini
const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading
})
  
  
const reduxDispatch = (dispatch) => ({
    setUserData : (data) => dispatch(setUser(data))
    

})
export default connect(reduxState, reduxDispatch)(MainApp)
// export default withRouter(connect(reduxState, reduxDispatch)(MainApp))

