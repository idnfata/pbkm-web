import React, { useRef } from 'react'
import { iconBell, iconMenu } from '../../../assets';
import { useDetectOutsideClick } from '../../../utils/helpers/useDetectOutsideClick';
import { IconContainer, Menu, MenuContainer, MenuItem, MenuItemLink, MenuList, MenuTrigger, ProfileImage, ProfileName, IconLink, Icon, ProfileMenuContainer, IconMenu } from './profile-menu.elements';
import {userLogoutAction} from '../../../config/redux/action';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

const ProfileMenu = (props) => {
    const dropdownRef = useRef(null);
    const history = useHistory();
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
                <IconLink to="#"><Icon icon={iconBell} color="#000" /></IconLink>
            </IconContainer>
            

            <MenuTrigger onClick={onClickMenu}>
                <ProfileName>{props.name}</ProfileName>
                <ProfileImage src={props.photo} alt="User avatar" />
                <IconMenu icon={iconMenu} color="#000" />
            </MenuTrigger>
                <Menu ref={dropdownRef} className={`${isActive ? 'active' : 'inactive'}`}>
                    <MenuList>
                        <MenuItem><MenuItemLink to="/profile">Profile</MenuItemLink></MenuItem>
                        <MenuItem><MenuItemLink to="/">Trips</MenuItemLink></MenuItem>
                        <MenuItem><MenuItemLink onClick={onClickLogout} to="#">Logout</MenuItemLink></MenuItem>
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
