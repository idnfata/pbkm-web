import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconUser } from '../../../assets'
import { Gap, PageHeader } from '../../../components'

import { RecordAttendanceWrapper } from './attendance.elements'
import { hmsToSeconds, jam_menit_detik, tahun_bulan_tanggal } from '../../../utils/helpers/date'
import {getDistance} from '../../../utils/helpers/attendance'
import API from '../../../config/api'
import { isArraySame } from '../../../utils/helpers/array'
import AttendanceMap from './AttendanceMap'

const DEFAULT_LATITUDE = -3.339414495831897;
const DEFAULT_LONGITUDE = 114.60118618319521;
const default_location = [DEFAULT_LATITUDE, DEFAULT_LONGITUDE]


const RecordAttendance = (props) => {
    // console.log(props)
    // const location = useGeoLocation();
    const {history, user} = props;

    const [location, setLocation] = useState(default_location)
    const [time, setTime] = useState(jam_menit_detik());
    const [attendance, setAttendance] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState(0);
    const [overtimeAttendance, setOvertimeAttendance] = useState(null);
    const [isHaveScheduleToday, setIsHaveScheduleToday] = useState(false);
    const [scheduleData, setScheduleData] = useState({
        attLocation: [0, 0],
        attRadius: 50,
        attLocationName: '',
        attLocationCode: '',
        attTimeIn: '',
        attTimeOut: '',
        attCode: '',
        attLateTolerance: 5,
        attBreakStart: '00:00:00',
        attType: 'shift',


    });
    const [overtimeData, setOvertimeData] = useState({
        attLocation: [0, 0],
        attRadius: 50,
        attLocationName: '',
        attLocationCode: '',
        attTimeIn: '',
        attTimeOut: '',
        attCode: '',
        attLateTolerance: 5,
        attBreakStart: '00:00:00',

    });
    const [overtimeLocation, setOvertimeLocation] = useState(default_location);
    const [workLocation, setWorkLocation] = useState(default_location);
    const [distance, setDistance] = useState(null);
    const today = new Date();
    const token = user.token;
    const employee = user.info;

    const absenMasuk = () => {
        // console.log(`absen masuk karyawan id ${employee.id} tanggal ${tahun_bulan_tanggal(today)} time in: ${jam_menit_detik()}`);
        let time_in = jam_menit_detik();
        let date = tahun_bulan_tanggal(today);
        // console.log(location);
        const data = {
            employee_id : employee.id,
            date: date,
            time_in_schedule: scheduleData.attTimeIn,
            late_tolerance: scheduleData.attLateTolerance,
            time_out_schedule: scheduleData.attTimeOut,
            lng_schedule: scheduleData.attLocation[1],
            lat_schedule: scheduleData.attLocation[0],
            time_in: time_in,
            time_in_lng: location[1],
            time_in_lat: location[0],
            time_in_img: '',
            time_break_start: scheduleData.attBreakStart,
            break_duration: scheduleData.attBreakDuration,
            is_late: hmsToSeconds(time_in) > hmsToSeconds(scheduleData.attTimeIn) ? 1 : 0
        }
    
        API.addTimeIn(token, data).then(res => {
            // console.log(res.data)
            setAttendanceStatus(1);
        }).catch(err => {
            // console.log(err.response)
            setAttendanceStatus(0)
        })
    }
    
    
    
    const absenPulang = () => {
        // console.log(attendance)
        // console.log(`absen pulang karyawan id ${employee.id} tanggal ${tahun_bulan_tanggal(today)} time out: ${jam_menit_detik()}`);
        let time_out = jam_menit_detik();
    
        const data = {
            attendance_id : attendance.id,
            time_out: time_out,
            // is_overtime: hmsToSeconds(time_out) > (hmsToSeconds(attendance.time_out_schedule) + (60 * 20)) ? 1 : 0,
            is_out_early: hmsToSeconds(time_out) < hmsToSeconds(attendance.time_out_schedule)  ? 1 : 0,
            time_out_lng: location[1],
            time_out_lat: location[0],
            time_out_img: '',

            
        }
        //jika waktu sekarang kurang dari jadwal pulang
        // console.log(data)
        API.addTimeOut(token, data).then(res => {
            // console.log(res.data)
            setAttendanceStatus(2);
        }).catch(err => {
            // console.log(err.response)
            setAttendanceStatus(1)
        })
    }

    
    useEffect(() => {
        //check apakah ada jadwal hari ini
        API.checkTodayScheduleOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            // console.log('ada jadwal')
            // console.log(res);
            setIsHaveScheduleToday(true);
            setWorkLocation([parseFloat(res.data.latitude), parseFloat(res.data.longitude)])
            setScheduleData({
                attLocation: [parseFloat(res.data.latitude), parseFloat(res.data.longitude)],
                attRadius: parseInt(res.data.radius),
                attLocationName: res.data.location_name,
                attLocationCode: res.data.location_code,
                attTimeIn: res.data.time_in,
                attTimeOut: res.data.time_out,
                attType: 'shift',
                attCode: res.data.shift_code,
                attLateTolerance: res.data.late_tolerance,
                attBreakStart: res.data.break_start,
                attBreakDuration: res.data.break_duration,
            })
            //check status kehadiran, apakah sudah absen atau belum
            API.checkTodayAttendanceOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
                // console.log(res.data);
                setAttendance(res.data);
                setAttendanceStatus(1);

            }).catch(err => {
                // console.log(err.response.data.message);
                setAttendance(null);
                setAttendanceStatus(0);

               
                // console.log(err.response.data.message);
            })
        }).catch(err => {
            // console.log(err.response)
            setIsHaveScheduleToday(false);
        })
        
        API.isEmployeeHaveOvertimeToday(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            // console.log(res.data)
            setOvertimeLocation([parseFloat(res.data.overtime_location_lat), parseFloat(res.data.overtime_location_lon)])
            setOvertimeData({
                attLocation: [parseFloat(res.data.overtime_location_lat), parseFloat(res.data.overtime_location_lon)],
                attRadius: parseInt(res.data.radius),
                attLocationName: res.data.overtime_location_name,
                attLocationCode: res.data.overtime_location_code,
                attTimeIn: res.data.start_from,
                attTimeOut: res.data.ends_on,
                attType: 'overtime',
                attCode: "LMBR",
                // attDayType: res.data.overtime_day_type,
                // attLateTolerance: res.data.late_tolerance,
                // attBreakStart: res.data.time_break_start,
                // attBreakDuration: res.data.break_duration,
            })
            //check status kehadiran, apakah sudah absen lembur atau belum

            // habis ashar
            API.checkAttendanceOvertimeOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
                // console.log(res.data);
                setOvertimeAttendance(res.data);
            }).catch(err => {
                // console.log('belum absen lembur')
                console.log(err.response.data.message);
                setOvertimeAttendance(null);

               
                // console.log(err.response.data.message);
            })
        }).catch(err => {
            // console.log(err)
            setOvertimeData(null);

        })
        
    }, [attendanceStatus])


  
    useEffect(() => {
        //dapatkan posisi user setiap ... detik sekali
        const interval = setInterval(() => {
            // console.log('This will run every second!');
            if('geolocation' in navigator){
                // console.log('geolocation available');
                navigator.geolocation.getCurrentPosition(position => {
                    // console.log(position.coords.latitude)
                    // console.log(position.coords.longitude)
                    const coords = [position.coords.latitude, position.coords.longitude];
  
                    if(isArraySame(coords, location)){
                        // console.log('sama')
                        return;
                        
                    }else {
                        // console.log('posisi berubah')
                        setLocation(coords)
                        setDistance(getDistance(workLocation, coords))
                        setTime(jam_menit_detik());
                    }
                })
            

        
           }else {
                setLocation(workLocation)
            


                // console.log('geolocation not available')
           }

         }, 1000);

        return () => clearInterval(interval);
    }, [location, workLocation]);

    
    return (<>
        <PageHeader
            title="Rekam Kehadiran"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
            mobileTitle="Rekam Kehadiran"
            
        />
        <RecordAttendanceWrapper>
        {(() => {
            if  (employee.need_attendance === 1) {
                // console.log('perlu absen')
                //check apakah ada jadwal
                if(isHaveScheduleToday){
                    // console.log('ada jadwal')
                    return (
                        <AttendanceMap
                            schedule={scheduleData}
                            time={time}
                            attendance={attendance}
                            overtime={overtimeData}
                            userLocation={location}
                            zoom={14}
                            distance={distance}
                            absenMasuk={absenMasuk}
                            absenPulang={absenPulang}

                        />
                        )
                }else { //tidak ada jadwal
                    if(overtimeData){
                        // console.log('ada lembur')
                        return (
                            <>
                                <h3>Libur! Tapi ada jadwal lembur hari ini.</h3>
                                <Link to="/attendance/record/overtime" className="back">Absen Lembur &rsaquo;</Link>
                            </>
                         
                            )
                    }else {
                        return (
                            <>
                                <h3>Libur! Tidak ada jadwal hari ini.</h3>
                                <Link to="/attendance" className="back">&lsaquo; kembali</Link>
                            </>
                            )
                    }
                    
                }
                
            } else {
                // console.log('tidak perlu absen')
                return (
                <>
                    <h3>Kamu tidak perlu melakukan absensi.</h3>
                    <Link to="/attendance" className="back">&lsaquo; kembali</Link>
                </>
                )
            }
        })()}

            
        </RecordAttendanceWrapper>

    </>)
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),

    

})
export default connect(reduxState, reduxDispatch)(RecordAttendance)