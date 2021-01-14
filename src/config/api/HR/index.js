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
export const getPosition = (token, page = '', per_page = '', search = '') => Get('hr', `v1/positions?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getTeamGroup = (token, page = '', per_page = '', search = '') => Get('hr', `v1/team-groups?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getWorkLocation = (token, page = '', per_page = '', search = '') => Get('hr', `v1/work-locations?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getWorkShift = (token, page = '', per_page = '', search = '') => Get('hr', `v1/work-shifts?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getTeamGroupByDivisionID = (token, id) => Get('hr', `v1/division/team-groups/${id}`, token);
export const getEmployee = (token, page = '', per_page = '', search = '') => Get('hr', `v1/employees?page=${page}&per_page=${per_page}&search=${search}`, token);


export const addBranch = (token, data) => Post('hr', 'v1/branches', data, token);
export const addDivision = (token, data) => Post('hr', 'v1/divisions', data, token);
export const addPosition = (token, data) => Post('hr', 'v1/positions', data, token);
export const addTeamGroup = (token, data) => Post('hr', 'v1/team-groups', data, token);
export const addWorkLocation = (token, data) => Post('hr', 'v1/work-locations', data, token);
export const addWorkShift = (token, data) => Post('hr', 'v1/work-shifts', data, token);
export const addEmployee = (token, data) => Post('hr', 'v1/employees', data, token);


export const deleteBranch = (token, id) => Delete('hr', `v1/branches/${id}`, token);
export const deleteDivision = (token, id) => Delete('hr', `v1/divisions/${id}`, token);
export const deletePosition = (token, id) => Delete('hr', `v1/positions/${id}`, token);
export const deleteTeamGroup = (token, id) => Delete('hr', `v1/team-groups/${id}`, token);
export const deleteWorkLocation = (token, id) => Delete('hr', `v1/work-locations/${id}`, token);
export const deleteWorkShift = (token, id) => Delete('hr', `v1/work-shifts/${id}`, token);
export const deleteEmployee = (token, id) => Delete('hr', `v1/employees/${id}`, token);

export const editBranch = (token, data) => Put('hr', `v1/branches/${data.id}`, data, token);
export const editDivision = (token, data) => Put('hr', `v1/divisions/${data.id}`, data, token);
export const editPosition = (token, data) => Put('hr', `v1/positions/${data.id}`, data, token);
export const editTeamGroup = (token, data) => Put('hr', `v1/team-groups/${data.id}`, data, token);
export const editWorkLocation = (token, data) => Put('hr', `v1/work-locations/${data.id}`, data, token);
export const editWorkShift = (token, data) => Put('hr', `v1/work-shifts/${data.id}`, data, token);
export const editEmployee = (token, data) => Put('hr', `v1/employees/${data.id}`, data, token);

// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userLogin = (data) => Post('auth', 'client-user/login', data);
// export const userRegister = (data) => Post('auth', 'client-user/register', data);
// export const userLogout = (token) => Get('auth', 'client-user/logout', token);
// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userCreate = (token, data) => Post('auth', 'client/my-users', data, token);
// export const userEdit = (token, data) => Put('auth', `client/my-users/${data.id}`, data, token);
// export const userDelete = (token, id) => Delete('auth', `client/my-users/${id}`, token)