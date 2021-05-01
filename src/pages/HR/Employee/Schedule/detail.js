import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { iconAdd, iconCalendar, iconLate, iconLeft, iconOverTime, iconSchedule, iconUser, iconWorkingHours } from '../../../../assets';
import { AutoCompleteSelect, Button, Col, FilterMonth, FormControl, Gap, Icon, PageHeader, Row } from '../../../../components';
import { Formik, Form, getIn, Field } from 'formik'
import Modal from 'react-modal';
import API from '../../../../config/api';
import { bulan_indo, format_tanggal_indo, getDaysInMonth, nama_hari, tahun_bulan_tanggal, tanggal_bulan_tahun, apakahHariMinggu, YMdToFormatIndo, YMdtoDateMonth } from '../../../../utils/helpers/date';
import { CopyScheduleField, ScheduleContainer } from './schedule.elements';
import {fieldsPerDatePerEmployee} from './fields'
import BulkScheduleForm from './BulkScheduleForm';
import swal from 'sweetalert';
import CopySchedule from './CopySchedule';

const date = new Date();
const year = date.getFullYear();

function getStyle(errors, touched, fieldName) {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
      return {
        border: '1px solid red',
        borderLeft: '5px solid red'
      }
    }else if(!getIn(errors, fieldName) && getIn(touched, fieldName)){
      return {
        border: '1px solid green',

      }
    }
}


