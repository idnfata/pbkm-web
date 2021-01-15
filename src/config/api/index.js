import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';
import { userData, userLogin, userLogout, userDelete, userCreate, userEdit, userChangePassword, employeeLoginData } from './Auth';
import {
    getHRDashboard,
    getBranch,
    getDivision,
    getPosition,
    getTeamGroup,
    getTeamGroupByDivisionID,
    getWorkLocation,
    getWorkShift,
    getEmployee,
    getGroupScheduleInfo,
    addBranch,
    addDivision,
    addPosition,
    addTeamGroup,
    addWorkLocation,
    addWorkShift,
    addEmployee,
    editBranch,
    editDivision,
    editPosition,
    editTeamGroup,
    editWorkLocation,
    editWorkShift,
    editEmployee,
    deleteBranch,
    deleteDivision,
    deletePosition,
    deleteTeamGroup,
    deleteWorkLocation,
    deleteWorkShift,
    deleteEmployee,
} from './HR';




const getNewsBlog = () => Get('url1', 'posts?_sort=id&order=desc')

//url, endpoint,  menerima data dari yang memamnggil dan data dikirimkan ke fungsi Post
const postNewsBlog = (data) => Post('url2', 'posts', data);

const updateNewsBlog = (data, id) => Put('url2', `posts/${id}`, data);

const deleteNewsBlog = (id) => Delete('url2', `posts/${id}`);

const API = {
    userLogin,
    userLogout,
    userData,
    userCreate,
    userEdit,
    userDelete,
    userChangePassword,
    employeeLoginData,
    getHRDashboard,
    getBranch,
    getDivision,
    getPosition,
    getTeamGroup,
    getTeamGroupByDivisionID,
    getWorkLocation,
    getWorkShift,
    getEmployee,
    getGroupScheduleInfo,
    addBranch,
    addDivision,
    addPosition,
    addTeamGroup,
    addWorkLocation,
    addWorkShift,
    addEmployee,
    editBranch,
    editDivision,
    editPosition,
    editTeamGroup,
    editWorkLocation,
    editWorkShift,
    editEmployee,
    deleteBranch,
    deleteDivision,
    deletePosition,
    deleteTeamGroup,
    deleteWorkLocation,
    deleteWorkShift,
    deleteEmployee,
}


export default API;

export * from './Auth'