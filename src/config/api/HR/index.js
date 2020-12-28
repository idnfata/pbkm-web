import axios from "axios";
import authHeader from "../Auth/header";
import Delete from "../Delete";
import Get from "../Get";
import Post from "../Post";
import Put from "../Put";
// const token = localStorage.getItem('token');

export const getHRDashboard = () => Get('hr', 'dashboard', token);

export const getBranch = (token, page, per_page, search = '') => Get('hr', `v1/branches?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getDivision = (token, page = '', per_page = '', search = '') => Get('hr', `v1/divisions?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getPosition = (token, page, per_page, search = '') => Get('hr', `v1/positions?page=${page}&per_page=${per_page}&search=${search}`, token);

export const addBranch = (token, data) => Post('hr', 'v1/branches', data, token);
export const addDivision = (token, data) => Post('hr', 'v1/divisions', data, token);


export const deleteBranch = (token, id) => Delete('hr', `v1/branches/${id}`, token);
export const deleteDivision = (token, id) => Delete('hr', `v1/divisions/${id}`, token);

export const editBranch = (token, data) => Put('hr', `v1/branches/${data.id}`, data, token);
export const editDivision = (token, data) => Put('hr', `v1/divisions/${data.id}`, data, token);

// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userLogin = (data) => Post('auth', 'client-user/login', data);
// export const userRegister = (data) => Post('auth', 'client-user/register', data);
// export const userLogout = (token) => Get('auth', 'client-user/logout', token);
// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userCreate = (token, data) => Post('auth', 'client/my-users', data, token);
// export const userEdit = (token, data) => Put('auth', `client/my-users/${data.id}`, data, token);
// export const userDelete = (token, id) => Delete('auth', `client/my-users/${id}`, token)