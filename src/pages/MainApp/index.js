import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { AuthKEY } from '../../config/api'
import { setUser } from '../../config/redux/action'
import AdminPage from '../Admin'
import AssetPage from '../Asset'
import EmployeePage from '../Employee'
import HRPage from '../HR'

const MainApp = (props) => {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token');
    // console.log(`dashboar page:`);
    // console.log(props);
    if(!token){
        return <Redirect to='/login' />
    }
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
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                }
                props.setUserData(userData);
                if(!props.isLogin){
                    props.history.push('/login')
                }
                
            }
    
        });
    }, [props.isLogin]);

    // return (
    //     <Dashboard role={props.user.role} />
    // )

    //check role user yang sedang login
    /*
        0 -> admin, 1 -> hr, 2 -> asset
        3 -> ops, 4 -> keu, 5 -> staff ops
        6 -> staff keu, 7 -> staff umum, 8 -> pandu
        9 -> mooring, 10 -> radio,
    */
   switch (props.user.role) {
       case '0':
           return <AdminPage />
           break;
       case '1':
           return <HRPage />
           break;
       case '2':
           return <AssetPage />
           break;
       case '3':
           return <EmployeePage />
           break;
       default:
           return null;
           break;
   }


}

//mengambil state yang ada di store, memasukkannya ke state komponen ini
const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
})
  
  
const reduxDispatch = (dispatch) => ({
    setUserData : (data) => dispatch(setUser(data))
    

})
export default connect(reduxState, reduxDispatch)(MainApp)
