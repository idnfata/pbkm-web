import API from "../../../config/api";
import { hmsToSeconds } from "../../../utils/helpers/date";

export const absenMasuk = (token, schedule, time, setAttendanceStatus) => {
    // console.log(`absen masuk karyawan id ${schedule.employee_id} tanggal ${schedule.date} time in: ${time}`);
            
    const data = {
        employee_id : schedule.employee_id,
        date: schedule.date,
        time_in: time,
        is_late: hmsToSeconds(time) > hmsToSeconds(schedule.time_in) ? 1 : 0
    }

    API.addTimeIn(token, data).then(res => {
        // console.log(res.data)
        setAttendanceStatus(1);
    }).catch(err => {
        // console.log(err.response)
        setAttendanceStatus(0)
    })
}



export const absenPulang = (token, attendanceID, scheduleTimeOut, time, setAttendanceStatus) => {

    const data = {
        attendance_id : attendanceID,
        time_out: time,
        is_overtime: hmsToSeconds(time) > (hmsToSeconds(scheduleTimeOut) + (60 * 15)) ? 1 : 0,
        is_out_early: hmsToSeconds(time) < (hmsToSeconds(scheduleTimeOut) + (60 * 15)) ? 1 : 0
        
    }
    // console.log(data)
    API.addTimeOut(token, data).then(res => {
        // console.log(res.data)
        setAttendanceStatus(2);
    }).catch(err => {
        // console.log(err.response)
        setAttendanceStatus(1)
    })
}