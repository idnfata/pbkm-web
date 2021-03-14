import React, { useRef } from 'react'
import { iconAdd, iconBell, iconPlus, iconMenu, iconUser } from '../../../assets';
import { useDetectOutsideClick } from '../../../utils/helpers/useDetectOutsideClick';
import { IconContainer, Menu, MenuContainer, MenuItem, MenuItemLink, MenuList, MenuTrigger, ProfileImage, ProfileName, IconLink, Icon, ProfileMenuContainer, IconMenu } from './profile-menu.elements';
import {userLogoutAction} from '../../../config/redux/action';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const ProfileMenu = (props) => {
    const dropdownRef = useRef(null);
    const history = useHistory();
    // console.log(props)
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const token = localStorage.getItem('token');
    const onClickMenu = () => setIsActive(!isActive);
    const onClickLogout = async () => {
        const res = await props.logoutAPI(token).catch(err => err);
        if(res){
            localStorage.removeItem('token');
            history.push('/');
        }
    }
  
 
     
    return (
        <ProfileMenuContainer>
            <IconContainer>
                
                {/* <IconLink to="/notification"><Icon icon={iconBell} color="#fff" /></IconLink> */}
                <IconLink to={props.goToURL ? props.goToURL : '/notification'}><Icon icon={props.goToURL ? iconPlus : iconBell} color="#fff" /></IconLink>
            </IconContainer>
            

            <MenuTrigger onClick={onClickMenu}>
                <ProfileName>{props.name}</ProfileName>
                <ProfileImage src={props.photo} alt="User avatar" />
                <IconMenu icon={iconMenu} color="#000" />
            </MenuTrigger>

            
                <Menu ref={dropdownRef} className={`${isActive ? 'active' : 'inactive'}`}>
                    <MenuList>
                    {
                        (() => {
                            switch (props.user.role) {
                                case '0':
                                    return (<>
                                            <MenuItem><MenuItemLink to="/profile">Profile</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/">Super Admin</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink onClick={onClickLogout} to="">Logout</MenuItemLink></MenuItem>
                                        </>
                                    )
                                    break;
                                case '1':
                                    return (<>
                                            <MenuItem><MenuItemLink to="/profile">Profile</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/">HR</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink onClick={onClickLogout} to="">Logout</MenuItemLink></MenuItem>
                                        </>
                                    )
                                    break;
                                case '2':
                                    return (<>
                                        <MenuItem><MenuItemLink to="/profile">Profile</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/">Asset</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink onClick={onClickLogout} to="">Logout</MenuItemLink></MenuItem>
                                        </>
                                    )
                                    break;
                                case '3':
                                    return (<>
                                            <MenuItem><MenuItemLink to="/profile">Profile</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/payslip">Slip Gaji</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/attendance/history">Riwayat Kehadiran</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/leave/history">Riwayat Cuti</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink to="/overtime/history">Riwayat Lembur</MenuItemLink></MenuItem>
                                            <MenuItem><MenuItemLink onClick={onClickLogout} to="">Logout</MenuItemLink></MenuItem>
                                        </>
                                    )
                                    break;
                                default:
                                    return null;
                                    break;
                        }
                        })()
                    }
                    
                    </MenuList>
                </Menu>
        </ProfileMenuContainer>
    )
}

//mengambil state yang ada di store, memasukkannya ke state komponen ini
const reduxState = (state) => ({
    isLoading: state.isLoading,
    isLogin: state.isLogin,
    message: state.message,
    user: state.user
  })
  
  //panggil dispatch dengan cara onclick atau on apa kaitu na
  
  const reduxDispatch = (dispatch) => ({
    logoutAPI : (token) => dispatch(userLogoutAction(token))
  })
  
//connect itu digunakan supaya komponen ini bisa membaca store redux
export default connect(reduxState, reduxDispatch)(ProfileMenu)
