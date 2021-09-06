import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconLeft, iconUser } from '../../../../assets'
import { Col, FilterMonth, FilterYear, Gap, Icon, PageContentMenu, PageHeader, Row } from '../../../../components'
import API from '../../../../config/api'
import { apakahHariMinggu, bulan_indo, format_tanggal_indo, getDaysInMonth, nama_hari, tahun_bulan_tanggal } from '../../../../utils/helpers/date'

const date = new Date();

const AttendanceReport = (props) => {
    const division = props.location.state;
    const [groups, setGroups] = useState(null);
    const [employees, setEmployees] = useState(null);
    const [attendances, setAttendances] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [holidays, setHolidays] = useState(null);
    const [leaves, setLeaves] = useState(null);
    const [overtimes, setOvertimes] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(0);
    const [group, setGroup] = useState(null);
    const [month, setMonth] = useState(date.getMonth());
    const year = (new Date()).getFullYear();
    const startYear = (new Date()).getFullYear() - 3;
    const [selectedYear, setSelectedYear] = useState(year);
    const [days, setDays] = useState(getDaysInMonth(selectedYear, parseInt(month)));

    const token = props.user.token;
    useEffect(() => {
        //get division by client_id
        console.log('render pertama kali')
        API.getTeamGroupByDivisionID(token, division.id).then((res) => {
            // console.log(res)
            setGroups(res.data)
            
            
        }).catch(err => {
            console.log(err.response);
            // console.log(err.response.data.message);
        })
    }, [])


    useEffect(() => {
        let mnth = parseInt(month) + 1;
        const periode = `${selectedYear}-${mnth}`;
        const data = {
            division_id: division.id,
            group_id: selectedGroup,
            date: periode
        }
        console.log(`request attendance group id ${selectedGroup} di periode ${periode}`)
        API.getReportAttendance(token, data).then(res => {
            console.log(res.data.data)
            setEmployees(res.data.data.employees)
            setAttendances(res.data.data.attendances)
            setHolidays(res.data.data.holidays)
            setLeaves(res.data.data.leaves)
            setSchedules(res.data.data.schedules)
            setOvertimes(res.data.data.overtimes)
        }).catch(err => {
            console.log(err)
        })
    }, [month, selectedYear, selectedGroup])

    
    const handleMonthChange = e => {
        // console.log(e);
        setMonth(e.target.value);
        setDays(getDaysInMonth(year, parseInt(e.target.value)))

       
    }

    const handleChangeYearFilter = (e) => {
        setSelectedYear(e.target.value);
       
    }

    const handleChangeGroup = (group) => {
        setSelectedGroup(group.id)
        setGroup(group)
    }

    const showSchedule = (employeeID, date, type, name = '') => {
        // console.log(date)        
        const schedule = schedules.find(el => (el.date === date && el.employee_id === employeeID));
        if(schedule){ // ada jadwal
            const melakukanAbsen = attendances.find(el => (el.date === date && el.employee_id === employeeID)) && schedules.find(el => (el.date === date && el.employee_id === employeeID));
            if(melakukanAbsen){
                const late = attendances.find(el => (el.date === date && el.employee_id === employeeID && el.is_late === 1)) && schedules.find(el => (el.date === date && el.employee_id === employeeID)); //ada jadwal tapi absen masuk telat kuning

                if(late){
                    return 'tlt';
                }else {
                    
                    return 'ok'

                    
                }
            }else { //ada jadwal tapi tidak absen masuk x merah
                return 'x'
            }
            //check lagi apakah di jadwal itu ada absen

        }else { // tidak ada jadwal
            //tapi absen
            return '-';
            //tidak ada jadwal bulat abu-abu

        }
    }
 

    
    return (
        <>
             <PageHeader
                title={`Kehadiran Divisi ${division.name}`}
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                    <Link to='/employee/attendance' className="back-button" >                    
                        <Icon icon={iconLeft} color="#fff" />
                        <p>Back</p>
                    </Link>
                </Col>
                
                {/* filter tahun dan bulan */}
                <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <p style={{fontSize: 14, marginRight: 5}}>Tahun : </p>
                    <div style={{marginLeft: 5}}>
                        <FilterYear year={year} startYear={startYear} selectedYear={selectedYear} handleChange={handleChangeYearFilter} />
                    </div>

                </Col>
            </Row>
           <Row>
            <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10, marginBottom: 5}}>
                <p>Lihat : &nbsp;</p>
                <p className={`filter-group ${selectedGroup == 0 ?'active': ''}`} onClick={() => handleChangeGroup({id: 0, public_holiday_is_off: 0})}>Semua</p>    
                {groups && groups.map(group => (
                    <p key={group.name} className={`filter-group ${selectedGroup == group.id ?'active': ''}`} onClick={() => handleChangeGroup(group)}>                    
                    {group.name}
                    </p>
                ))
                }
            </Col>
           </Row>
            <Row>
                <table className="schedule-table" style={{overflowX: 'scroll'}}>
                <thead>
                    <tr>
                        <th rowSpan="3">No.</th>
                        <th rowSpan="3">Nama.</th>
                        <th colSpan={days.length}>
    
                            <FilterMonth handleChange={handleMonthChange} month={month} className="schedule-month" />

                
                        </th>
                    </tr>
                    <tr>
                        {
                            days.map((day, index) => (
                                <td key={`hari-${index}`} style={{maxWidth: '3px', overflow: 'hidden', fontSize: '10px'}} className={
                                    // jika tanggal merah tidak masuk, tambahkan class minggu
                                //    group.public_holiday_is_off == 1 && apakahHariMinggu(day.getDay()) && 'minggu'
                                    (() => {
                                        if(group){if (group.public_holiday_is_off == 1) {
                                            // console.log(holidays)
                                            if(holidays){if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                return 'libur'
                                            }
                                            return apakahHariMinggu(day.getDay()) && 'minggu'
                                        }}}
                                    })()
                                
                                }>
                                    {nama_hari(day.getDay())}</td>
                                // console.log(day.getDay())
                                ))
                                
                            }
                    </tr>
                    
                    <tr>
                        {
                            days.map((day, index) => (
                                <td key={`tanggal-${index}`} style={{maxWidth: '3px', textAlign: 'center', fontSize: '10px'}} className={        
                                  // jika tanggal merah tidak masuk, tambahkan class minggu
                                //    group.public_holiday_is_off == 1 && apakahHariMinggu(day.getDay()) && 'minggu'
                                   (() => {
                                        if(group) {if (group.public_holiday_is_off == 1) {
                                            // console.log(holidays)
                                            if(holidays){if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                return 'libur'
                                            }
                                            return apakahHariMinggu(day.getDay()) && 'minggu'
                                        }}}
                                    })()
                                }
                                >
                                        {1 +index}</td>
                                // console.log(day.getDay())
                                ))
                                
                            }
                    </tr>
                    </thead>
                    <tbody>
                      
                        {
                            employees != null ? employees.map((e, index) => (
                                <tr key={`karyawan-${e.name}`}>
                                    <td key={`karyawan-${index}`} style={{textAlign: 'center'}}>{1 + index}</td>
                                    <td className="schedule-employee-name hasTooltip" key={`karyawan-id${e.id}`} onClick={() => schedulePerEmployeeAllDate(e, days)}>
                                        {e.name}
                                        <span>Atur Jadwal {e.name} bulan {bulan_indo(month)}</span>

                                    </td>
                                    {days.map((day, index) => (
                                        <td key={`jadwal-karyawan-${index}`}className={
                                            // jika tanggal merah tidak masuk, tambahkan class minggu
                                            //check apabila hari libur tidak masuk, jika true
                                            //tandai hari minggu
                                            //tandai tanggal merah
                                            // group.public_holiday_is_off == 1 ? apakahHariMinggu(day.getDay()) ? 'schedule-employee-date hasTooltip minggu' : 'schedule-employee-date hasTooltip' : 'schedule-employee-date hasTooltip'
                                            (() => {
                                                if(group){if (group.public_holiday_is_off == 1) {
                                                    // console.log(holidays)
                                                    if(holidays){if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                        return 'schedule-employee-date hasTooltip libur'
                                                    }
                                                    return apakahHariMinggu(day.getDay()) ? 'schedule-employee-date hasTooltip minggu' : 'schedule-employee-date hasTooltip'
                                                }else {
                                                    return 'schedule-employee-date hasTooltip'
                                                }}
                                            }})()
                                        }
                                        onClick={() => schedulePerEmployeePerDate(e, day)}>
                                       {
                                            (schedules.length >= 1) ? showSchedule(e.id, tahun_bulan_tanggal(day), 'table') : null
                                        }
                                        
                                        
                                        </td>

                                    ))}
                                </tr>
                            )) : <tr><td colSpan={2 + days.length} style={{textAlign: 'center'}}>Tidak ada karyawan</td></tr>
                        }
                    </tbody>
                </table>
            </Row>
                
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
export default connect(reduxState, reduxDispatch)(AttendanceReport)
