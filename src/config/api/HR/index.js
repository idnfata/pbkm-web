import axios from "axios";
import authHeader from "../Auth/header";
import Get from "../Get";
// const token = localStorage.getItem('token');

export const getHRDashboard = () => Get('hr', 'dashboard', token);

export const getBranch = (token, page, per_page, search = '') => Get('hr', `v1/branches?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getDivision = (token, page, per_page, search = '') => Get('hr', `v1/divisions?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getPosition = (token, page, per_page, search = '') => Get('hr', `v1/positions?page=${page}&per_page=${per_page}&search=${search}`, token);
// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
