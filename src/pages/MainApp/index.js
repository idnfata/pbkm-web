import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { ContentWrapper, CreateMaster, DetailMaster, EditMaster, Master, MenuWrapper, TableMaster, Wrapper } from '../../components'
import AdminDashboard from '../Admin/Dashboard'
import HRDashboard from '../HR/Dashboard'
import AssetDashboard from '../Asset/Dashboard'
import EmployeeDashboard from '../Employee/Dashboard'
import Menu from '../../components/molecules/Menu'
import API, { AuthKEY } from '../../config/api'
import { setUser } from '../../config/redux/action'
import Employee from '../HR/Employee'
import EmployeeList from '../HR/Employee/List'
import DetailEmployee from '../HR/Employee/Detail'
import HRSettingMenu from '../HR/Setting'
import HRReport from '../HR/Report'
import HRSetting from '../HR/Setting/setting'
import EmployeeSchedule from '../HR/Employee/Schedule'
import EmployeeAttendance from '../HR/Employee/Attendance'
import EmployeeTask from '../HR/Employee/Task'
import EmployeePermit from '../HR/Employee/Permit'
import EmployeeLeave from '../HR/Employee/Leave'
import EmployeeOvertime from '../HR/Employee/Overtime'
import EmployeeReimbursement from '../HR/Employee/Reimbursement'
import EmployeeLoan from '../HR/Employee/Loan'
import EmployeeBPJS from '../HR/Employee/BPJS'
import EmployeePPH21 from '../HR/Employee/PPH21'
import EmployeePayroll from '../HR/Employee/Payroll'
import EmployeeWarningLetter from '../HR/Employee/WarningLetter'
import ScheduleDetail from '../HR/Employee/Schedule/detail'
import MakeARequest from '../Employee/MakeARequest'
import RequestLeave from '../Employee/MakeARequest/RequestLeave'
import RequestOvertime from '../Employee/MakeARequest/RequestOvertime'
import RequestPermit from '../Employee/MakeARequest/RequestPermit'
import RequestLoan from '../Employee/MakeARequest/RequestLoan'
import RequestEditData from '../Employee/MakeARequest/RequestEditData'
import RequestUsingAsset from '../Employee/MakeARequest/RequestUsingAsset'
import OvertimeHistories from '../Employee/Histories/OvertimeHistories'
import LeaveHistories from '../Employee/Histories/LeaveHistories'
import PermitHistories from '../Employee/Histories/PermitHistories'
import LoanHistories from '../Employee/Histories/LoanHistories'
import UsingAssetHistories from '../Employee/Histories/UsingAssetHistories'
import LeaveDetail from '../Employee/Detail/LeaveDetail'
import OvertimeDetail from '../Employee/Detail/OvertimeDetail'
import MySchedule from '../Employee/Schedule'


const MainApp = (props) => {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token');
    const [employeeInfo, setEmployeeInfo] = useState({});
    

    // console.log(`dashboar page:`);
    // console.log(token);
    //check apakah ada token yang tersimpan di localstorage
    //jika ada dan itu verified, maka tetap login, jika tidak ada
    //maka kembalikan ke halaman login
    useEffect(() => {    
        if(!token){
            props.history.push('/login');
        }
        
        jwt.verify(token, AuthKEY, (err, decoded)=> {
            if (err) {
                //jika gagal diverifikasi, hapus 
                localStorage.removeItem('token');
                props.history.push('/login');
            }else {
                // console.log(decoded)
       
                //get employee info by user email
                API.getEmployeeByEmail(token, decoded.email).then(res => {

                    //    console.log(res)
                    const userData = {
                        client_id: decoded.client_id,
                        user_id: decoded.id,
                        name: decoded.name,
                        email: decoded.email,
                        role: decoded.role,
                        token: token,
                        info : res.data
                    }
                    props.setUserData(userData);
                }).catch(err => {
                    console.log(err)
                    const userData = {
                        client_id: decoded.client_id,
                        user_id: decoded.id,
                        name: decoded.name,
                        email: decoded.email,
                        role: decoded.role,
                        token: token,
                        info : null
                    }
                    props.setUserData(userData);
                })
               
              
    
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
                                    <Route path="/employee/schedule" exact component={EmployeeSchedule} />
                                    <Route path="/employee/schedule/:group_id" exact component={ScheduleDetail} />
                                    <Route path="/employee/attendance" exact component={EmployeeAttendance} />
                                    <Route path="/employee/task" exact component={EmployeeTask} />
                                    <Route path="/employee/permit" exact component={EmployeePermit} />
                                    <Route path="/employee/leave" exact component={EmployeeLeave} />
                                    <Route path="/employee/overtime" exact component={EmployeeOvertime} />
                                    <Route path="/employee/reimbursement" exact component={EmployeeReimbursement} />
                                    <Route path="/employee/loan" exact component={EmployeeLoan} />
                                    <Route path="/employee/bpjs" exact component={EmployeeBPJS} />
                                    <Route path="/employee/pph21" exact component={EmployeePPH21} />
                                    <Route path="/employee/payroll" exact component={EmployeePayroll} />
                                    <Route path="/employee/warning-letter" exact component={EmployeeWarningLetter} />
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
                                    <Route path="/schedule" exact component={MySchedule} />
                                    
                                    <Route path="/overtime" exact component={OvertimeHistories} />
                                    <Route path="/overtime/detail" exact component={OvertimeDetail} />
                                    <Route path="/leave" exact component={LeaveHistories} />
                                    <Route path="/leave/detail" exact component={LeaveDetail} />
                                    <Route path="/permit" exact component={PermitHistories} />
                                    <Route path="/loan" exact component={LoanHistories} />
                                    <Route path="/using-asset" exact component={UsingAssetHistories} />

                                    <Route path="/request" exact component={MakeARequest} />
                                    <Route path="/request/overtime" exact component={RequestOvertime} />
                                    <Route path="/request/leave/:leave_type" exact component={RequestLeave} />
                                    <Route path="/request/permit" exact component={RequestPermit} />
                                    <Route path="/request/loan" exact component={RequestLoan} />
                                    <Route path="/request/change-data" exact component={RequestEditData} />
                                    <Route path="/request/using-asset" exact component={RequestUsingAsset} />

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