const ScheduleDetail = (props) => {
    // console.log(props)
    const group = props.location.state;
    // console.log(group)
    const token = props.user.token;
    const date = new Date();
    const [employee, setEmployee] = useState([]);
    const [workShift, setWorkShift] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [workLocation, setWorkLocation] = useState([]);
    const [employeeOption, setEmployeeOption] = useState([]);
    const [workShiftOption, setWorkShiftOption] = useState([]);
    const [workLocationOption, setWorkLocationOption] = useState([]);
    const [month, setMonth] = useState(date.getMonth());
    // const [monthName, setMonthName] = useState();
    const [days, setDays] = useState(getDaysInMonth(year, parseInt(month)));
    const [scheduleOfEmployee, setScheduleOfEmployee] = useState({});
    const [dateOfSchedule, setDateOfSchedule] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isAddOrEdit, setIsAddOrEdit] = useState('');
    const [bulkSchedule, setBulkScheduleIsOpen] = useState(false);
    const [copySchedule, setCopyScheduleIsOpen] = useState(false);
    const [perDateOrAllDate, setPerDateOrAllDate] = useState('per date');
    const [formFields, setFormFields] = useState([]);
    const [initialValues, setInitialValues] = useState({});


    const handleMonthChange = e => {

        setMonth(e.target.value)
        setDays(getDaysInMonth(year, parseInt(e.target.value)))
        


    }

    const closeModal = () => {
        setBulkScheduleIsOpen(false);
    }

    const schedulePerEmployeePerDate = (employeeData, date) => {
        // console.log(`karyawan: ${employeeData}`)
        // console.log(`tanggal diklik: ${date}`)
        setPerDateOrAllDate('per date')
        setIsAddOrEdit('add')
      

        let dayName = date.getDay();
        dayName = nama_hari(dayName);
      
        const day = format_tanggal_indo(date);
        // console.log(day);
        // day = dd+'/'+mm+'/'+yyyy;
        // console.log(day);
        // tampilkan modal
        setScheduleOfEmployee(employeeData);
        setDateOfSchedule(`${dayName}, ${day}`);
        fieldsPerDatePerEmployee[0].options.length = 0;
        fieldsPerDatePerEmployee[0].options.push({key: '-- Pilih Lokasi/Area Kerja --', value: ''});
        fieldsPerDatePerEmployee[1].options.length = 0;
        fieldsPerDatePerEmployee[1].options.push({key: '-- Pilih Jam Kerja / Shift --', value: ''});
        for(let i = 0; i < workLocation.length; i++) {
                    
            const data = {
                key: workLocation[i].name, value: workLocation[i].id
            }
            fieldsPerDatePerEmployee[0].options.push(data);
            
        }
        
        for(let i = 0; i < workShift.length; i++) {
                    
            const data = {
                key: workShift[i].name, value: workShift[i].id
            }
            fieldsPerDatePerEmployee[1].options.push(data);
            
        }
        setFormFields(fieldsPerDatePerEmployee);
        const found = scheduleData.find(el => (el.date === tahun_bulan_tanggal(date) && el.employee_id === employeeData.id));

        setInitialValues({
            employee_id : employeeData.id,
            group_id: group.id,
            date: tanggal_bulan_tahun(date),
            type: 'per date'
        })
      
        if(found){
            // if(found.employee_id === employeeData.id){
                setIsAddOrEdit('edit')
                const work_shift = found.work_shift_id;
                const work_location = found.work_location_id;
                setInitialValues({
                    id : found.id,
                    work_location: work_location,
                    work_shift: work_shift,
                    

                   
                })
               
            // }
        }
        setModalIsOpen(true);

    }
    const schedulePerEmployeeAllDate = (employeeData, days) => {
        setModalIsOpen(true);
        setPerDateOrAllDate('all date')
        setScheduleOfEmployee(employeeData)
        setInitialValues({
            employee_id : employeeData.id,
            group_id: group.id,
            work_location: {},
            work_shift: {},
            type: 'all date'
        })
        // console.log(`tahun : ${year}`)
        // console.log(`bulan : ${month}`)
        // console.log(`id karyawan : ${employeeData}`)
        //tampilkan modal

    }


    const handleBulkSchedule = () => {
        // console.log('tambah banyak')

        setBulkScheduleIsOpen(true)
        let shiftOptions = [];
        workShift.map(shift => {
            shiftOptions.push({
                value: shift.id, label: shift.name
            });
        });
        setWorkShiftOption(shiftOptions)
        let locationOptions = [];
        workLocation.map(location => {
            locationOptions.push({
                value: location.id, label: location.name
            });
        });
        setWorkLocationOption(locationOptions)
        let employeeOptions = [];
        employee.map(employee => {
            employeeOptions.push({
                value: employee.id, label: employee.name
            });
        });
        setEmployeeOption(employeeOptions)
    }
    const handleCopySchedule = () => {
        console.log('copy jadwal')

        setCopyScheduleIsOpen(true)
      
    }

  

    useEffect(() => {


        // get work location
        API.getAllWorkLocation(token).then(res => {
            // console.log(res)
            setWorkLocation(res.data);
           
        }).catch(err => {
            console.log(err.response.data.message)
        })
        // get work shift by grup id
        API.getWorkShiftByTeamGroupID(token, group.id).then(res => {
            // console.log(res)
            setWorkShift(res.data)
           
        }).catch(err => {
            console.log(err.response.data.message)
        })

        // get karyawan by grup id
        API.getEmployeeByTeamGroupID(token, group.id).then(res => {
            // console.log(res.data)
            setEmployee(res.data);

        }).catch(err => {
            console.log(err.response.data.message)
        })

   
   
    }, [])

    const handleSubmit = async data => {
        // console.log(data)
        if(perDateOrAllDate == 'per date') {
            // console.log('panggil api untuk add schedule per date')
            if(isAddOrEdit == 'add'){
               
                API.addSchedule(token, data).then(res => {
                    // console.log(res.data.message);
                    swal({
                        title: res.data.status,
                        text: res.data.message,
                        icon: "success",
                    });
                    setModalIsOpen(false);
                    
                }).catch(err => {
                    // console.log(err.response);
                    swal({
                        title: err.status,
                        text: err.response.data.message,
                        icon: "error",
                    });
                    setModalIsOpen(false)
    
                });
            }else if(isAddOrEdit == 'edit'){
                // console.log('panggil api untuk edit schedule per date')
                // const {id} = initialValues;
            
                // console.log(data)
                API.editSchedule(token, data).then(res => {
                    // console.log(res);
                    swal({
                        title: res.data.status,
                        text: res.data.message,
                        icon: "success",
                    });
                    setModalIsOpen(false);
                }).catch(err => {
                    // console.log(err);
                    swal({
                        title: err.status,
                        text: err.message,
                        icon: "error",
                    });
                    setModalIsOpen(false)
    
                });



            }
            
        }else {
            // console.log(data);
            // console.log('panggil api untuk add schedule all date')
            API.addSchedule(token, data).then(res => {
                // console.log(res.data.message);
                swal({
                    title: res.data.status,
                    text: res.data.message,
                    icon: "success",
                });
                setModalIsOpen(false);
                
            }).catch(err => {
                // console.log(err.response);
                swal({
                    title: err.status,
                    text: err.response.data.message,
                    icon: "error",
                });
                setModalIsOpen(false)

            });

        }
    }
    const handleDeleteSchedule = () => {
        // console.log('delete jadwal in');

        const {id} = initialValues;
        
        // console.log(id);
        API.deleteSchedule(token, id).then(res => {
            // console.log(res);
            swal({
                title: 'Success',
                text: res,
                icon: "success",
              });
            setModalIsOpen(false)

        }).catch(err => {
            console.log(err.response)

        })
    }
    const handleDeleteAllSchedule = () => {
        const employeeID = scheduleOfEmployee.id;
        
        let mnth = parseInt(month) + 1;
        const date = `${year}-${mnth}`;
        // console.log(`delete jadwal di bulan ${date} dari karyawan yang idnya ${employeeID}`);
        API.deleteScheduleEmployeeAtMonth(token, employeeID, date).then(res => {
            // console.log(res)
            // console.log('oke')
            swal({
                title: 'Berhasil',
                text: res.message,
                icon: "success",
              });
            setModalIsOpen(false)
        })

        
    }
    useEffect(() => {
        setHolidays([])
        let mnth = parseInt(month) + 1;
        const date = `${year}-${mnth}`;
        // console.log(date)
        API.getScheduleByTeamGroupID(token, group.id, date).then(res => {
            // console.log(res.data)
            // console.log('oke')
            setScheduleData(res.data);
        }).catch(err => {
            // console.log(err.response.data.message)
            setScheduleData([]);

            // console.log(err)
        })
        API.getHolidaysAtMonth(token, date).then(res => {
            // console.log(res)
            setHolidays(res.data)
        }).catch(err => {
            // console.log(err)
            // console.log('hari libur tidak ditemukan')
            // console.log(err.response.data.message)
        })
    }, [modalIsOpen, month, bulkSchedule])

    const showSchedule = (employeeID, date, type, name = '') => {
        // console.log(date)
        
        const found = scheduleData.find(el => (el.date === date && el.employee_id === employeeID));
        if(found){
            // console.log(employeeID)
            // console.log(found)
            // const infoSchedule = found.find(el => (el.employee_id === employeeID));
            // const location_code = infoSchedule.location_code;
            // const shift_code = infoSchedule.shift_code;
            // console.log(infoSchedule)
            // return found;

            // if(found.employee_id === employeeID){
                // return `${found.location_code} | ${found.shift_code}`;
                if(type === 'table'){
                    // console.log(found);
                    return <div><p className="location-code">{found.location_code}</p><p className="shift-code">{found.shift_code}</p></div>;
                }else if(type === 'select') {
                    
                    if(name === 'work_location'){
                        return `${found.work_location_id}`;
                        // return found.work_location_id;
                    }else if(name === 'work_shift'){
                        return `${found.work_shift_id}`;
                    }else {
                        return '0';
                    }

                }else {
                    return null;
                } 

        }
    }
 

 
    return (
        <>
    
            <PageHeader
                title={`Jadwal ${group.name} | ${group.division}`}
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            
            <Row>
                <Col>
                <Link to='/employee/schedule' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                
                </Col>
            

                <Col style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
    
                    <button onClick={handleBulkSchedule} className="add-button">
                            <Icon icon={iconAdd} color="#fff" />
                            Buat Jadwal

                    </button>
                </Col>
            </Row>
            <Gap height={20} />
            <h4>Shift / Jam Kerja :</h4>
            <Gap height={20} />
            <Row className="wrapper-ket-shift">
                
                {/* {console.log(workShift)} */}
                {
                    workShift.map(shift => (
                        <>
                        <Col className="ket-shift" key={`shift-${shift.code}`}>
                            <div className="icon-ket-shift">
                                <Icon icon={iconWorkingHours} color="#fff" width={50} height={50} />

                            </div>
                            <div className="detail-ket-shift">
                            <p className="judul-ket-shift">{`${shift.code} | ${shift.name}`}</p>
                            
                            <p>Masuk : {shift.default_time_in.substring(0, 5)}</p>
                            <p>Pulang :{shift.default_time_out.substring(0, 5)}</p>
                            <p>Istirahat : {shift.default_time_break_start.substring(0, 5)} - {shift.default_break_duration} Menit</p>
                            
                            </div>
                        </Col>
                  
                       
           
                        </>
                    ))
                }
            </Row>
            <h4>Lokasi / Area Kerja :</h4>

            <Row className="wrapper-ket-location">
                
                {/* {console.log(workLocation)} */}
                {
                    workLocation.map(location => (
                        <>
                        <Col className="ket-location" key={`location-${location.code}`}>
                            {/* <div className="icon-ket-location">
                                <Icon icon={iconWorkingHours} color="#fff" width={50} height={50} />

                            </div> */}
                            <div className="detail-ket-location">
                                <p className="judul-ket-location">{location.code}</p>
                                <p>{location.name}</p>
                        
                            </div>
                        </Col>
                  
                       
           
                        </>
                    ))
                }
            </Row>

            <ScheduleContainer>
        
                
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
                                        if (group.public_holiday_is_off == 1) {
                                            // console.log(holidays)
                                            if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                return 'libur'
                                            }
                                            return apakahHariMinggu(day.getDay()) && 'minggu'
                                        }
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
                                        if (group.public_holiday_is_off == 1) {
                                            // console.log(holidays)
                                            if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                return 'libur'
                                            }
                                            return apakahHariMinggu(day.getDay()) && 'minggu'
                                        }
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
                            employee.length > 1 ? employee.map((e, index) => (
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
                                                if (group.public_holiday_is_off == 1) {
                                                    // console.log(holidays)
                                                    if (holidays.filter(e => e.date === tahun_bulan_tanggal(day)).length > 0) {
                                                        return 'schedule-employee-date hasTooltip libur'
                                                    }
                                                    return apakahHariMinggu(day.getDay()) ? 'schedule-employee-date hasTooltip minggu' : 'schedule-employee-date hasTooltip'
                                                }else {
                                                    return 'schedule-employee-date hasTooltip'
                                                }
                                            })()
                                        }
                                        onClick={() => schedulePerEmployeePerDate(e, day)}>
                                        {
                                            (scheduleData.length >= 1) ? showSchedule(e.id, tahun_bulan_tanggal(day), 'table') : null
                                        }
                                 
                                        <span>Atur Jadwal {e.name} tanggal {format_tanggal_indo(day)}</span>
                                        
                                        </td>

                                    ))}
                                </tr>
                            )) : <tr><td colSpan={2 + days.length} style={{textAlign: 'center'}}>Tidak ada karyawan</td></tr>
                        }
                    </tbody>
                
                    
                </table>
            </ScheduleContainer>
           
            <Gap height={20} />

            {
                (holidays.length > 0) && <div className="keterangan-hari-libur">
                {holidays.map(holiday => (
                    <p>
                        {YMdtoDateMonth(holiday.date)} : 
                        <span>
                        {holiday.name}
                        </span>
                    </p>
                ))}
                </div>
            }
            

            <Gap height={50} />
            <CopySchedule groupID={group.id} token={token} />

            <Modal 
                onRequestClose={() => setModalIsOpen(false)}
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                      },
                    content: {
                        border: '1px solid #222',
                        padding:0,
                        left: '450px',
                        right: '450px',
                        // top: '60px',
                        // bottom: '50px',
                    }
                }}
            >

                <div className="modal-header">
                    <h2 className="modal-title">
                        Atur Jadwal | {perDateOrAllDate == 'per date' ? dateOfSchedule : bulan_indo(month)}
                    </h2>
                    <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues}
                //  validationSchema={employeListValidationSchema}
                 onSubmit={handleSubmit} >
                    {({errors, touched, isValid}) => (
                    <Form>
                <div className="modal-body">
                <h3 align="center">{`${scheduleOfEmployee.name} - ${scheduleOfEmployee.nik}`}</h3>
               
                {perDateOrAllDate == 'per date' ?
                    <>
                        <div className="form-row">
                        <Gap height={30} />
                            {
                                formFields.map(field => (
                                    // console.log(field)
                                    <FormControl key={field.name}
                                        control={field.control}
                                        type={field.type}
                                        label={field.label}
                                        name={field.name}
                                        style={getStyle(errors, touched, field.name)}
                                        options={field.options}
                                        callback={field.callback}
                                    />
                                ))
                            }    
                        </div>  
                        
                    </>
                    :
                    <>
                        <div className="form-row">
                           
                            {days.map((day, index) => (
                                 
                                <div className='form-control' key={`form-${index}`} style={{margin: '10px auto'}}>
                                    <label align="center" htmlFor={day.getDate()}>{nama_hari(day.getDay())}, {format_tanggal_indo(day)}</label>
           
                    
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                    {
                                        <>
                                       <Field name={`work_location[${tahun_bulan_tanggal(day)}]`}>
                                            {({ field }) => {
                                            // const { setFieldValue } = form
                                            // const { value } = field
                                           
                                            return (
                                                <Field as='select' {...field} style={{width: '45%'}} defaultValue={
                                                    (() => {
                                                        if (scheduleData.length >= 1) {
                                                            const schedule = showSchedule(scheduleOfEmployee.id, tahun_bulan_tanggal(day), 'select', 'work_location')
                                                            if(!schedule){
                                                                return '0';
                                                            }else {
                                                                return schedule;
                                                            }
                                                        }else {
                                                            return '0';
                                                        }
                                                    })()
                                                }>
                                                    <option value="0" disabled>
                                                        -- Pilih Lokasi / Area Kerja
                                                    </option>
                                                    {workLocation.map(location => {
                                                        return (
                                                            <option key={location.id} value={location.id}>
                                                            {location.name}
                                                            </option>
                                                        )
                                                    })}
                                                </Field>
                                                
                                            )
                                            }}
                                        </Field>
                                       <Field name={`work_shift[${tahun_bulan_tanggal(day)}]`}>
                                            {({ field, form }) => {
                                            // const { setFieldValue } = form
                                            // const { value } = field
                                            return (
                                                <Field as='select' style={{width: '45%'}} defaultValue={
                                                    (() => {
                                                        if (scheduleData.length >= 1) {
                                                            const schedule = showSchedule(scheduleOfEmployee.id, tahun_bulan_tanggal(day), 'select', 'work_shift')
                                                            if(!schedule){
                                                                return '0';
                                                            }else {
                                                                return schedule;
                                                            }
                                                        }else {
                                                            return '0';
                                                        }
                                                    })()
                                                } {...field} >
                                                <option value="0" disabled>
                                                    -- Pilih Shift / Jam Kerja
                                                </option>
                                                {workShift.map(shift => {
                                                    // console.log(shift)
                                                    return (
                                                        <option key={shift.id} value={shift.id}>
                                                        {shift.name}
                                                        </option>
                                                    )
                                                })}
                                            </Field>
                                                
                                            )
                                            }}
                                        </Field>
                                        </>
                                    }    
                                    
                                    </div>

                                </div>

                            ))}

                     
                        </div>
                    </>
                }
                </div>

                <div className="modal-footer" style={{marginBottom: 'auto'}}>
                        
                        {perDateOrAllDate == 'per date' ? isAddOrEdit === 'edit' && 
                            <div className="delete-button" onClick={handleDeleteSchedule}>Hapus</div> : 
                            <div className="delete-button" onClick={handleDeleteAllSchedule}>Kosongkan Jadwal</div>
                            
                        }
                        <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" 
                        disabled={!isValid || props.isLoading}
                        className={props.isLoading ? 'btnLoading' : null}>Simpan</Button>

                    
                </div>
                </Form>
                    )}
                </Formik>
         
            </Modal>

            <Modal
                onRequestClose={() => setBulkScheduleIsOpen(false)}
                isOpen={bulkSchedule}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                      },
                    content: {
                        border: '1px solid #222',
                        padding:0,
                        left: '450px',
                        right: '450px',
                        // top: '60px',
                        // bottom: '50px',
                    }
                }}
            >
                <div className="modal-header">
                    <h2 className="modal-title">
                        Tambah Banyak Jadwal
                    </h2>
                    <button className="close-modal" onClick={() => setBulkScheduleIsOpen(false)}>X</button>
                </div>
                <div className="modal-body">
                    <div className="form-row">
                        <BulkScheduleForm employeeOptions={employeeOption} locationOptions={workLocationOption} shiftOptions={workShiftOption} token={token} closeModal={closeModal} groupID={group.id} />
                    </div>
                </div>
            </Modal>
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
export default connect(reduxState, reduxDispatch)(ScheduleDetail)