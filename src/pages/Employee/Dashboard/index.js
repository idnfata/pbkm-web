import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconCalendar, iconCutTime, iconEdit, iconExchange, iconLate, iconLoan, iconOverTime, iconSick, iconUser, notifImg } from '../../../assets'
import { Gap, PageHeader, Row,
    InfoChart, InfoKehadiranUser, InfoTitle,
    SectionInfoCuti,
    SectionInfoKehadiran,
    SectionPemberitahuan,
    SPButton,
    SPDesc,
    SPDetail,
    SPImg,
    SPSubTitle,
    SPTitle,
    UserPhoto,
    UserProfile,
    CircleChart,
    SectionInfoSakit,
    EmployeeDashboardContainer,
    SectionText,
    SectionLink,
    Icon
} from '../../../components'
import API from '../../../config/api'
import { attendanceText, overtimeText } from '../../../utils/helpers/attendance'
import { format_tanggal_indo, hmsToSeconds, jam_menit_detik, secondsToHMS, tahun_bulan_tanggal } from '../../../utils/helpers/date'
import { greeting } from '../../../utils/helpers/greeting'
import DaftarTugas from './DaftarTugas'
import { SectionTitleDaftarTugas, SectionDaftarTugas, MenuRequest, TitleMenuRequest, ContentMenuRequest, LinkMenuRequest} from './dashboard-employee.elements'


