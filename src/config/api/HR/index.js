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
export const getHoliday = (token, page, per_page, search = '') => Get('hr', `v1/holidays?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getTeamGroupByDivisionID = (token, id) => Get('hr', `v1/team-groups/division/${id}`, token);
export const getEmployee = (token, page = '', per_page = '', search = '') => Get('hr', `v1/employees?page=${page}&per_page=${per_page}&search=${search}`, token);
export const getEmployeeByTeamGroupID = (token, id) => Get('hr', `v1/employees/team-group/${id}`, token);
export const getEmployeeByEmail = (token, email) => Get('hr', `v1/employee/${email}`, token);
export const getWorkShiftByTeamGroupID = (token, id) => Get('hr', `v1/work-shifts/team-group/${id}`, token);
export const getAllWorkLocation = (token) => Get('hr', `v1/work-locations/all`, token);
export const getGroupScheduleInfo = (token) => Get('hr', `v1/team-groups/schedule-info`, token);
export const getScheduleByTeamGroupID = (token, id, date) => Get('hr', `v1/schedules/team-group/${id}/${date}`, token);
export const getEmployeeScheduleAtMonth = (token, id, date) => Get('hr', `v1/schedules/employee/${id}/${date}`, token);
export const getHolidaysAtMonth = (token, date) => Get('hr', `v1/holidays/${date}`, token);
export const isDateHoliday = (token, date) => Get('hr', `v1/holiday/${date}`, token);
export const checkTodayScheduleOfEmployee = (token, id, date) => Get('hr', `v1/schedule/employee/${id}/${date}`, token);
export const checkTodayAttendanceOfEmployee = (token, id, date) => Get('hr', `v1/attendance/employee/${id}/${date}`, token);
export const getEmployeeOvertimeRequest = (token, id, year) => Get('hr', `v1/overtimes/employee/${id}/${year}`, token);
export const getSetupOvertime = (token, group_id) => Get('hr', `v1/setup-overtime/${group_id}`, token);
export const getOvertimeSchemes = (token, group_id, overtime_day_type) => Get('hr', `v1/overtime-schemes/${group_id}/${overtime_day_type}`, token);
export const getBasicSalaryAndWorkDayInWeek = (token, position_id, group_id) => Get('hr', `v1/basic-salary-and-work-day/${position_id}/${group_id}`, token);
export const getAllOvertimeDayTypes = (token) => Get('hr', `v1/overtime-day-types/all`, token);
export const getAllLeaveTypes = (token) => Get('hr', `v1/leave-types/all`, token);
export const getSetupLeave = (token) => Get('hr', `v1/setup-leaves`, token);
export const getSetupLeaveGroup = (token, group_id, employee_id, year) => Get('hr', `v1/setup-leaves/group/${group_id}/${employee_id}/${year}`, token);
export const getSetupLoan = (token) => Get('hr', `v1/setup-loans`, token);
export const getSetupBPJS = (token) => Get('hr', `v1/setup-bpjs`, token);
export const getSetupPPh21KPP = (token) => Get('hr', `v1/setup-kpp-pph21`, token);
export const getSetupPPh21 = (token) => Get('hr', `v1/setup-pph21`, token);
export const getPTKPBiayaJabatanTarifPPh21 = (token) => Get('hr', `v1/pph21/ptkp-biaya-jabatan-tarif`, token);
export const getEmployeeLeaveHistories = (token, id, year) => Get('hr', `v1/leaves/employee/${id}/${year}`, token);



export const addBranch = (token, data) => Post('hr', 'v1/branches', data, token);
export const addDivision = (token, data) => Post('hr', 'v1/divisions', data, token);
export const addPosition = (token, data) => Post('hr', 'v1/positions', data, token);
export const addTeamGroup = (token, data) => Post('hr', 'v1/team-groups', data, token);
export const addWorkLocation = (token, data) => Post('hr', 'v1/work-locations', data, token);
export const addWorkShift = (token, data) => Post('hr', 'v1/work-shifts', data, token);
export const addHoliday = (token, data) => Post('hr', 'v1/holidays', data, token);
export const addEmployee = (token, data) => Post('hr', 'v1/employees', data, token);
export const addSchedule = (token, data) => Post('hr', 'v1/schedules', data, token);
export const copySchedule = (token, data) => Post('hr', 'v1/copy-schedules', data, token);
export const addTimeIn = (token, data) => Post('hr', `v1/attendance/employee`, data, token);
export const addTimeOut = (token, data) => Post('hr', `v1/attendance/employee`, data, token);
export const addSetupOvertime = (token, data) => Post('hr', `v1/setup-overtime`, data, token);
export const addOvertimeSchemes = (token, data) => Post('hr', `v1/overtime-schemes`, data, token);
export const addSetupLeave = (token, data) => Post('hr', `v1/setup-leave`, data, token);
export const addSetupLoan = (token, data) => Post('hr', `v1/setup-loan`, data, token);
export const addSetupBPJS = (token, data) => Post('hr', `v1/setup-bpjs`, data, token);
export const addSetupPPh21KPP = (token, data) => Post('hr', `v1/setup-kpp-pph21`, data, token);
export const addSetupPPh21 = (token, data) => Post('hr', `v1/setup-pph21`, data, token);
export const addLeaveRequest = (token, data) => Post('hr', `v1/leaves`, data, token);
export const addOvertimeRequest = (token, data) => Post('hr', `v1/overtimes`, data, token);



export const deleteBranch = (token, id) => Delete('hr', `v1/branches/${id}`, token);
export const deleteDivision = (token, id) => Delete('hr', `v1/divisions/${id}`, token);
export const deletePosition = (token, id) => Delete('hr', `v1/positions/${id}`, token);
export const deleteTeamGroup = (token, id) => Delete('hr', `v1/team-groups/${id}`, token);
export const deleteWorkLocation = (token, id) => Delete('hr', `v1/work-locations/${id}`, token);
export const deleteWorkShift = (token, id) => Delete('hr', `v1/work-shifts/${id}`, token);
export const deleteHoliday = (token, id) => Delete('hr', `v1/holidays/${id}`, token);
export const deleteEmployee = (token, id) => Delete('hr', `v1/employees/${id}`, token);
export const deleteSchedule = (token, id) => Delete('hr', `v1/schedules/${id}`, token);
export const deleteScheduleEmployeeAtMonth = (token, id, date) => Delete('hr', `v1/schedules/${id}/${date}`, token);
export const deleteLeaveRequest = (token, id) => Delete('hr', `v1/leave/${id}`, token);

export const editBranch = (token, data) => Put('hr', `v1/branches/${data.id}`, data, token);
export const editDivision = (token, data) => Put('hr', `v1/divisions/${data.id}`, data, token);
export const editPosition = (token, data) => Put('hr', `v1/positions/${data.id}`, data, token);
export const editTeamGroup = (token, data) => Put('hr', `v1/team-groups/${data.id}`, data, token);
export const editWorkLocation = (token, data) => Put('hr', `v1/work-locations/${data.id}`, data, token);
export const editWorkShift = (token, data) => Put('hr', `v1/work-shifts/${data.id}`, data, token);
export const editHoliday = (token, data) => Put('hr', `v1/holidays/${data.id}`, data, token);
export const editEmployee = (token, data) => Put('hr', `v1/employees/${data.id}`, data, token);
export const editSchedule = (token, data) => Put('hr', `v1/schedules/${data.id}`, data, token);
export const editSetupOvertime = (token, data) => Put('hr', `v1/setup-overtime/${data.id}`, data, token);
export const editOvertimeSchemes = (token, data) => Put('hr', `v1/overtime-schemes/${data.id}`, data, token);
export const editSetupLeave = (token, data) => Put('hr', `v1/setup-leave/${data.id}`, data, token);
export const editSetupLoan = (token, data) => Put('hr', `v1/setup-loan/${data.id}`, data, token);
export const editSetupBPJS = (token, data) => Put('hr', `v1/setup-bpjs/${data.id}`, data, token);
export const editSetupPPh21KPP = (token, data) => Put('hr', `v1/setup-kpp-pph21/${data.id}`, data, token);
export const editSetupPPh21 = (token, data) => Put('hr', `v1/setup-pph21/${data.id}`, data, token);


// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userLogin = (data) => Post('auth', 'client-user/login', data);
// export const userRegister = (data) => Post('auth', 'client-user/register', data);
// export const userLogout = (token) => Get('auth', 'client-user/logout', token);
// export const userData = (token, page, per_page, search = '') => Get('auth', `client/my-users?page=${page}&per_page=${per_page}&search=${search}`, token)
// export const userCreate = (token, data) => Post('auth', 'client/my-users', data, token);
// export const userEdit = (token, data) => Put('auth', `client/my-users/${data.id}`, data, token);
// export const userDelete = (token, id) => Delete('auth', `client/my-users/${id}`, token)