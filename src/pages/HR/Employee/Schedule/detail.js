import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { iconAdd, iconLeft, iconUser } from '../../../../assets';
import { AutoCompleteSelect, Button, Col, FormControl, Gap, Icon, PageHeader, Row } from '../../../../components';
import { Formik, Form, getIn, Field } from 'formik'
import Modal from 'react-modal';
import API from '../../../../config/api';
import { bulan_indo, format_tanggal_indo, getDaysInMonth, nama_hari, tahun_bulan_tanggal, tanggal_bulan_tahun } from '../../../../utils/helpers/date';
import { ScheduleContainer } from './schedule.elements';
import {fieldsPerDatePerEmployee} from './fields'
import BulkScheduleForm from './BulkScheduleForm';
import swal from 'sweetalert';

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


let months = 12;
let monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

let monthOptions = [];
for(let i = 0; i < months; i++) {
    let m = date.getMonth();
    // monthOption += `<option value=${m}>${monthNames[m]}</option>`
    monthOptions.push({
        value: m, name: monthNames[m]
    })
    date.setMonth(date.getMonth() + 1);

}


const ScheduleDetail = (props) => {
    // console.log(props)
    const group = props.location.state;
    const token = props.user.token;
    const [employee, setEmployee] = useState([]);
    const [workShift, setWorkShift] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [schedule, setSchedule] = useState({});
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
    const [perDateOrAllDate, setPerDateOrAllDate] = useState('per date');
    const [formFields, setFormFields] = useState([]);
    const [initialValues, setInitialValues] = useState({});


    const handleMonthChange = value => {

        setMonth(value)
        setDays(getDaysInMonth(year, parseInt(value)))
        


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
                setSchedule(found);
                setIsAddOrEdit('edit')
                const work_shift = found.work_shift_id;
                const work_location = found.work_location_id;
                setInitialValues({
                    schedule_id : found.id,
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

  

    useEffect(() => {
        //populate tahun

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
                console.log('panggil api untuk edit schedule per date')
                const {schedule_id} = initialValues;
                // console.log(schedule);
                console.log(schedule_id);
                console.log(data)



            }
            
        }else {
            console.log('panggil api untuk add schedule all date')

        }
    }
    const handleDeleteSchedule = () => {
        console.log('delete jadwal in');

        const {schedule_id} = initialValues;
        // const {work_location, work_shift} = initialValues;
        // const employeeID = scheduleOfEmployee.id;
        console.log(schedule_id);
    }
    useEffect(() => {
        API.getScheduleByTeamGroupID(token, group.id).then(res => {
            // console.log(res.data)
            // console.log('oke')
            setScheduleData(res.data);
        }).catch(err => {
            console.log(err.response.data.message)
            // console.log(err)
        })
    }, [modalIsOpen])

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

            // }else {
            //     if(type === 'table'){
            //         return null;
            //     }else if(type === 'select') {
            //       return '0';
            //     }else {
            //         return null;
            //     }
            // }
        

            

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
                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={handleBulkSchedule} className="add-button">
                            <Icon icon={iconAdd} color="#fff" />
                            Banyak Jadwal

                </button>
                </Col>
            </Row>
            <Gap height={20} />

            <ScheduleContainer>
                
                
                <table className="schedule-table" style={{overflowX: 'scroll'}}>
                    <thead>
                    <tr>
                        <th rowSpan="3">No.</th>
                        <th rowSpan="3">Nama.</th>
                        <th colSpan={days.length}>
                            <select name="month" onChange={(e) => handleMonthChange(e.target.value)} value={month}>
                                {monthOptions.map(monthOption => (
                                    <option key={monthOption.value} value={monthOption.value}>{monthOption.name}</option>
                                ))}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        {
                            days.map((day, index) => (
                                <td key={index} style={{maxWidth: '3px', overflow: 'hidden', fontSize: '10px'}}>{nama_hari(day.getDay())}</td>
                                // console.log(day.getDay())
                                ))
                                
                            }
                    </tr>
                    
                    <tr>
                        {
                            days.map((day, index) => (
                                <td key={index} style={{maxWidth: '3px', textAlign: 'center', fontSize: '10px'}}>{1 +index}</td>
                                // console.log(day.getDay())
                                ))
                                
                            }
                    </tr>
                    </thead>
                    <tbody>
     
                        {
                            employee.length > 1 ? employee.map((e, index) => (
                                <tr key={e.name}>
                                    <td key={index} style={{textAlign: 'center'}}>{1 + index}</td>
                                    <td className="schedule-employee-name hasTooltip" key={e.id} onClick={() => schedulePerEmployeeAllDate(e, days)}>
                                        {e.name}
                                        <span>Atur Jadwal {e.name} bulan {bulan_indo(month)}</span>

                                    </td>
                                    {days.map((day, index) => (
                                        <td key={index} className="schedule-employee-date hasTooltip" onClick={() => schedulePerEmployeePerDate(e, day)}>
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


            <Row>
            Shift di grup ini : {workShift.length} |
                
                simpan jadwal kerja per karyawan per tanggal(sudah)<br />
                klik jadwal kerja per karyawan per tanggal select option terpilih jadwal sebelumnya ketika jadwal sudah ada(sudah)<br />

                tampil button hapus jadwal kerja per karyawan per tanggal ketika jadwal sudah ada<br />
                API hapus jadwal kerja per karyawan per tanggal<br />
                button ubah jadwal kerja per karyawan per tanggal apabila jadwal sudah ada<br />
                simpan perubahan jadwal kerja per karyawan per tanggal<br />
                simpan jadwal kerja per karyawan semua tanggal di bulan yang dipilih<br />
                simpan jadwal kerja beberapa karyawan dari tanggal a ke tanggal b<br />

                modal duplikat semua jadwal dari tanggal a ke tanggal b <br />
                duplikat semua jadwal dari tanggal a ke tanggal b<br />
 	            cara mendapatkan weekend pada bulan yang dipilih, apabila hari libur tidak masuk <br />
                cara mendapatkan holiday pada bulan yang dipilih, apabila hari libur tidak masuk <br />
            </Row>
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
                                 
                                <div className='form-control' key={index} style={{margin: '10px auto'}}>
                                    <label align="center" htmlFor={day.getDate()}>{nama_hari(day.getDay())}, {format_tanggal_indo(day)}</label>
           
                    
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                    {
                                        <>
                                       <Field name={`work_location[${tanggal_bulan_tahun(day)}]`}>
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
                                       <Field name={`work_shift[${tanggal_bulan_tahun(day)}]`}>
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
                        {isAddOrEdit === 'edit' && 
                            <div className="delete-button" onClick={handleDeleteSchedule}>Hapus</div>
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
                        <BulkScheduleForm employeeOptions={employeeOption} locationOptions={workLocationOption} shiftOptions={workShiftOption} />
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