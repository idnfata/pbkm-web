import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconUser } from '../../../assets'
import { Gap, PageHeader } from '../../../components'

import { RecordAttendanceWrapper } from './attendance.elements'
import { jam_menit_detik, tahun_bulan_tanggal } from '../../../utils/helpers/date'
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
    const [overtimeAttendance, setOvertimeAttendance] = useState(null);

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
    const [workLocation, setWorkLocation] = useState(default_location);
    const [attendanceStatus, setAttendanceStatus] = useState(0);
    const [distance, setDistance] = useState(null);
    const today = new Date();
    const token = user.token;
    const employee = user.info;

    const absenMasuk = () => {
        // console.log(`absen masuk karyawan id ${employee.id} tanggal ${tahun_bulan_tanggal(today)} time in: ${jam_menit_detik()}`);
        let time_in = jam_menit_detik();
      
        const data = {
            employee_id : employee.id,
            overtime_id: overtimeData.overtimeID,
            time_in: time_in,
            time_in_lng: location[1],
            time_in_lat: location[0],
            time_in_img: '',
        }
    
        API.addOvertimeIn(token, data).then(res => {
            // console.log(res.data)
            setAttendanceStatus(1);
        }).catch(err => {
            console.log(err.response.data.message)
            setAttendanceStatus(0)
        })
    }
    
    
    
    const absenPulang = () => {
    
        let time_out = jam_menit_detik();
    
        const data = {
            attendance_id : overtimeAttendance.attendance_id,
            time_out: time_out,
            time_out_lng: location[1],
            time_out_lat: location[0],
            time_out_img: '',

            
        }
        // console.log(data)
        API.addOvertimeOut(token, data).then(res => {
            // console.log(res.data)
            setAttendanceStatus(2);
        }).catch(err => {
            // console.log(err.response.data.message)
            setAttendanceStatus(1)
        })
    }
    
    useEffect(() => {
        //check apakah ada jadwal lembur hari ini
      
        
        API.isEmployeeHaveOvertimeToday(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            // console.log(res.data)
            setWorkLocation([parseFloat(res.data.overtime_location_lat), parseFloat(res.data.overtime_location_lon)])
            setOvertimeData({
                overtimeID: res.data.id,
                attLocation: [parseFloat(res.data.overtime_location_lat), parseFloat(res.data.overtime_location_lon)],
                attRadius: parseInt(res.data.radius),
                attLocationName: res.data.overtime_location_name,
                attLocationCode: res.data.overtime_location_code,
                attTimeIn: res.data.start_from,
                attTimeOut: res.data.ends_on,
                attType: 'overtime',
                attCode: "LMBR",
                attDayType: res.data.overtime_day_type,
                attLateTolerance: res.data.late_tolerance,
                attBreakStart: res.data.time_break_start,
                attBreakDuration: res.data.break_duration,
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
            title="Absen Lembur"
            subtitle={props.user.client_id}
            name={props.user.name}
            photo={iconUser}
            mobileTitle="Absen Lembur"
            
        />
        <RecordAttendanceWrapper>
        {(() => {
          
            if(overtimeData){
                // console.log('ada lembur')
                return (
                    <AttendanceMap
                        schedule={overtimeData}
                        time={time}
                        attendance={overtimeAttendance}
                        userLocation={location}
                        zoom={14}
                        distance={distance}
                        absenMasuk={absenMasuk}
                        absenPulang={absenPulang}

                    />
                    )
            }else {
                return (
                    <>
                        <h3>Tidak ada jadwal lembur hari ini.</h3>
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