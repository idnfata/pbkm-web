import Delete from '../Delete';
import Get from '../Get';
import Post from '../Post';
import Put from '../Put';

export const AuthKEY = "V5iq53tQOXhQg38PDiImsCX2ZvwyCLyQqoNdwB4qijjWFwL20OKFk38Xqzvx1kUq";

export const userLogin = (data) => Post('auth', 'client-user/login', data);
export const userRegister = (token, data) => Post('auth', 'client-user/register', data, token);
export const userLogout = (token) => Get('auth', 'client-user/logout', token);
export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
export const userCreate = (token, data) => Post('auth', 'client/my-users', data, token);
export const userEdit = (token, data) => Put('auth', `client/my-users/${data.id}`, data, token);
export const userChangePassword = (token, data) => Put('auth', `client/change-password-my-users`, data, token);
export const userDelete = (token, id) => Delete('auth', `client/my-users/${id}`, token)
export const employeeLoginData = (token, email) => Get('auth', `client/my-users/${email}`, token)

//get user profile, company profile
export const userInfo = (token) => Get('auth', 'client/my-info', token);