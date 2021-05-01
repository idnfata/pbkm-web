import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconUser } from '../../../assets'
import { FilterMonth, FilterYear, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'
import { apakahHariMinggu, format_tanggal_indo, getDaysInMonth, nama_hari, tahun_bulan_tanggal, tanggal_bulan_tahun, getDatesBetweenDates } from '../../../utils/helpers/date'
import { MyScheduleWrapper } from './my-schedule.elements'

const date = new Date();
const year = date.getFullYear();


const MySchedule = (props) => {
    const token = props.user.token;
    const employee = props.user.info;
    const history = props.history;
    const [groupScheduleInfo, setGroupScehduleInfo] = useState([])
    const [holidays, setHolidays] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [overtimeData, setOvertimeData] = useState([]);
    const [leaveData, setLeaveData] = useState([]);
    const [month, setMonth] = useState(date.getMonth());
    const [days, setDays] = useState(getDaysInMonth(year, parseInt(month)));





    const handleMonthChange = value => {
        // console.log(value);
        setMonth(value);
        setDays(getDaysInMonth(year, parseInt(value)))

       
    }

    const generateDesc = (leave, overtime, dateStatus) => {
        let desc = '';
        if(dateStatus == 'lewat'){ // jika tanggal belum lewat dari tanggal hari ini
            if(leave){ //jika ada jadwal cuti
                if(leave.status == 1){ //jika cuti disetujui
                    desc = 'Cuti Disetujui'
                }else { //jika belum disetujui
                    desc = 'Mengajukan Cuti'
                }
            }else { //jika tidak ada cuti
                if(overtime){//jika ada jadwal lembur
                    if(overtime.status == 1){//jika lembur disetujui
                        desc = "Lembur Disetujui"
                    }else { // jika belum disetujui
                        desc = "Mengajukan Lembur"
                    }
                }else { //jika tidak ada jadwal lembur
                    desc = ""
                }
            }
    
        }else { // tanggal sebelum tanggal hari ini
            if(leave){ //jika ada jadwal cuti
                if(leave.status == 1){ //jika cuti disetujui
                    desc = 'Cuti Disetujui'
                }else { //jika belum disetujui
                    desc = 'Pengajuan Cuti Ditolak'
                }
            }else { //jika tidak ada cuti
                if(overtime){//jika ada jadwal lembur
                    if(overtime.status == 1){//jika lembur disetujui
                        desc = "Lembur Disetujui"
                    }else { // jika belum disetujui
                        desc = "Pengajuan Lembur Ditolak"
                    }
                }else { //jika tidak ada jadwal lembur
                    desc = ""
                }
            }
        }
        
        return desc;
    }

    const generateClassName = (leave, overtime, schedule) => {

    }

    const haveSchedule = (date) => {
      
        const schedule = scheduleData.find(el => (el.date === tahun_bulan_tanggal(date)));
        const overtime = overtimeData.find(el => (el.date === tahun_bulan_tanggal(date)));
        const leave = leaveData.find(el => (el.date === tahun_bulan_tanggal(date)));
        console.log(leave)
        const holiday = holidays.find(el => (el.date === tahun_bulan_tanggal(date)));
        if(date <= new Date() - 86400000){
            //apabila tanggal kurang dari 1 hari dari hari ini
            // return "sebelum hari ini"
            if(schedule){ //apabila jadwal ditemukan
                // return "jadwal ditemukan"
                return <>
                    <div className="col">00:00</div>
                    <div className="col">00:00</div>
                    <div className="col">
                        {schedule.location_code}
                    </div>
                    <div className="col">
                        {schedule.shift_code}
                    </div>
                    <div className="col ket">
                        {/* {leave ? "Ada Cuti" : null} */}
                        {/* {overtime ? "Ada Lembur" : null} */}
                        {generateDesc(leave, overtime, 'belum-lewat')}

                    </div>
                </>
               
            }else { //apabila jadwal tidak ditemukan
                //cek apakah date itu hari off mingguan
                if (employee.public_holiday_is_off == 1) {
                    // console.log(holidays)
                    if (holiday) {
                        // console.log(holiday)
                        return <>
                                <div className="schedule-not-found">
                                    {holiday.type} - 
                                    {/* {overtime && <span>Ada Lembur</span>} */}
                                    {generateDesc(leave, overtime, 'belum-lewat')}

                                </div>
                            </>
                        
                    }
                
                    return apakahHariMinggu(date.getDay()) ? <div className="schedule-not-found">Hari Off Kerja {
                        // overtime && <span>Ada Lembur</span>
                        generateDesc(leave, overtime, 'belum-lewat')

                    }</div> : 
                        <div className="schedule-not-found">
                            Tidak ada Jadwal
                            {/* {leave && "Ada Cuti"} */}
                            {generateDesc(leave, overtime, 'belum-lewat')}

                        </div>

                }else {
                    return <div className="schedule-not-found">
                        Tidak ada Jadwal
                    </div>

                }
            }
        }else { //tanggal hari ini atau setelah hari ini
            // return "hari ini atau setelah hari ini"
            if(schedule){
                return <>
                    <div className="col">00:00</div>
                    <div className="col">00:00</div>
                    <div className="col">
                        {schedule.location_code}
                    </div>
                    <div className="col">
                        {schedule.shift_code}
                    </div>
                    <div className="col ket">
                        {/* {overtime ? "Ada Lembur" : null}
                        {leave ? "Ada Cuti" : null} */}
                        {
                            generateDesc(leave, overtime, 'lewat')
                        }

                    </div>
                </>
            }else {
                 //cek apakah date itu hari off mingguan
                 if (employee.public_holiday_is_off == 1) {
                    // console.log(holidays)
                    if (holiday) {
                        // console.log(holiday)
                        return <>
                                <div className="schedule-not-found">
                                    {holiday.name}
                                    {overtime && ' | '}
                                    {generateDesc(leave, overtime, 'lewat')}

                                </div>
                            </>
                        
                    }
                
                    return apakahHariMinggu(date.getDay()) ? <div className="schedule-not-found">Hari Off Kerja 
                        {overtime && ' | '}
                    {
                        
                        // overtime && <span>Ada Lembur</span>
                        generateDesc(leave, overtime, 'lewat')

                    }</div> : 
                        <div className="schedule-not-found">
                            Belum ada Jadwal
                            {/* {overtime && ' | '} */}
                            {generateDesc(leave, overtime, 'lewat')}

                        </div>

                }else {
                    return <div className="schedule-not-found">
                        Belum ada Jadwal
                    </div>

                }
                
            }
        }
       
    }


    useEffect(() => {
        setHolidays([])
        let mnth = parseInt(month) + 1;
        const date = `${year}-${mnth}`;

        API.getEmployeeScheduleAtMonth(token, employee.id, date).then(res => {
            // console.log(res)
            setScheduleData(res.data);
        }).catch(err => {
            setScheduleData([]);
            // console.log(err)

        })

        API.getHolidaysAtMonth(token, date).then(res => {
            // console.log(res)
            setHolidays(res.data)
        }).catch(err => {
            // console.log(err)
            setHolidays([]);
            // console.log(err.response.data.message)
        })

        API.getEmployeeLeaveHistories(token, employee.id, date, 'at-month').then(res => {
            // console.log(res.data)
            //ada berapa data, looping
            //tiap looping cek jumlah harinya,
            //looping lagi jumlah harinya
            //setiap looping jumlah harinya tambahkan ke array tanggal cuti
            //
            let leave = [];
            res.data.map(data => {
                //hitung jumlah hari dari tanggal mulai sampai tanggal selesai
                //looping sesuai tanggal itu
                //masukkan ke array tanggal cuti,
                let dates = getDatesBetweenDates(data.request_date_start, data.request_date_end)
                for(let i = 0; i < dates.length; i++){
                    leave.push({
                        id: data.id,
                        date : tahun_bulan_tanggal(dates[i]), 
                        status: data.status,
                        leave_type: data.leave_type,
                    
                    })
                }

                
                
                // console.log(data)
            })
            // console.log(leave)
            setLeaveData(leave)
        }).catch(err => {
            console.log(err)
            setScheduleData([]);
        })

        API.getEmployeeOvertimeRequest(token, employee.id, date, 'at-month').then(res => {
            // console.log(res)
            setOvertimeData(res.data)
        }).catch(err => {
            console.log(err)
            setOvertimeData([]);
        })
    }, [month])

    
    return (
        <>
        <PageHeader
                title="Jadwal Kerja"
                mobileTitle="Jadwal Kerja"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />

            <div className="filter-month-wrapper">
                <FilterMonth handleChange={handleMonthChange} month={month} showTagP={true} className="filter-month-my-schedule" type="next" />
                
            </div>
            <MyScheduleWrapper>
            {/* <div className="div-table"> */}
                <div className="my-schedule-header row">
                    <div className="col">
                       Tanggal
                    </div>
                    <div className="col">
                        Jam Masuk
                    </div>
                    <div className="col">
                        Jam Keluar
                    </div>
                    <div className="col">
                        Lokasi
                    </div>
                    <div className="col">
                        Shift
                    </div>
                    <div className="col ket">
                        <span className="show-desktop">Keterangan</span>
                        <span className="show-mobile">Ket</span>

                    </div>
                    
                </div>
            {/* </div> */}
            <div className="my-schedule-body">
            {
                days.map((day, i) => (
                    <div key={day.getDate()} className={
                        // jika tanggal merah tidak masuk, tambahkan class minggu
                    //    employee.public_holiday_is_off == 1 && apakahHariMinggu(day.getDay()) && 'minggu'
                        (() => {
                            //menandai tanggal sebelum hari ini/tanggal berjalan 
                            if(day <= new Date() - 86400000){
                                // return 'lewat';
                                if (employee.public_holiday_is_off == 1) {
                                    // console.log(holidays)
                                    if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                        return 'row lewat libur'
                                        
                                    }else {
                                        //jika hari minggu 
                                        if(apakahHariMinggu(day.getDay())){
                                            return 'row lewat minggu'
                                        }else {
                                            return 'row lewat'
                                        }

                                    }
                                
                                }else {
                                    return 'row lewat'
                                }
                            }else {
                                if (employee.public_holiday_is_off == 1) {
                                    // console.log(holidays)
                                    if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                        return 'row libur'
                                        
                                    }
                                
                                    return apakahHariMinggu(day.getDay()) ? 'row minggu' : 'row'
                                    

                                }else {
                                    return 'row'

                                }
                            }

                            
                        })()
                    
                    }>
                       

                        <div className="col">
                            <span className="show-desktop">{
                                format_tanggal_indo(day)
                                // `${nama_hari(day.getDay())}, ${format_tanggal_indo(day)}`
                            }</span>
                            <span className="show-mobile">{i + 1}</span>
                        </div>
                        {
                            (scheduleData.length >= 1) ? haveSchedule(day) : <div className="schedule-not-found">
                            Belum ada Jadwal
                            </div>
                        }
                        
                    </div>
                ))
            }
            </div>
            </MyScheduleWrapper>
            {/* {scheduleData.length > 0 ? 
                scheduleData.map(data => (
                    <div key={data.id} className="schedule-list">
                        {data.shift_code}
                    </div>
                ))
            :
            
            <h3>
                Jadwal Belum Ditentukan.
            </h3>
            } */}
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
export default connect(reduxState, reduxDispatch)(MySchedule)