const EmployeeDashboard = (props) => {
    const {history, isLoading, loading, isLogin, user} = props;
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(jam_menit_detik());
    const [isHaveScheduleToday, setIsHaveScheduleToday] = useState(false);
    const [schedule, setSchedule] = useState({
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
    const [overtimeAttendance, setOvertimeAttendance] = useState(null);

    const [attendanceStatus, setAttendanceStatus] = useState(null);
    const [attendanceRecap, setAttendanceRecap] = useState({});
    const [leaveRecap, setLeaveRecap] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const today = new Date();
    const token = user.token;
    const employee = user.info;
   
    const buttonPemberitahuanJamKerja = () => {
     

        // check apakah sudah absen
        if(attendance === null){
            // return 'belum absen';
            // console.log('belum absen')
            schedule.attTimeIn = (schedule.attTimeIn == '00:00:00') ? '24:00:00' : schedule.attTimeIn;

           
            let waktuSisa = hmsToSeconds(time) - hmsToSeconds(schedule.attTimeIn);
            // console.log(waktuSisa)
            if(waktuSisa < 0){
                // console.log('belum masuk jam kerja')
                let secs = Math.abs(waktuSisa)
                //jika waktu sisa lebih dari 5 menit
                if(secs > (60 * 5)){
                    // console.log('waktu sisa lebih dari 5 menit')
                    return <SPButton to="/schedule">Lihat Jadwal</SPButton>

                }else {
                    // console.log('waktu sisa kurang dari 5 menit')
                    return <button className="sp-button" onClick={() => history.push('/attendance/record')}>Absen Masuk</button>

                }

            }else { //apabila masuk jam kerja
                // console.log('sudah masuk jam kerja')
                
                //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
                if(hmsToSeconds(time) <= (hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))){
                    // console.log('jam kerja sudah lewat tapi masih ada toleransi telat')
                    return <button className="sp-button waktu-kerja-lewat" onClick={() => history.push('/attendance/record')}>Absen Masuk</button>

    
                }else { //apabila jam kerja sudah lewat & toleransi telat sudah habis
                    //cek dulu apakah sudah masuk jam pulang
                    if(hmsToSeconds(time) <= (hmsToSeconds(schedule.attTimeOut) - (60 * 60))){
                        // console.log('belum masuk jam pulang')
                        return <button className="sp-button waktu-kerja-dan-toleransi-lewat" onClick={() => history.push('/attendance/record')}>Absen Masuk</button>


                    }else {
                        // console.log('sudah masuk jam pulang')
                        return <SPButton to="/attendance/history">Riwayat Kehadiran</SPButton>



                    }
    
                }
            }  
    
        }else { //jika sudah absen
            // console.log('sudah absen, tampil durasi kerja');
            if(attendance.time_out !== null){
                // console.log('total durasi kerja ')
                return  `${secondsToHMS(hmsToSeconds(attendance.time_out_schedule) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}`

            }else {
                if(hmsToSeconds(time) < (hmsToSeconds(attendance.time_break_start))){ 
                    // console.log('belum masuk istirahat')
                    return `${secondsToHMS(hmsToSeconds(time) - hmsToSeconds(attendance.time_in))}`
    
                }else { //'masuk jam istirahat'
                    // console.log('jam istirahat')
                    if(hmsToSeconds(time) >= (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))) { // lewat jam istirahat
                        // console.log('jam istirahat lewat')
                        if(hmsToSeconds(time) >= (hmsToSeconds(attendance.time_out_schedule))){ // apabila masuk jam pulang 
                            // console.log('masuk jam pulang, button pulang')
                            return <button className='sp-button' onClick={() => history.push('/attendance/record')}>Absen Pulang</button>
    
                        }else {
                            // console.log('durasi kerja setelah jam istirahat')
                            if(hmsToSeconds(attendance.time_in) > (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))){ //jika absen di atas jam istirahat
                                return  `${secondsToHMS(hmsToSeconds(time) - hmsToSeconds(attendance.time_in))}`
                            }else {

                                return  `${secondsToHMS(hmsToSeconds(time) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}`
                            }
    
                        }
    
                    }else { //apabila belum lewat jam istirahat
                        // console.log('masih jam istirahat')
                        if(hmsToSeconds(attendance.time_break_start) - hmsToSeconds(attendance.time_in) < 0){
                            // console.log('minus')
                            return `00:00:00`;
    
                        }else {
                            // console.log('istirahat')
                            // berapa jumlah durasi kerja dari awal masuk sebelum jam istirahat
                        
                            return `${secondsToHMS(hmsToSeconds(attendance.time_break_start) - hmsToSeconds(attendance.time_in))}`
    
                            // return <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(time) - (hmsToSeconds(attendance.time_in)))}`}</AttendanceRecordButton>
    
                        }
                        
                    }
                }
                
            }
        }
        
    
    
        
    }
    const buttonPemberitahuanJamLembur = () => {
        // return (
        //     <SPButton to='/attendance/record/overtime'>Absen Lembur</SPButton>
        //     )
        if(overtimeAttendance == null){ //jika belum absen
            // console.log('belum absen')

            
            let waktuSisa = hmsToSeconds(time) - hmsToSeconds(overtimeData.attTimeIn);
            // console.log(waktuSisa)
            if(waktuSisa < 0){
                // console.log('belum masuk jam kerja')
                let secs = Math.abs(waktuSisa)
                //jika waktu sisa lebih dari 5 menit
                if(secs > (60 * 5)){
                    // console.log('waktu sisa lebih dari 5 menit')
                    return <SPButton to='/schedule'>Lihat Jadwal</SPButton>


                }else {
                    // console.log('waktu sisa kurang dari 5 menit')
                    return <SPButton to='/attendance/record/overtime'>Absen Lembur</SPButton>

                    // return <button onClcik={() => API.addAttendance()}>Absen Masuk</button>



                }

            }else { //apabila masuk jam kerja
                // console.log('sudah masuk jam kerja')
                
                //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
                if(hmsToSeconds(time) <= (hmsToSeconds(overtimeData.attTimeIn) + (overtimeData.attLateTolerance * 60))){
                    // console.log('jam kerja sudah lewat tapi masih ada toleransi telat')
                    return <SPButton to='/attendance/record/overtime' className="waktu-kerja-lewat">Absen Lembur</SPButton>
                    
                    
    
                }else { //apabila jam kerja sudah lewat & toleransi telat sudah habis
                    //cek dulu apakah sudah masuk jam pulang
                    if(hmsToSeconds(time) <= (hmsToSeconds(overtimeData.attTimeOut) - (60 * 60))){
                        // console.log('belum masuk jam pulang')
                        return <SPButton to='/attendance/record/overtime' className="waktu-kerja-dan-toleransi-lewat">Absen Lembur</SPButton>


                    }else {
                        // console.log('sudah masuk jam pulang')
                        return <SPButton to='/overtime'>Riwayat Lembur</SPButton>
                    }
    
                }
            }


        }else { //jika sudah absen
            // console.log('sudah absen lembur, tampil durasi kerja');
            // return "sudah absen"
            if(overtimeAttendance.time_out !== null) {
                // console.log('total durasi kerja');
                return `${secondsToHMS(hmsToSeconds(overtimeAttendance.ends_on) - (hmsToSeconds(overtimeAttendance.time_in)) - (overtimeAttendance.break_duration * 60))}`
            }else {
                // console.log('sudah absen, tampil durasi kerja');
    
                if(hmsToSeconds(time) < (hmsToSeconds(overtimeAttendance.time_break_start))){ 
                    // console.log('belum masuk istirahat')
                    return `${secondsToHMS(hmsToSeconds(time) - hmsToSeconds(overtimeAttendance.time_in))}`
    
                }else { //'masuk jam istirahat'
                    // console.log('jam istirahat')
                    if(hmsToSeconds(time) >= (hmsToSeconds(overtimeAttendance.time_break_start) + (overtimeAttendance.break_duration * 60))) { // lewat jam istirahat
                        // console.log('jam istirahat lewat')
                        if(hmsToSeconds(time) >= (hmsToSeconds(overtimeAttendance.ends_on))){ // apabila masuk jam pulang 
                            // console.log('masuk jam pulang, button pulang')
                            return <SPButton to='/attendance/record/overtime'>Absen Selesai Lembur</SPButton>

                        }else {
                            // console.log('durasi kerja setelah jam istirahat')
                            if(hmsToSeconds(overtimeAttendance.time_in) > (hmsToSeconds(overtimeAttendance.time_break_start) + (overtimeAttendance.break_duration * 60))){ //jika absen di atas jam istirahat
                                return  `${secondsToHMS(hmsToSeconds(time) - hmsToSeconds(overtimeAttendance.time_in))}`
                            }else {
                                return  `${secondsToHMS(hmsToSeconds(time) - (hmsToSeconds(overtimeAttendance.time_in)) - (overtimeAttendance.break_duration * 60))}`

                            }
    
    
    
                        }
    
                    }else { //apabila belum lewat jam istirahat
                        // console.log('masih jam istirahat')
                        if(hmsToSeconds(overtimeAttendance.time_break_start) - hmsToSeconds(overtimeAttendance.time_in) < 0){
                            // console.log('minus')
                            return `00:00:00`
    
                        }else {
                            // console.log('istirahat')
                            // berapa jumlah durasi kerja dari awal masuk sebelum jam istirahat
                        
                            return secondsToHMS(hmsToSeconds(overtimeAttendance.time_break_start) - hmsToSeconds(overtimeAttendance.time_in))
    
                        }
                        
                    }
                }

            }


        }
    }
    useEffect(() => {
        setTitle(greeting())

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('This will run every second!');
            setTime(jam_menit_detik());
         }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        //check apakah ada jadwal hari ini
        API.checkTodayScheduleOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            // console.log(res);
            setSchedule({
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
            });
            setIsHaveScheduleToday(true);
            //check status kehadiran, apakah sudah absen atau belum
            API.checkTodayAttendanceOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
                // console.log(res);
                setAttendanceStatus(res.data.attendance_status);
                setAttendance(res.data);
            }).catch(err => {
                setAttendanceStatus(0);
               
                // console.log(err.response.data.message);
            })
        }).catch(err => {
            console.log(err.response.data.message)
            setIsHaveScheduleToday(false);
        })

        API.isEmployeeHaveOvertimeToday(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            console.log(res.data)
            setOvertimeData({
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
        //get rekap kehadiran karyawan
        API.getRecapAttendance(token, employee.id, today.getFullYear()).then(res => {
            // console.log(res.data)
            setAttendanceRecap(res.data)

        }).catch(err => {
            // console.log(err.response.message)
            setAttendanceRecap({
                total_attendance: 0,
                total_overtime: 0,
                total_late: 0
            })
        })
        //get rekap cuti karyawan
        API.getRecapLeave(token, employee.id, employee.group_id, today.getFullYear()).then(res => {
            // console.log(res.data)
            setLeaveRecap(res.data)

        }).catch(err => {
            console.log(err.response)
            setLeaveRecap(null)
        })

        
    }, [attendanceStatus])

   
    return (
        <>
        <PageHeader name={props.user.name} photo={iconUser} title={title} pathname={history.location.pathname} />
        {/* <Gap height={20} /> */}
        <EmployeeDashboardContainer>
            <SectionPemberitahuan>
                    <SPDetail>
                        <SPTitle>Informasi & Pemberitahuan</SPTitle>
                        <SPSubTitle>{format_tanggal_indo(today)}, <span>{time}</span></SPSubTitle>
                        <SPDesc>
                        
                        {
                            isHaveScheduleToday ?  <p dangerouslySetInnerHTML={{__html: attendanceText(time, schedule, attendance) }} />
                            : overtimeData ? <><span>Libur! Tapi ada jadwal lembur.</span><p dangerouslySetInnerHTML={{__html: overtimeText(time, overtimeData, overtimeAttendance) }} /></> : `Libur! Tidak ada jadwal kerja hari ini.`
                        }
                        </SPDesc>
                        {/* {
                          isHaveScheduleToday ? buttonPemberitahuanJamKerja(time, schedule.time_in, schedule.late_tolerance, schedule.break_start, schedule.break_duration, schedule.time_out, attendanceStatus, employee.track_location) 
                           : <SPButton to='/schedule'>Lihat Jadwal</SPButton>
                        } */}
                 
                        {(() => {
                            if  (employee.need_attendance === 1) {
                                // console.log('perlu absen')
                                //check apakah ada jadwal
                                if(isHaveScheduleToday){
                                    // console.log('ada jadwal')
                                    return buttonPemberitahuanJamKerja()
                                }else { //tidak ada jadwal
                                    if(overtimeData){
                                        return buttonPemberitahuanJamLembur()

                                        
                                    }else {
                                        return (
                                            <SPButton to='/schedule'>Lihat Jadwal</SPButton>
                                        )
                                    }
                                    
                                }
                               
                            } else {
                                // console.log('tidak perlu absen')
                                return (
                                    <SPButton to='/schedule'>Lihat Jadwal</SPButton>
                                )
                            }
                        })()}
                    </SPDetail>
                    <SPImg src={notifImg} alt="notif-img" />

            </SectionPemberitahuan>
            <UserProfile>
                    <UserPhoto>
                        <img src={iconUser} alt="user-photo" className="user-photo" />
                    </UserPhoto>
                    <p className="user-name">{props.user.name}</p>
                    <p className="user-role">Staff IT</p>
                    {/* <p className="user-role">Lokasi Kerja karyawan</p> */}
            </UserProfile>

            <SectionInfoKehadiran>
        
                <InfoKehadiranUser>
                    <div>
                        <p className="text-small primary">Kehadiran</p>
                        <p className="text-big">{attendanceRecap.total_attendance}</p>
                    </div>
                    <div>
                        <p className="text-small primary">Telat</p>
                        <p className="text-big">{attendanceRecap.total_late}</p>
                    </div>
                    <div>
                        <p className="text-small primary">Lembur</p>
                        <p className="text-big">{attendanceRecap.total_overtime}</p>
                    </div>
                </InfoKehadiranUser>
                
            </SectionInfoKehadiran>

            {
                leaveRecap !== null && leaveRecap.map((lr, i) => (

                   
                    i == 0 ? <SectionInfoCuti to='leave'>
                        <InfoTitle>
                            <p className="text-small">{lr.leave_type_name} terpakai</p>
                            <p className="text-big">{lr.total} <span> / {lr.balance}</span></p>
                        </InfoTitle>
                        <InfoChart>
                            <CircleChart percentage={((lr.total / lr.balance) * 100).toFixed(0)} /> 

                        </InfoChart>
                    </SectionInfoCuti>
                        :
                    <SectionInfoSakit to='leave'>
                        <InfoTitle>
                            <p className="text-small">{lr.leave_type_name} terpakai</p>
                            <p className="text-big">{lr.total} <span> / {lr.balance}</span></p>
                        </InfoTitle>
                        <InfoChart>
                            <CircleChart percentage={((lr.total / lr.balance) * 100).toFixed(0)} /> 

                        </InfoChart>
                    </SectionInfoSakit>

                
                        
                    
                ))
            }
            {/* <SectionInfoCuti to="request/annual-leave">
                <InfoTitle>
                    <p className="text-small">Cuti tahunan terpakai</p>
                    <p className="text-big">20 <span> / 22</span></p>

                    <button>Ajukan cuti tahunan</button>


                </InfoTitle>
                <InfoChart>
                    <CircleChart percentage="90" />
                </InfoChart>

            </SectionInfoCuti> */}

            {/* <SectionInfoSakit to="/request/sick-leave">
                <InfoTitle>
                    <p className="text-small">Cuti sakit terpakai</p>
                    <p className="text-big">4 <span> / 22</span></p>



                </InfoTitle>
                <InfoChart>
                    <CircleChart percentage="20" />
                </InfoChart>

            </SectionInfoSakit> */}
            <SectionTitleDaftarTugas>
                <SectionText>
                    Daftar Tugas
                </SectionText>
                <SectionLink to="/task/list">
                    see all
                </SectionLink>
            </SectionTitleDaftarTugas>
            <SectionDaftarTugas>
              <DaftarTugas />
            </SectionDaftarTugas>

            <MenuRequest>
                <TitleMenuRequest>Buat Pengajuan <Link to="/request/history" className="link">Riwayat</Link></TitleMenuRequest>
                <ContentMenuRequest>
                    <LinkMenuRequest to="/request/leave/annual">
                        <h3>Cuti Tahunan</h3>
                        <Icon icon={iconCalendar} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/leave/sick">
                        <h3>Cuti Sakit</h3>
                        <Icon icon={iconSick} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/late">
                        <h3>Izin Telat</h3>
                        <Icon icon={iconLate} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/out-early">
                        <h3>Izin Pulang Duluan</h3>
                        <Icon icon={iconCutTime} color="#222" />
                    </LinkMenuRequest>
                  
                    <LinkMenuRequest to="/request/loan">
                        <h3>Pinjaman</h3>
                        <Icon icon={iconLoan} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/switch-shift">
                        <h3>Tukar Shift</h3>
                        <Icon icon={iconExchange} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/overtime">
                        <h3>Lembur</h3>
                        <Icon icon={iconOverTime} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/edit-personal-data">
                        <h3>Ubah Data</h3>
                        <Icon icon={iconEdit} color="#222" />

                    </LinkMenuRequest>
                </ContentMenuRequest>
        
            </MenuRequest>
        </EmployeeDashboardContainer>
        </>
    )
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user,
    isLoading: state.isLoading

})
  
  
const reduxDispatch = (dispatch) => ({
    loading : (data) => dispatch(setLoading(data)),

    

})
export default connect(reduxState, reduxDispatch)(EmployeeDashboard)