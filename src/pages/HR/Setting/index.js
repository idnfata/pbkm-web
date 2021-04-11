import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Col, FormControl, Gap, Icon, Row, Table } from '../../../components';
import { iconAdd } from '../../../assets';
import { companyInfoValidationSchema, branchValidationSchema, divisionValidationSchema, positionValidationSchema, workLocationValidationSchema, workShiftValidationSchema, holidayValidationSchema, branchFields, divisionFields, positionFields, teamGroupFields, teamGroupValidationSchema, workLocationFields, workShiftFields, everydayFields, holidayFields, setupOvertimeFields, setupOvertimeValidationSchema, schemaValidationSkemaLembur, setupOvertimeSchemeFields, setupLeaveFields, setupLeaveValidationSchema, setupLoanFields, setupLoanValidationSchema } from './fields';
import API from '../../../config/api';
import { createBranch, editBranch } from '../../../config/redux/action/hr';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Formik, Form, getIn, Field, ErrorMessage } from 'formik'
import HRMenuSetting from './header'
import Modal from 'react-modal';
import swal from 'sweetalert';
import { useDebounce } from '../../../utils/helpers/useDebounce';
import TextError from '../../../components/atoms/Form/TextError';
import TimeInput from '../../../components/atoms/Form/Time';
import TimeField from 'react-simple-timefield';
import { tahun_bulan_tanggal, tanggal_bulan_tahun, YMdToFormatIndo } from '../../../utils/helpers/date';
import SettingBPJS from './bpjs-setting';
import SettingPPh21 from './pph21-setting';

Modal.setAppElement('#root');

const optionPrograms = [
    {
        value: 1, label: "JKK"
    },
    {
        value: 2, label: "JKM"
    },
    {
        value: 3, label: "JHT"
    },
    {
        value: 4, label: "JP"
    },
    {
        value: 5, label: "JKN"
    },
    
];

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

const saveCompanyInfo = () => {
    console.log(`save`);
}




const HRSettingMenu = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const perPageList = [
        {label: "5", value: 5},
        {label: "10", value: 10},
        {label: "25", value: 25},
        {label: "50", value: 50},
    ];
    const [totalTableData, setTotalTableData] = useState(0);
    const [position, setPosition] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const [textEdit, setTextEdit] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageName, setPageName] = useState('Informasi Perusahaan');
    const [location, setLocation] = useState('/setting/company/info');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalSkemaLemburIsOpen, setModalSkemaLemburIsOpen] = useState(false);
    const [setupOvertime, setSetupOvertime] = useState({});
    const [isAddOrEdit, setIsAddOrEdit] = useState('');
    const [isChildDone, setIsChildDone] = useState(false);
    const [PPh21AddOrEdit, setPPh21AddOrEdit] = useState('');
    const [PPh21KPPAddOrEdit, setPPh21KPPAddOrEdit] = useState('');
    const [tableData, setTableData] = useState([]);
    const [overtimeDayType, setOvertimeDayType] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [formFields, setFormFields] = useState([]);
    const [schemaValidation, setSchemaValidation] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [initialValuesCalcMethod, setInitialValuesCalcMethod] = useState({});
    const [initialValuesKPP, setInitialValuesKPP] = useState({});
    const [initialValuesSkemaLembur, setInitialValuesSkemaLembur] = useState({});
    const [divisionID, setDivisionID] = useState(0);
    const [isTimeSameEveryDay, setIsTimeSameEveryDay] = useState(1);
    const [overtimeSchemePaidBy, setOvertimeSchemePaidBy] = useState(0);
    const [increaseLeaveBalance, setIncreaseLeaveBalance] = useState(0);
    const [dataClicked, setDataClicked] = useState({});
    const timeInRef = useRef('');
    const timeOutRef = useRef('');
    const timeBreakStartRef = useRef('');
    const breakDurationRef = useRef('');
    const lateToleranceRef = useRef('');
    // const token = localStorage.getItem('token');
    const token = props.user.token;
    // console.log(props);


   
    const handleChangeTimeIn = (e) => {
        timeInRef.current = e.target.value;

    }

    const handleChangeTimeOut = (e) => {
        timeOutRef.current = e.target.value;
    }

    const handleChangetimeBreakStart = (e) => {
        timeBreakStartRef.current = e.target.value;
    }

    const handleChangeBreakDuration = (e) => {
        breakDurationRef.current = e.target.value;
    }

    const handleChangeLateTolerance = (e) => {
        lateToleranceRef.current = e.target.value;
    }




    const setPageSetting = (e) => {
        e.stopPropagation();
        const link = e.target.getAttribute('data');
        const text = e.target.getAttribute('text');
        // console.log(page)
        setPageName(text);
        setLocation(link);
        
    
    }
    const prevButton = () => {
        setCurrentPage(Number(currentPage - 1));
    }
    const nextButton = () => {
        setCurrentPage(Number(currentPage + 1));        

    }
    const pageNumberClick = (e) => {
        // setCurrentPage(e => e.target.id)
        setCurrentPage(Number(e.target.id));
    }
    const changePerPage = (e) => {
        setPerPage(Number(e.target.value))
    }

    const pageNumbers = [];
    
    let i = 0;
    do {
        i++;
        // console.log(`halaman sekarang,`, i);
        pageNumbers.push(i);
    } while(i < totalPage)

    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <a
            key={number}
            id={number}
            onClick={pageNumberClick}
            className={currentPage == number ? 'active' : ''}
          >
            {number}
          </a>
        );
      });
    // console.log(COLUMNS);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    
    const handleSubmit = async data => {
        // console.log('Form data', data)
        // console.log('Saved data', JSON.parse(JSON.stringify(data)))
        // console.log(data.sendTo);
        switch (pageName) {
            case 'Cabang':
                if(isAddOrEdit == 'add') {
                    props.createBranch(token, data).then(res => {
                        // console.log(res);
                        swal({
                            title: res.status,
                            text: res.message,
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
                }else {
                    // console.log(data.id);
                    props.editBranch(token, data).then(res => {
                        // console.log(res);
                        swal({
                            title: res.status,
                            text: res.message,
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
                break; 
            case 'Departemen':
                if(isAddOrEdit == 'add') {
                    API.addDivision(token, data).then(res => {
                        console.log(res);
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
                }else {
                    // console.log(data.id);
                    API.editDivision(token, data).then(res => {
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
                break;
            case 'Jabatan':
                if(isAddOrEdit == 'add') {
                    API.addPosition(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editPosition(token, data).then(res => {
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
                break;
            case 'Tim/Grup':
                if(isAddOrEdit == 'add') {
                    API.addTeamGroup(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editTeamGroup(token, data).then(res => {
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
                break;
            case 'Lokasi':
                if(isAddOrEdit == 'add') {
                    API.addWorkLocation(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editWorkLocation(token, data).then(res => {
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
                break;
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            case 'Shift':
                if(isAddOrEdit == 'add') {
                    // console.log(data)
                    API.addWorkShift(token, data).then(res => {
                        // console.log(res.data.message);
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editWorkShift(token, data).then(res => {
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
                break;
            case 'Hari Libur':
                // console.log(data.date)
                // console.log(new Date)
                // data.date = tahun_bulan_tanggal(data.date)
                // console.log(data)
                if(isAddOrEdit == 'add') {
                    API.addHoliday(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editHoliday(token, data).then(res => {
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
                break;
            case 'Lembur':
                // console.log('simpan lembur')
                // console.log(data)
                if(isAddOrEdit == 'add') {
                    API.addSetupOvertime(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editSetupOvertime(token, data).then(res => {
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
                break;               
            case 'Cuti':
                // console.log('simpan cuti')
                // console.log(data)
                if(isAddOrEdit == 'add') {
                    API.addSetupLeave(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editSetupLeave(token, data).then(res => {
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
                break;               
            case 'Pinjaman':
                // console.log('simpan pengaturan pinjaman')
                // console.log(data)
                if(isAddOrEdit == 'add') {
                    API.addSetupLoan(token, data).then(res => {
                        // console.log(res.data.message);
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
                }else {
                    // console.log(data);
                    API.editSetupLoan(token, data).then(res => {
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
                break;               
            default:
                break;
        }
     
      
      }
    
    const handleClickSetupLeave = (group_id, group_name, leave_type_id, leave_type_name, values = {}) => {
        // console.log(`group id: ${group_id}`);
        // console.log(`group name: ${group_name}`);
        // console.log(`leave_type_id: ${leave_type_id}`);
        // console.log("data:", values);

        setFormFields(setupLeaveFields)
        setSchemaValidation(setupLeaveValidationSchema)
        setTitle(`Pengaturan ${leave_type_name} | ${group_name}`)

        if(Object.keys(values).length === 0){
            // console.log('tidak ada data, berarti add');
            
            setIsAddOrEdit('add');
            setInitialValues({
                // id: values.id,
                balance: '',
                cannot_leave_before_days: '',
                request_before_day: '',
                allowed_half_day: '',
                is_deduct_meal_allowance: '',
                is_deduct_transport_allowance: '',
                is_showed: '',
                max_duration_per_1_request: '',
                bisa_diuangkan: '',
                rp_per_1_x_cuti: '',
                group_id: group_id,
                leave_type_id: leave_type_id,

            
            });
            
        }else {
            // console.log('ada data, berarti edit');
            setIsAddOrEdit('edit');
            // console.log("data:", values);

            
            setInitialValues({
                id: values.setup_leave_id,
                balance: values.balance,
                cannot_leave_before_days: values.cannot_leave_before_days,
                request_before_day: values.request_before_day,
                allowed_half_day: String(values.allowed_half_day),
                bisa_diuangkan: String(values.bisa_diuangkan),
                rp_per_1_x_cuti: values.rp_per_1_x_cuti,
                is_deduct_meal_allowance: String(values.is_deduct_meal_allowance),
                is_deduct_transport_allowance: String(values.is_deduct_transport_allowance),
                is_showed: String(values.is_showed),
                max_duration_per_1_request: values.max_duration_per_1_request,

            
            });
            // setModalIsOpen(true);
        }
        setModalIsOpen(true)

    }
    
    const handleSubmitSkemaLembur = async data => {
        // console.log('simpan skema lembur')
        // console.log('Form data', data)
        // console.log(data)
        if(isAddOrEdit == 'add') {
            API.addOvertimeSchemes(token, data).then(res => {
                // console.log(res.data.message);
                swal({
                    title: res.data.status,
                    text: res.data.message,
                    icon: "success",
                });
                setModalSkemaLemburIsOpen(false);

                
            }).catch(err => {
                // console.log(err);
                swal({
                    title: err.status,
                    text: err.message,
                    icon: "error",
                });
                setModalSkemaLemburIsOpen(false);


            });
        }else {
            // console.log(data);
            API.editOvertimeSchemes(token, data).then(res => {
                // console.log(res);
                swal({
                    title: res.data.status,
                    text: res.data.message,
                    icon: "success",
                });
                setModalSkemaLemburIsOpen(false);

            }).catch(err => {
                // console.log(err);
                swal({
                    title: err.status,
                    text: err.message,
                    icon: "error",
                });
                setModalSkemaLemburIsOpen(false);


            });
        }

    }

    const handleAdd = () => {
        //ini untuk set initial values dari form
        switch (pageName) {
            case 'Cabang':
                setIsAddOrEdit('add');
                setInitialValues({
                    code: '',
                    name: '',
                    longitude: '',
                    latittude: '',
                    payroll_start_date: '',
                    type: '',
                })
                setModalIsOpen(true)
          
                break; 
            case 'Departemen':
                setIsAddOrEdit('add');
                setInitialValues({
                    code: '',
                    name: '',
                })
                setModalIsOpen(true)
          
                break;
            case 'Jabatan':
                  setIsAddOrEdit('add');
                  setInitialValues({
                    name: '',
                    gaji_pokok: '',
                    tunjangan_jabatan: '',
                    tunjangan_makan: '',
                    tunjangan_transport: '',
                    tunjangan_pajak: '',
                    tunjangan_telekomunikasi: '',
                    insentif: '',
                    thr: '',
                })
                setModalIsOpen(true)
          
                break;
            case 'Tim/Grup':
                setIsAddOrEdit('add');
                setInitialValues({
                    division_id: '',
                    name: '',
                    approver_1: '',
                    approver_2: '',
                    public_holiday_is_off: '',
                    work_day_in_week: '',
                   
                })
                setModalIsOpen(true)
          
                break;
            case 'Lokasi':
                setIsAddOrEdit('add');
                setInitialValues({
                    name: '',
                    longitude: '',
                    latittude: '',
                    radius_attendance: '',
                   
                })
                setModalIsOpen(true)
          
                break;
            case 'Shift':
                workShiftFields[0].control = "select";
                workShiftFields[1].control = "select";
                
                
                // console.log(isTimeSameEveryDay)
                setIsAddOrEdit('add');
                setInitialValues({
                    division_id: '',
                    group_id: '',
                    name: '',
                    is_time_same_every_day: `${isTimeSameEveryDay}`,
                    effective_from_date: '',
                    default_time_in: '',
                    default_time_out: '',
                    default_time_break_start: '',
                    default_late_tolerance: '',
                    default_break_duration: '',
                    
                   
                })
                setModalIsOpen(true)
          
                break;
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            
            case 'Hari Libur':
                setIsAddOrEdit('add');
                setInitialValues({
                    name: '',
                    date: '',
                    type: ''
                   
                })
                setModalIsOpen(true)
          
                break;
            default:
                break;
        }
    }

    const handleEdit = (row) => {
        console.log(row);
        //ini untuk set initial values form untuk edit supaya terisi formnya
        switch (pageName) {
            case 'Cabang':
                // console.log(`edit data ${pageName} dengan id, ${row.id}`)
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    code: row.code,
                    name: row.name,
                    longitude: row.longitude,
                    latittude: row.latittude,
                    payroll_start_date: row.payroll_start_date,
                    type: row.type
                })
                setModalIsOpen(true)
                break; 
            case 'Departemen':                
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    code: row.code,
                    name: row.name,
                })
                setModalIsOpen(true)
                break;
            case 'Jabatan':
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    division_id: row.division_id,
                    name: row.name,
                    gaji_pokok: row.gaji_pokok,
                    tunjangan_jabatan: row.tunjangan_jabatan,
                    tunjangan_makan: row.tunjangan_makan,
                    tunjangan_transport: row.tunjangan_transport,
                    tunjangan_pajak: row.tunjangan_pajak,
                    tunjangan_telekomunikasi: row.tunjangan_telekomunikasi,
                    insentif: row.insentif,
                    thr: row.thr,
                });
                setModalIsOpen(true);

                break;
            case 'Tim/Grup':
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    division_id: row.division_id,
                    name: row.name,
                    approver_1: row.approver_1,
                    approver_2: row.approver_2,
                    public_holiday_is_off: String(row.public_holiday_is_off),
                    work_day_in_week: row.work_day_in_week,

                
                });
                setModalIsOpen(true);
            case 'Status Kerja':
                console.log('Call API add Status Kerja');
                break;
            case 'Lokasi':
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    group_id: row.group_id,
                    name: row.name,
                    longitude: row.longitude,
                    latittude: row.latittude,
                    radius_attendance: row.radius_attendance,
                
                });
                setModalIsOpen(true);
                break;
            case 'Shift':
                setIsAddOrEdit('edit');
                // console.log(row)
                // workShiftFields.splice(0, 2)
                // console.log(workShiftFields)
                workShiftFields[0].control = "hidden";
                workShiftFields[1].control = "hidden";
                setTextEdit(` | ${row.group_name}`)
                setIsTimeSameEveryDay(row.is_time_same_every_day)
                setInitialValues({
                    id: row.id,
                    name: row.name,
                    division_id: `${row.division_id}`,
                    group_id: `${row.group_id}`,
                    is_time_same_every_day: `${row.is_time_same_every_day}`,
                    effective_from_date: new Date(row.effective_from_date),
                    default_time_in: row.default_time_in,
                    default_time_out: row.default_time_out,
                    default_time_break_start: row.default_time_break_start,
                    default_late_tolerance: row.default_late_tolerance,
                    default_break_duration: row.default_break_duration,

                    monday_time_in: row.monday_time_in,
                    monday_time_out: row.monday_time_out,
                    monday_time_break_start: row.monday_time_break_start,
                    monday_late_tolerance: row.monday_late_tolerance,
                    monday_break_duration: row.monday_break_duration,

                    tuesday_time_in: row.tuesday_time_in,
                    tuesday_time_out: row.tuesday_time_out,
                    tuesday_time_break_start: row.tuesday_time_break_start,
                    tuesday_late_tolerance: row.tuesday_late_tolerance,
                    tuesday_break_duration: row.tuesday_break_duration,

                    wednesday_time_in: row.wednesday_time_in,
                    wednesday_time_out: row.wednesday_time_out,
                    wednesday_time_break_start: row.wednesday_time_break_start,
                    wednesday_late_tolerance: row.wednesday_late_tolerance,
                    wednesday_break_duration: row.wednesday_break_duration,

                    thursday_time_in: row.thursday_time_in,
                    thursday_time_out: row.thursday_time_out,
                    thursday_time_break_start: row.thursday_time_break_start,
                    thursday_late_tolerance: row.thursday_late_tolerance,
                    thursday_break_duration: row.thursday_break_duration,

                    friday_time_in: row.friday_time_in,
                    friday_time_out: row.friday_time_out,
                    friday_time_break_start: row.friday_time_break_start,
                    friday_late_tolerance: row.friday_late_tolerance,
                    friday_break_duration: row.friday_break_duration,

                    saturday_time_in: row.saturday_time_in,
                    saturday_time_out: row.saturday_time_out,
                    saturday_time_break_start: row.saturday_time_break_start,
                    saturday_late_tolerance: row.saturday_late_tolerance,
                    saturday_break_duration: row.saturday_break_duration,
                    
                    sunday_time_in: row.sunday_time_in,
                    sunday_time_out: row.sunday_time_out,
                    sunday_time_break_start: row.sunday_time_break_start,
                    sunday_late_tolerance: row.sunday_late_tolerance,
                    sunday_break_duration: row.sunday_break_duration,
                
                });
                
               
                setModalIsOpen(true);
                break;
            case 'Hari Libur':
                setIsAddOrEdit('edit');
                setInitialValues({
                    id: row.id,
                    name: row.name,
                    date: row.date,
                    type: row.type,
                   
                })
                setModalIsOpen(true);
            
                break;
            case 'Pinjaman':
                setFormFields(setupLoanFields)
                setSchemaValidation(setupLoanValidationSchema)
                setTitle(`Pengaturan Pinjaman | ${row.group_name}`)
                if(row.setup_loan_id){
                    // console.log('edit');
                    setIsAddOrEdit('edit');
                    
                    setInitialValues({
                        id: row.setup_loan_id,
                        max_loan: row.max_loan,
                    })
                    setModalIsOpen(true);
                }else {
                    // console.log('add');
                    setIsAddOrEdit('add');
                    setInitialValues({
                        // id: row.id,
                        group_id: row.group_id,
                        max_loan: '',
                    })
                    setModalIsOpen(true);
                }
                
            
                break;
            default:
                break;
        }
    }

    const pengaturanDasarLembur = (group) => {
        // setModalLemburIsOpen(true);
        
        API.getSetupOvertime(token, group.id).then(res => {
            // console.log(res.data)
            setIsAddOrEdit('edit');

            setSetupOvertime(res.data)

            setInitialValues({
                id: res.data.id,
                is_allowed_overtime_before: res.data.is_allowed_overtime_before,
                is_allowed_overtime_after: res.data.is_allowed_overtime_after,
                overtime_limit_per_day: res.data.overtime_limit_per_day,
                overtime_limit_per_week: res.data.overtime_limit_per_week,
                overtime_limit_per_month: res.data.overtime_limit_per_month
            })
            // console.log(initialValues)
            setModalIsOpen(true);

        }).catch(err => {
            // console.log(err)
            setIsAddOrEdit('add');

            setInitialValues({
                group_id: group.id,
                is_allowed_overtime_before: '0',
                is_allowed_overtime_after: '0',
                overtime_limit_per_day: '',
                overtime_limit_per_week: '',
                overtime_limit_per_month: ''
            })
            setModalIsOpen(true);

         
        })
        setTitle(`Kelola Batas Lembur | ${group.name}`)
        // console.log(`tampilkan pengaturan pengaturanDasar lembur group id ${group.id}`)
    }

    const inputanPerSekaliLembur  =
    {
        control: 'format-number',
        label: 'Dibayarkan : ',
        name: 'fix_rate',
        className: 'input'
    };
    const inputanFixRateDikaliJumlahJam  =
        {
            control: 'format-number',
            label: 'Setiap 1 Jam Dibayar : ',
            name: 'fix_rate',
            className: 'input'
        };

    const inputanHarusMemenuhiJam = {
        control: 'input',
        label: 'Dengan Syarat Lembur Tidak Kurang Dari',
        name: 'min_hours_to_inc_leave_balance',
        type: 'number',
        placeholder: '... Jam'
    }

    const inputanMenambahJatahCuti = {
        control: 'radio',
        options:  [
                    { key: 'Ya', value: '1' },
                    { key: 'Tidak', value: '0' },
                    
                ],
        type: 'radio',
        label: 'Bisa Memilih Uang Atau Tambah Jatah Cuti?',
        name: 'can_increase_leave_balance'
    };

    const skemaUpahLembur = (group, overtime_day_type) => {
        
        // console.log(`atur skema lembur group id : ${group.id} dan lembur di hari ${overtime_day_type.id}`)
        // setDataClicked({group: group, overtime_day_type: overtime_day_type})

        //check apakah sudah ada pengaturan skema lembur untuk grup dan jenis hari lembur yang dipilih 
        //apabila tidak ada berarti add
        //apabila ada berarti edit
        let overtimeSchemesFields = setupOvertimeSchemeFields.filter((item, i, ar) => ar.indexOf(item) === i);
        API.getOvertimeSchemes(token, group.id, overtime_day_type.id).then(res => {
            // console.log(res.data)
            
            
           
            // console.log(initialValuesSkemaLembur)
        
            if(res.data.paid_per == '1'){
                // console.log('hilangkan inputan dengan name fix_rate');

            }else if(res.data.paid_per == '2'){

                overtimeSchemesFields.splice(1, 0, inputanPerSekaliLembur)
                // console.log('tampilkan inputan dengan name fix_rate');

            }else if(res.data.paid_per == '3'){

                overtimeSchemesFields.splice(1, 0, inputanFixRateDikaliJumlahJam)
                // console.log('tampilkan inputan dengan name fix_rate');


            }
            overtimeSchemesFields.push(inputanMenambahJatahCuti)
            overtimeSchemesFields[overtimeSchemesFields.length - 1].callback = null;      
            overtimeSchemesFields[overtimeSchemesFields.length - 1].callback = (value) => {
                // console.log(`lembur menambah jatah cuti : ${value}`);
                setIncreaseLeaveBalance(value)
                
            }
            if(res.data.can_increase_leave_balance == '1'){
                overtimeSchemesFields.push(inputanHarusMemenuhiJam)

            }
    
            //jika yang dipilih adalah skema upah lembur sesuai peraturan pemerintah
            setIsAddOrEdit('edit');
            setInitialValuesSkemaLembur({
                id: res.data.id,
                paid_per: `${res.data.paid_per}`,
                fix_rate: res.data.fix_rate,
                can_increase_leave_balance: `${res.data.can_increase_leave_balance}`,
                min_hours_to_inc_leave_balance: res.data.min_hours_to_inc_leave_balance,
                
            })
            // setOvertimeSchemePaidBy(res.data.paid_per);
            // setIncreaseLeaveBalance(res.data.can_increase_leave_balance);
            
            setModalSkemaLemburIsOpen(true);


        }).catch(err => {
            // console.log(err)
            // console.log('add')
            setIsAddOrEdit('add');
            setOvertimeSchemePaidBy(0)
            setIncreaseLeaveBalance(0)

            setInitialValuesSkemaLembur({
                group_id: group.id,
                overtime_day_types: overtime_day_type.id,
                paid_per: '',
            })
            setModalSkemaLemburIsOpen(true);


         
        })


        setTitle(`Skema Upah Lembur di ${overtime_day_type.name} | ${group.name}`)
        overtimeSchemesFields[0].callback = null;
        overtimeSchemesFields[0].callback = (value) => {
            // console.log(`lemburnya dibayar dengan : ${value}`);
            setOvertimeSchemePaidBy(value)
            
        }
        

        //fields 
       setFormFields(overtimeSchemesFields)
       

    }


    //inputan skema upah lmebur
    useEffect(() => {
        // console.log(dataClicked);
        let overtimeSchemesFields = setupOvertimeSchemeFields.filter((item, i, ar) => ar.indexOf(item) === i);

        // console.log(setupOvertimeSchemeFields)
        // console.log(increaseLeaveBalance);
        // console.log(overtimeSchemePaidBy)
    

         if(overtimeSchemePaidBy === '1'){
            // console.log('fix_rate = 1')

          

        }else if(overtimeSchemePaidBy === '2') {
            // console.log('tampilkan inputan fix_rate ')
            overtimeSchemesFields.push(inputanPerSekaliLembur)

            // overtimeSchemesFields.push(inputanBesaran);
            // setFormFields(overtimeSchemesFields)


        }else if(overtimeSchemePaidBy === '3'){
            // console.log('tampilkan inputan fix_rate untk jam ')
            overtimeSchemesFields.push(inputanFixRateDikaliJumlahJam)


        }else {

            // console.log('fix_rate = 1')
            // overtimeSchemesFields.push(inputanBesaran);
            // setFormFields(overtimeSchemesFields)
        }
        
        overtimeSchemesFields.push(inputanMenambahJatahCuti)
        overtimeSchemesFields[overtimeSchemesFields.length - 1].callback = null;      
        overtimeSchemesFields[overtimeSchemesFields.length - 1].callback = (value) => {
            // console.log(`lembur menambah jatah cuti : ${value}`);
            setIncreaseLeaveBalance(value)
            
        }

        //jika lembur menambah jatah cuti
        if(increaseLeaveBalance === '1'){
            overtimeSchemesFields.push(inputanHarusMemenuhiJam)

            // console.log('tambah inputan jam lembur agar bisa memilih untuk menambah cuti')
        }
        setFormFields(overtimeSchemesFields)


    }, [overtimeSchemePaidBy, increaseLeaveBalance])

    const handleDetailShift = row => {
        console.log(row);
    }

    const handleDelete = (row) => {
        setLoading(true);
        // console.log(`delete data ${pageName} dengan id, ${row.id}`)
        switch (pageName) {
            case 'Cabang':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this branch!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Departemen');

                        return API.deleteBranch(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Cabang berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call branch Data lagi');
                            //apa supaya tertriger use effectnya
                            API.getBranch(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data branch');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break; 
            case 'Departemen':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this departement!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Departemen');
                        return API.deleteDivision(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Departemen berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call division Data lagi');
                            API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data branch');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
    
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break;
            case 'Jabatan':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this position!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Jabatan');

                        return API.deletePosition(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Jabatan berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call division Data lagi');
                            API.getPosition(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data division');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break;
            case 'Tim/Grup':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this data!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Jabatan');

                        return API.deleteTeamGroup(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Tim/Grup berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call division Data lagi');
                            API.getTeamGroup(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data team/group');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err.response.data.message);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break;
            case 'Status Kerja':
                console.log('Call API delete Status Kerja');
                break;
            case 'Lokasi':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this branch!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Departemen');

                        return API.deleteWorkLocation(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Lokasi/area kerja berhasil dihapus!',
                                icon: "success",
                              });
                            // console.log('call branch Data lagi');
                            //apa supaya tertriger use effectnya
                            API.getWorkLocation(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data work locations');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break; 
            case 'Shift':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this branch!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Departemen');

                        return API.deleteWorkShift(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Shift berhasil dihapus!',
                                icon: "success",
                              });
                            // console.log('call branch Data lagi');
                            //apa supaya tertriger use effectnya
                            API.getWorkShift(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data work locations');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break; 
            case 'Hari Libur':
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this holiday!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        // console.log('Call API delete Departemen');
                        return API.deleteHoliday(token, row.id).then(res => {
                            swal({
                                title: 'Berhasil',
                                text: 'Hari Libur berhasil dihapus',
                                icon: "success",
                              });
                            // console.log('call division Data lagi');
                            API.getHoliday(token, currentPage, perPage, searchTerm).then((res) => {
                                setTableData(res.data.data)
                                setTotalPage(res.data.last_page);
                                setTotalTableData(res.data.total);
                                setPosition((currentPage - 1) * perPage)
                                setMessage('success get data holiday');
                                setLoading(false);
                            }).catch(err => {
                                // console.log(err.response.data.message);
                                setTableData(0)
                                setMessage(err.response.data.message);
                                setLoading(false);

                            })
    
                        }).catch(err => {
                            console.log(err);
                            setLoading(false);
                        })
                    }
                    else {
                    //   swal("Your imaginary file is safe!");
                      setLoading(false);

                    }
                  });
                break;
        
            default:
                break;
        }
    
    }

    const branchColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Kode', accessor: 'code'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Longitude', accessor: 'longitude'},
        {Header: 'Latittude', accessor: 'latittude'},
        {Header: 'Tanggal Payroll', accessor: 'payroll_start_date'},
        {Header: 'Jenis', accessor: 'type'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];
    const holidayColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Nama', accessor: 'name'},
        // {Header: 'Tanggal', accessor: 'date'},
        {Header: 'Tanggal',
            Cell: row => (
                <>
                    {row.row.original.date && YMdToFormatIndo(row.row.original.date)}
                </>
            )
        },
        {Header: 'Jenis', accessor: 'type'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];

    const overtimeColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Group Kerja', accessor: 'name'},
        // {Header: 'Lembur Sebelum Shift',
        //     Cell: (row) => {
        //         console.log(row.row.original)
        //         return <div>Boleh atau Tidak</div>;
        //     }
        // },
        // {Header: 'Lembur Setelah Shift', accessor: 'is_allowed_overtime_after'},
        // {Header: 'Batas Per Hari', accessor: 'overtime_limit_per_day'},
        // {Header: 'Batas Per Minggu', accessor: 'overtime_limit_per_week'},
        // {Header: 'Batas Per Bulan', accessor: 'overtime_limit_per_month'},

        {Header: 'Pengaturan Dasar',
            Cell: row => (
                <div align="center">
                    <button className="add-button" onClick={() => {pengaturanDasarLembur(row.row.original)}}>Lihat</button> 
                    {/* <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>  */}
                </div>
            )
        },
        {Header: 'Skema Upah',
            Cell: row => (
                <div align="center">
                {overtimeDayType.map(data => (
                    <button key={data.name} className="detail-button" onClick={() => {skemaUpahLembur(row.row.original, data)}}>{data.name}</button> 
                ))}
                </div>
                // <div>
                    // <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button> 
                // </div>

            )
            
        },
    ];

    const leaveColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Group Kerja', accessor: 'group_name'},
        // {Header: 'Aksi',
        //     Cell: row => (
        //         <div className="edit-delete-wrapper">
        //             <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
        //             {/* <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button> */}
        //         </div>
        //     )
        // },
    ];

    const loanColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Group Kerja', accessor: 'group_name'},
        {Header: 'Max. Pinjaman', accessor: 'max_loan',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Atur</button> 
                    {/* <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button> */}
                </div>
            )
        },
    ];
    const divisionColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Kode', accessor: 'code'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];
    const positionColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        // {Header: 'Departemen', accessor: 'division'},
        {Header: 'Nama', accessor: 'name'},
        {Header: 'Gaji Pokok', accessor: 'gaji_pokok',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Tunjangan Jabatan', accessor: 'tunjangan_jabatan',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Tunjangan Makan', accessor: 'tunjangan_makan',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Tunjangan Transport', accessor: 'tunjangan_transport',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Tunjangan Pajak', accessor: 'tunjangan_pajak',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Tunjangan Telekomunikasi', accessor: 'tunjangan_telekomunikasi',
            Cell : row => <NumberFormat value={row.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={false}  prefix={'Rp. '} />
        },
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];

    const teamGroupColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                // console.log(row);
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        {Header: 'Departemen', accessor: 'division'},
        {Header: 'Nama Tim/Grup Kerja', accessor: 'name'},
        {Header: 'Yang Menyetujui Izin/Cuti 1', accessor: 'approver_1_position_name'},
        {Header: 'Yang Menyetujui Izin/Cuti 2', accessor: 'approver_2_position_name'},
        {Header: 'Yang Menyetujui 1', accessor: 'approver_1', show: false},
        {Header: 'Yang Menyetujui 2', accessor: 'approver_2', show: false},
        {Header: 'Minggu / Tanggal Merah', accessor: 'public_holiday_is_off',
                Cell: (row) => {
                    // console.log(row.cell.row.original.public_holiday_is_off)
                    const hariLibur = row.cell.row.original.public_holiday_is_off;
                    //jika nilainya 1, libur, jika 0, masuk
                    return <div>{hariLibur ? 'Libur' : 'Masuk'}</div>;
                    // return <div>{row.cell.row.index+1}.</div>;
                    
                }
        },
        {Header: 'Hari Kerja / Minggu', accessor: 'work_day_in_week'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];

    const workLocationColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                console.log(row);
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        // {Header: 'Departemen', accessor: 'division'},
        {Header: 'Nama Lokasi', accessor: 'name'},
        {Header: 'Kode Lokasi', accessor: 'code'},
        {Header: 'Longitude', accessor: 'longitude'},
        {Header: 'Latittude', accessor: 'latittude'},
        {Header: 'Radius Absensi', accessor: 'radius_attendance'},
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];

    const workShiftColumns = [
        {Header: 'No',
            Cell: (row) => {
                // console.log(row)
                // console.log(row.cell.row.index)
                let startFrom = position + 1;
                return <div>{startFrom +row.cell.row.index}.</div>;
                // console.log(row);
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Id', accessor: 'id', show: false},
        // {Header: 'Departemen', accessor: 'division'},
        {Header: 'Nama Tim/Grup Kerja', accessor: 'group_name'},
        {Header: 'Nama Shift', accessor: 'name'},
        {Header: 'Kode Shift', accessor: 'code'},
        {Header: 'Toleransi Telat (default)', accessor: 'default_late_tolerance',
            Cell: (row) => {
                return `${row.cell.row.original.default_late_tolerance} Menit`;
            }
        },
        {Header: 'Durasi Istirahat (default)', accessor: 'default_break_duration',
            Cell: (row) => {
                return `${row.cell.row.original.default_break_duration} Menit`;
            }
        },
        {Header: 'Waktu Istirahat & Kerja', accessor: 'is_time_same_every_day',
            Cell: (row) => {
                // console.log(row.cell.row.original.is_time_same_every_day)
                const isTimeSameEveryday = row.cell.row.original.is_time_same_every_day;
                return <div className="tooltip">
                        <button className="detail-button" onClick={() => {handleDetailShift(row.row.original)}}>
                            {isTimeSameEveryday ? 'Sama Setiap Harinya' : 'Tidak Menentu'}
                        </button>
                        <span className="tooltiptext">Lihat Detail</span>
                    </div>;
                // return <div>{row.cell.row.index+1}.</div>;
                
            }
        },
        {Header: 'Berlaku Mulai', accessor: 'effective_from_date'},

        
        {Header: 'Aksi',
            Cell: row => (
                <div className="edit-delete-wrapper">
                    <button className="edit-button" onClick={() => {handleEdit(row.row.original)}}>Edit</button> 
                    <button className="delete-button" onClick={() => {handleDelete(row.row.original)}}>Delete</button>
                </div>
            )
        },
    ];

    const payrollComponentColumns = [

    ];

    const reloadPage = () => {
        // console.log(tes)
        setIsChildDone(!isChildDone);
        // console.log(isChildDone)
    }
    useEffect(() => {
        setLoading(true);
        setCurrentPage(currentPage);
        // setSearchTerm('');
        setTotalTableData(0);
        
       

        switch (pageName) {
            // case 'Perusahaan':
            //     setPageName("Informasi Perusahaan")
            case 'Informasi Perusahaan':
                API.getAllOvertimeDayTypes(token).then((res) => {
                    // console.log(res.data)
                    setOvertimeDayType(res.data);
                })
                // setTableColumns(columnsCompanyInfo)
                setInitialValues({
                    name: '',
                    description: '',
                    email: '',
                    telp: '',
                    website: '',
                    logo: ''
                })
                setSchemaValidation(companyInfoValidationSchema)
                // console.log(`request ke : ${pageName}`)
                break;
            case 'Cabang':
                setTotalPage(0);
                setTableColumns(branchColumns);
                setFormFields(branchFields)
                setSchemaValidation(branchValidationSchema)
                
                API.getBranch(token, currentPage, perPage, searchTerm).then((res) => {
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data branch');
                    setLoading(false);
                }).catch(err => {
                    console.log(err.response.data.message);
                    setTableData(0)
                    setMessage(err.response.data.message || 'Belum ada cabang');
                    setLoading(false);
                })
                break;
            case 'Departemen':
                setTotalPage(0);
                setTableColumns(divisionColumns);
                setFormFields(divisionFields)
                setSchemaValidation(divisionValidationSchema)
                API.getDivision(token, currentPage, perPage, searchTerm).then((res) => {
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data division');
                    setLoading(false);
                }).catch(err => {
                    console.log(err.response.data.message);
                    setTableData(0);
                    setMessage(err.response.data.message || 'Data tidak ditemukan');
                    setLoading(false);
                })
                break;
            case 'Jabatan':
                // console.log(`request ke : ${pageName}`)
                //dapatkan divisi
                // API.getDivision(token).then((res) => {
                    //apabila ada data divisi
                    // console.log('departemen ditemukan');
                    setTotalPage(0);
                    setTableColumns(positionColumns);
                    // const division = res.data.data;
                    // console.log(division);
                 
                    //masukkan data divisi ke inputan departemen
                    //hapus dulu semua pilihan inputan departemen, kecuali yang -- pilih departemen --
                    // positionFields[0].options.length = 1;
                    // console.log(positionFields[0].options);
                    //masukkan data divisi ke pilihan inputannya
                    // for(let i = 0; i < division.length; i++) {
                    //     const dataDivisi = {
                    //         key: division[i].name, value: division[i].id
                    //     }
                    //     positionFields[0].options.push(dataDivisi);
                    // }

                  
                    // console.log(positionFields[0].options);

                    // console.log(positionFields);
                    setFormFields(positionFields)
                    setSchemaValidation(positionValidationSchema)
                    API.getPosition(token, currentPage, perPage, searchTerm).then((res) => {
                        // console.log(res);
                        setTableData(res.data.data)
                        setTotalPage(res.data.last_page);
                        setTotalTableData(res.data.total);
                        setPosition((currentPage - 1) * perPage)
                        setMessage('success get data position');
                        setLoading(false);
                    }).catch(err => {
                        // console.log(err.response.data.message);
                        // console.log(err);
                        setTableData(0);
                        setMessage(err.response.data.message || 'Jabatan tidak ditemukan');
                        
                        setLoading(false);
                    })
                // }).catch(err => {
                    //apabila tidak ada divisi
                    // console.log(err.response.data.message);
                    // setMessage('Tambahkan departemen terlebih dahulu');
                // })
                break;
            case 'Tim/Grup':
                // console.log(`request ke : ${pageName}`)
                setFormFields(teamGroupFields)

                API.getDivision(token, 1, 1000).then((res) => {
                    //apabila ada data divisi
                    // console.log('departemen ditemukan');
                    const dataDepartemen = res.data.data;
                    // console.log(dataDepartemen);
                    teamGroupFields[0].options.length = 1;
                    for(let i = 0; i < dataDepartemen.length; i++) {
                        
                        const departemen = {
                            key: dataDepartemen[i].name, value: dataDepartemen[i].id
                        }
                        teamGroupFields[0].options.push(departemen);
                   
                        
                    }
                    // teamGroupFields[0].callback = null;
                    // teamGroupFields[0].callback = (value) => {
                        // console.log(`id departemen : ${value}`);
                        // setDivisionID(selectedDivision);
                        // return value;
                    // }
                    //dapatkan jabatan
                    API.getPosition(token, 1, 1000).then((res) => {
                        // console.log(res);
                        //apabila ada data jabatan
                        const data = res.data.data;
                        // console.log('jabatan ditemukan');
                        setTotalPage(0);
                        setTableColumns(teamGroupColumns);
                    
                        //masukkan data divisi ke inputan departemen
                        //hapus dulu semua pilihan inputan departemen, kecuali yang -- pilih departemen --
                
                        teamGroupFields[2].options.length = 1;
                        teamGroupFields[3].options.length = 1;
                        // console.log(teamGroupFields[0].options);
                        //masukkan data jabatan ke pilihan inputannya
                        for(let i = 0; i < data.length; i++) {
                        
                            const dataJabatan = {
                                key: data[i].name, value: data[i].id
                            }
                            teamGroupFields[2].options.push(dataJabatan);
                            teamGroupFields[3].options.push(dataJabatan);
                            
                        }

                        
                        // console.log(teamGroupFields[2].options);

                        // console.log(teamGroupFields);
                        setFormFields(teamGroupFields)
                        setSchemaValidation(teamGroupValidationSchema)
                        API.getTeamGroup(token, currentPage, perPage, searchTerm).then((res) => {
                            // console.log(res);
                            setTableData(res.data.data)
                            setTotalPage(res.data.last_page);
                            setTotalTableData(res.data.total);
                            setPosition((currentPage - 1) * perPage)
                            setMessage('success get data team/group');
                            setLoading(false);
                        }).catch(err => {
                            // console.log(err.response.data.message);
                            // console.log(err);
                            setTableData(0);
                            setMessage(err.response.data.message || 'Tim/Grup tidak ditemukan');
                            
                            setLoading(false);
                        })
                    }).catch(err => {
                        setTableData(0);

                        //apabila tidak ada divisi
                        console.log(err.response.data.message);
                        setMessage(err.response.data.message || 'Tambahkan jabatan terlebih dahulu');
                    })
                }).catch(err => {
                    setTableData(0);

                    // apabila tidak ada divisi
                    // console.log(err);
                    console.log(err.response.data.message);
                    setMessage(err.response.data.message || 'Tambahkan departemen terlebih dahulu');
                })
                break;
            case 'Lokasi':
                 // console.log(`request ke : ${pageName}`)
                //dapatkan team-gruop
                setTotalPage(0);
                setTableColumns(workLocationColumns);
                setFormFields(workLocationFields)
                setSchemaValidation(workLocationValidationSchema)
                API.getWorkLocation(token, currentPage, perPage, searchTerm).then((res) => {
                    // console.log(res);
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data work location');
                    setLoading(false);
                }).catch(err => {
                    // console.log(err.response.data.message);
                    // console.log(err);
                    setTableData(0);
                    setMessage(err.response.data.message || 'Lokasi kerja tidak ditemukan');
                    
                    setLoading(false);
                })
                break;
            case 'Shift':
                 // console.log(`request ke : ${pageName}`)
                //dapatkan divisi
                API.getDivision(token, 1, 1000).then((res) => {
                    // console.log(res);
                    //apabila ada data divisi
                    const dataDepartemen = res.data.data;
                    // console.log(data)
                    // console.log('divisi ditemukan');
                    setTableColumns(workShiftColumns);
                    setTotalPage(0);
                
                    //masukkan data divisi ke inputan departemen
                    //hapus dulu semua pilihan inputan departemen, kecuali yang -- pilih departemen --
            
                    workShiftFields[0].options.length = 1;
                    
                    // console.log(workShiftFields[0].options);
                    //masukkan data jabatan ke pilihan inputannya
                    for(let i = 0; i < dataDepartemen.length; i++) {
                    
                        const departemen = {
                            key: dataDepartemen[i].name, value: dataDepartemen[i].id
                        }
                        workShiftFields[0].options.push(departemen);
                        
                    }

                    workShiftFields[0].callback = null;
                    workShiftFields[0].callback = (selectedDivision) => {
                        // console.log(`id departemen : ${selectedDivision}`);
                        setDivisionID(selectedDivision);
                    }
                    workShiftFields[4].callback = null;
                    workShiftFields[4].callback = (value) => {
                        // console.log(`apakah sama setiap harinya? : ${value}`);
                        setIsTimeSameEveryDay(value);
                    }
                    // console.log(workShiftFields[0])


                    API.getTeamGroupByDivisionID(token, divisionID).then(res => {
                        // console.log(res);
                        //apabila ada data tim/grup dengan divisi yang dipilih
                        workShiftFields[1].options.length = 0;
                        workShiftFields[1].options.push({key: '-- Pilih Tim/Grup --', value: ''});
        
        
                        const dataTimGrup = res.data;
                        // console.log(dataTimGrup);
                        for(let i = 0; i < dataTimGrup.length; i++) {
                            
                            const inputanTimGrup = {
                                key: dataTimGrup[i].name, value: dataTimGrup[i].id
                            }
                            workShiftFields[1].options.push(inputanTimGrup);
                            
                        }
                    }).catch(err => {
                        workShiftFields[1].options.length = 0;
        
                        const inputanTimGrup = {
                            key: 'Tidak ada tim/grup di departemen yang dipilih', value: ''
                        }
                        workShiftFields[1].options.push(inputanTimGrup);
                    })
                    
                    // console.log(workShiftFields[2].options);

                    // console.log(workShiftFields);
                    setFormFields(workShiftFields)
                    setSchemaValidation(workShiftValidationSchema)
                    API.getWorkShift(token, currentPage, perPage, searchTerm).then((res) => {
                        // console.log(res);
                        setTableData(res.data.data)
                        setTotalPage(res.data.last_page);
                        setTotalTableData(res.data.total);
                        setPosition((currentPage - 1) * perPage)
                        setMessage('success get data work shift');
                        setLoading(false);
                    }).catch(err => {
                        // console.log(err.response.data.message);
                        // console.log(err);
                        setTableData(0);
                        setMessage(err.response.data.message || 'Shift kerja tidak ditemukan');
                        
                        setLoading(false);
                    })
                }).catch(err => {
                    //apabila tidak ada divisi
                    // console.log(err)
                    // console.log(err.response.data.message);
                    setMessage(err.response.data.message || 'Tambahkan tim/grup terlebih dahulu');
                })
                break;
            case 'Hari Libur':
                setTotalPage(0);
                setTableColumns(holidayColumns);
                setFormFields(holidayFields)
                setSchemaValidation(holidayValidationSchema)
                
                API.getHoliday(token, currentPage, perPage, searchTerm).then((res) => {
                    console.log(res)
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data holidays');
                    setLoading(false);
                }).catch(err => {
                    // console.log(err.response.data.message);
                    setTableData(0)
                    setMessage(err.response.data.message || 'Belum ada hari libur');
                    setLoading(false);
                })
                break;      
            case 'Lembur':
                // console.log('lembur')

                setTotalPage(0);
                setFormFields(setupOvertimeFields)
                setSchemaValidation(setupOvertimeValidationSchema)

                API.getAllOvertimeDayTypes(token).then((res) => {
                    // console.log(res.data)
                    setOvertimeDayType(res.data);
                }).catch(err => {
                    // console.log(err.response)
                    // console.log(err.response.data.message);
                    alert('Hubungi Administrator, Jenis Hari Lembur Tidak Ditemukan');
                    
                })
                API.getTeamGroup(token, currentPage, perPage, searchTerm).then((res) => {
                    // console.log(res.data);
                    setTableColumns(overtimeColumns);

                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data team/group');
                    
                    setLoading(false);
                    
                }).catch(err => {
                    // console.log(err.response.data.message);
                    // console.log(err);
                    setTableData(0);
                    setMessage(err.response.data.message || 'Tim/Grup tidak ditemukan');
                    
                    setLoading(false);
                })
                
               
           
                break;      
            case 'Cuti':
                // console.log(`pengaturan cuti`)
                setTotalPage(0);
                
                API.getAllLeaveTypes(token).then(res => {
                    // console.log(res.data);
                    
                    API.getSetupLeave(token).then(resp => {
                        let arr = Object.values(resp.data);
                        // console.log(arr)
                        // data.group_id = arr[1].group_id;
                        // let l = res.data.length * arr.length;
                        let z = 1;
                        let x = res.data.length; //10
                        let y = arr.length; //4
                        let totalLength = arr.length * res.data.length;
                        //loop 10 x
                        let indexDataSetup = 0;

                        let i = 0;
                            // console.log(leaveColumns[3])
                        // arr.map(group => {
                        //     console.log(group)
                        //     leaveColumns[3].Cell = res.data.map(leave_type => {
                        //         // console.log(leave_type.code)
                        //         return  <div key={leave_type.id} onClick={() => handleClickSetupLeave(group, leave_type)}>
                        //             {leave_type.code} - 
                        //         </div>;
                        //     });
                        // })
                        
                         // {overtimeDayType.map(data => (
                                //     <button key={data.name} className="detail-button" onClick={() => {skemaUpahLembur(row.row.original, data)}}>{data.name}</button> 
                                // ))}
                        arr.forEach(group => {
                            
                            res.data.map(data => {
                                data.Header = data.code;
                                data.accessor = data.code;
                                // data.leave_type_id = data.id;
                                group[data.code] = group.setup_leave.find(setup_leave => setup_leave.leave_type_id === data.id) ? 
                                    group.setup_leave.map(e => e.leave_type_id === data.id && 
                                        <div key={e.leave_type_code} onClick={() => handleClickSetupLeave(group.group_id, group.group_name, e.leave_type_id, e.leave_type_name, e)} className="atur-cuti">
                                            Jatah : {e.balance} <br /> <br />
                                            Mengurangi Uang Makan: {e.is_deduct_meal_allowance == 1 ? 'Ya' : 'Tidak'}
                                        </div>
                                        )
                                 : 
                                 <div onClick={() => handleClickSetupLeave(group.group_id, group.group_name, data.id, data.name)} className="atur-cuti">
                                            {/* Atur {data.name} */}
                                            Belum diatur
                                            
                                </div>;
                             
                                 if(!leaveColumns.find(leaveColumn => leaveColumn.id === data.id)){
                                    leaveColumns.push(data)

                                }
                                
        
                            })
                     

                        });
                       

                        
                        setTableData(arr)
                       
                   
                        setTableColumns(leaveColumns);

                    
                    })
                   
                    

                }).catch(err => {
                    console.log(err.response.data.message);
                    // console.log(err);
                    // alert('Hubungi Administrator, Jenis Cuti Tidak Ditemukan');

                    // setTableData(0);
                    setMessage(err.response.data.message || 'Jenis Cuti tidak ditemukan');
                    
                    setLoading(false);
                })
            
           
                break;
            case 'Pinjaman':
                // console.log(`pengaturan pinjaman`)
                setTotalPage(0);
                API.getSetupLoan(token).then(res => {
                    setTableData(res.data)
                    setTableColumns(loanColumns);

                
                }).catch(err => {
                    console.log(err.response);
                })
               
                

                break;
            case 'BPJS Kes & TK':
                // console.log(`render pengaturan bpjs `)
                // console.log(isChildDone)
               
                setLoading(true);
                API.getSetupBPJS(token).then(res => {
                    // console.log('edit pengaturan bpjs')
                    // console.log(res.data);
                    setIsAddOrEdit('edit');
            
                    const programDiikuti = [];
                    //check apa saja program bpjs yang diikuti
                    if(res.data.jkk != 0){
                        programDiikuti.push(optionPrograms[0])
                    }
                    if(res.data.jkm != 0){
                        programDiikuti.push(optionPrograms[1])
            
                    }
                    if(res.data.jht != 0){
                        programDiikuti.push(optionPrograms[2])
            
                    }
                    if(res.data.jp != 0){
                        programDiikuti.push(optionPrograms[3])
            
                    }
                    if(res.data.jkn != 0)
                    {
                        programDiikuti.push(optionPrograms[4])
                    }
                
                    setInitialValues({
                        id: res.data.id || "",
                        npp: res.data.npp || "",
                        programs: programDiikuti || "",
                        jkk: `${res.data.jkk}` || "",
                        jkm: res.data.jkm || "",
                        jht: res.data.jht || "",
                        jp: res.data.jp || "",
                        jkn: res.data.jkn || "",
                        upah_minimum: res.data.upah_minimum || "",
                        basis_pengali: res.data.basis_pengali || 1
                    })
            
                    setLoading(false);
                }).catch(err => {
                    setIsAddOrEdit('add');
                    console.log(err.response.data.message);
                    console.log('add pengaturan bpjs')
                    setInitialValues({
                        npp: "",
                        programs: "",
                        jkk: "",
                        jkm: "",
                        jht: "",
                        jp: "",
                        jkn: "",
                        upah_minimum: "",
                        basis_pengali: "",
                    })
                    setLoading(false);

                })

               break;
            case 'PPh 21':
                // console.log(setIsChildDone)
                //check apakah sudah ada pengaturan pph21 atau belum?
                // console.log(`pengaturan pph21`)
                API.getSetupPPh21KPP(token).then(res => {
                    // console.log('edit pengaturan pph21 kpp')
                    // console.log(res.data);
                    setPPh21KPPAddOrEdit('edit');
                    setInitialValuesKPP({
                        id: res.data.id,
                        kpp_name: res.data.kpp_name,
                        kpp_address: res.data.kpp_address,
                        npwp_company: res.data.npwp_company,
                        npwp_responsible_person: res.data.npwp_responsible_person,
                        name_responsible_person: res.data.name_responsible_person,
                        status_responsible_person: res.data.status_responsible_person,
                        title_responsible_person: res.data.title_responsible_person,
                    });
                }).catch(err => {
                    setPPh21KPPAddOrEdit('add');
                    // console.log(err.response.data.message);
                    // console.log('add kpp client')
                    setInitialValuesKPP({
                        kpp_name: '',
                        kpp_address: '',
                        npwp_company: '',
                        npwp_responsible_person: '',
                        name_responsible_person: '',
                        status_responsible_person: '',
                        title_responsible_person: '',
                    })
                });

                API.getSetupPPh21(token).then(res => {
                    // console.log('edit pengaturan pph21 calc method')
                    // console.log(res.data);
                    setPPh21AddOrEdit('edit');
                    setInitialValuesCalcMethod({
                        id: res.data.id,
                        calc_method_pph21_empl: res.data.calc_method_pph21_empl,
                        calc_method_effective_date: res.data.calc_method_effective_date,
                        midyear_ptkp_change: `${res.data.midyear_ptkp_change}`,
                        format_penomoran_1721_i: res.data.format_penomoran_1721_i,
                    })
                }).catch(err => {
                    setPPh21AddOrEdit('add');
                    // console.log(err.response.data.message);
                    // console.log('add pph 21 calc method')
                    setInitialValuesCalcMethod({
                        calc_method_pph21_empl: '',
                        calc_method_effective_date: '',
                        midyear_ptkp_change: '',
                        format_penomoran_1721_i: '',
                    })
                })

             
               
                break;
            case 'Penggajian':
                console.log(`halaman pengaturan penggajian`)
                break;
            case 'Rek. Penggajian':
                console.log(`halaman pengaturan rek penggajian`)
                break;

            case 'Komponen Gaji':
                // console.log(`halaman pengaturan komponen gaji`)
                setTotalPage(0);
                setTableColumns(payrollComponentColumns);
                setFormFields(holidayFields)
                setSchemaValidation(holidayValidationSchema)
                
                API.getHoliday(token, currentPage, perPage, searchTerm).then((res) => {
                    console.log(res)
                    setTableData(res.data.data)
                    setTotalPage(res.data.last_page);
                    setTotalTableData(res.data.total);
                    setPosition((currentPage - 1) * perPage)
                    setMessage('success get data holidays');
                    setLoading(false);
                }).catch(err => {
                    // console.log(err.response.data.message);
                    setTableData(0)
                    setMessage(err.response.data.message || 'Belum ada hari libur');
                    setLoading(false);
                })
                break;      
            case 'Lembur':
                break;
            case 'Template Penggajian':
                console.log(`halaman pengaturan template penggajian`)

                break;
            default:
                break;
        }
    }, [ location, currentPage, perPage, debouncedSearchTerm, divisionID, workShiftFields, isTimeSameEveryDay, position, modalIsOpen, isChildDone]);
    

    //inputan shift
    useEffect(() => {
        const inputanJamMasuk  =
            {   control: 'time',
                type: 'text',
                label: 'Jam Masuk',
                name: 'default_time_in',
            };
        
        const inputanJamKeluar  =
          {   control: 'time',
              type: 'text',
              label: 'Jam Keluar',
              name: 'default_time_out'
          };
        const inputanJamIstirahat = 
          {   control: 'time',
              type: 'text',
              label: 'Jam Mulai Istirahat',
              name: 'default_time_break_start'
          };
        const inputanToleransiTelat  =
        {   control: 'input',
            type: 'number',
            label: 'Toleransi Keterlambatan (Menit)',
            name: 'default_late_tolerance'
        };
        const inputanDurasiIstirahat  =
        {   control: 'input',
            type: 'number',
            label: 'Durasi Istirahat (Menit)',
            name: 'default_break_duration'
        };
        const everydayField = {
            everydayField :true
        };
        workShiftFields.length = 5;
        //jika waktu & istirahat kerja sama setiap harinya
        if(isTimeSameEveryDay == 1){
            // console.log('tampilkan inputan jam kerja untuk semua hari')
            workShiftFields.push(inputanJamMasuk)
            workShiftFields.push(inputanJamKeluar)
            workShiftFields.push(inputanToleransiTelat)
            workShiftFields.push(inputanJamIstirahat)
            workShiftFields.push(inputanDurasiIstirahat)
            setFormFields(workShiftFields)

            // console.log(workShiftFields);
        }else {
            workShiftFields.push(everydayField);
            setFormFields(workShiftFields)
            // console.log(workShiftFields);

            // console.log('tampilkan inputan jam kerja untuk setiap harinya')

        }


    }, [isTimeSameEveryDay, workShiftFields])

    useEffect(() => {
        console.log(`initialValues berubah`)
    }, [initialValues])

    return (
        <>
            <HRMenuSetting setPageSetting={setPageSetting} location={location} pageName={pageName} />

            {(pageName == 'Informasi Perusahaan') ? <>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={saveCompanyInfo}>
                    {({errors, touched, isValid}) => (
                    <Form>
                                <FormControl control="input" type="text" label="Nama Perusahaan" name="name"
                                style={getStyle(errors, touched, 'name')}
                                />
                   
                            <Gap height={30} />
                            <Button shadowSetting buttonFull buttonColor='#48c774' buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{props.isLoading ? 'Loading...' : 'Save'}</Button>
                        </Form>
                        
                    )}
            </Formik>
            </> : (pageName == 'BPJS Kes & TK') ? <>
                
                <SettingBPJS initialValues={initialValues} options={optionPrograms} isAddOrEdit={isAddOrEdit} token={token} reloadPage={reloadPage} isChildDone={isChildDone} />
            
            </> : (pageName == 'PPh 21') ? <>
                <SettingPPh21 initialValuesCalcMethod={initialValuesCalcMethod} initialValuesKPP={initialValuesKPP} PPh21KPPAddOrEdit={PPh21KPPAddOrEdit} PPh21AddOrEdit={PPh21AddOrEdit} token={token} reloadPage={reloadPage} isChildDone={isChildDone} />
            </> : //else, tampilkan datatable, cek dulu apakah ada datanya
            
                <>
                <Row>
                    <Col>
                    {pageName == 'Cuti' ? <><h4 align="center">Pengaturan Cuti Tiap Grup Kerja</h4><Gap height={10} /></> : pageName == 'Pinjaman' ? <><h4 align="center">Pengaturan Pinjaman Tiap Grup Kerja</h4><Gap height={10} /></> : 
                    <div className="table-control">
                        <div className="limit">
                            <span>Show :</span>
                            <select onChange={changePerPage} value={perPage}>
                            {perPageList.map(perPage => {
                                return (
                                <option key={perPage.value} value={perPage.value}>
                                {perPage.label}
                                </option>
                                )
                                })
                            }
                            </select>
                            <span>Entries</span>

                        </div>
                    

                        <div className="search">
                            <input type="text"
                                placeholder="Search here..."
                                value={searchTerm || ''}
                                onChange={e => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>
                        {
                            pageName != 'Lembur' &&
                            <button onClick={handleAdd} className="add-button">
                                    <Icon icon={iconAdd} color="#fff" />
                                    Add New

                            </button>

                        }
                    </div>
                    }
                 
                    {tableData ? 
                        <Table type="dataTable" tableData={tableData} tableColumns={tableColumns} />
                        : <h2 align="center">{message}</h2>
                    }
        
                    
                    </Col>
                </Row>
                {/* //jika tidak ada table data sembunyikan */}
                {pageName == 'Cuti' ? null : pageName == 'Pinjaman' ? null :
    
                    <div className="pagination">
                        <div className="pagination-info">
                            <span>Showing {position + 1} to {( currentPage != totalPage ) ? position + 1 * perPage : totalTableData } of {totalTableData} entries</span> <br />
                        </div>
                        <div className="pagination-control">
                            <button onClick={() => prevButton()} disabled={currentPage <= 1}>&laquo;</button>
                            {renderPageNumbers}
                            <button onClick={() => nextButton()} disabled={currentPage >= totalPage}>&raquo;</button>

                        </div>
                    </div>
                }
                </>
            }
            

            
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
                        top: '25px',
                        left: '450px',
                        right: '450px',
                        bottom: '50px',
                    }
                }}
            >
                <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="close-modal" onClick={() => setModalIsOpen(false)}>X</button>
                </div>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={schemaValidation} onSubmit={handleSubmit}>
                    {({errors, touched, isValid, setFieldValue}) => (
                        
                    <Form>
                        <div className="modal-body">
                            <div className="form-row">
                            {
                                formFields.map((field, index) => {
                                    
                                    if(field.everydayField) {
                                        const allDay = {
                                            monday: 'Senin',
                                            tuesday: 'Selasa',
                                            wednesday: 'Rabu',
                                            thursday: 'Kamis',
                                            friday: 'Jum\'at',
                                            saturday: 'Sabtu',
                                            sunday: 'Minggu'
                                        };
                                        
                                        let allDayElements = [];
                                        let i = 1;
                                        for(const [day, hari] of Object.entries(allDay)) {
                                            // if (i === Object.entries(allDay).length) {
                                            //     return console.log(`${hari} adalah hari terakhir`)
                                            // }
                                        // {console.log(Object.entries(allDay).length)}
                                        // {console.log(i)}
                                            allDayElements.push(
                                                <React.Fragment key={`${hari}_container`}>
                                                <div className='header-everyday-field' key={`header-${hari}`}>
                                                    <h4 className={`${(i === Object.entries(allDay).length || i === Object.entries(allDay).length - 1) ? 'weekend' : 'weekday'}`}>{hari}</h4>
                                                </div>
                                                <div className="body-everyday-field" key={`body-${hari}`}>
                                                    <div className="day-field-container" key={`masuk-${hari}`}>
                                                        <label htmlFor={`${day}_time_in`}>Masuk</label>
                                                        <Field name={`${day}_time_in`} key={`${day}_time_in`}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const {value} = field
                                                            // console.log(timeInRef.current.value)
                                                            return (
                                                                <TimeField
                                                                id={`${day}_time_in`}
                                                                {...field}
                                                                // value={value}
                                                                // value={timeInRef.current}
                                                                value={isAddOrEdit == 'add' ? timeInRef.current : value}
                                                                
                                                                // value={inputValue}
                                                                colon=":" 
                                                                onChange={(e, val) => setFieldValue(`${day}_time_in`, val)}
                                                                
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`${day}_time_in`} />
                                                    </div>
                                                    <div className="day-field-container" key={`pulang-${hari}`}>
                                                        <label htmlFor={`${day}_time_out`}>Pulang</label>
                                                        <Field name={`${day}_time_out`} key={`${day}_time_out`}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const {value} = field

                                                            // console.log(value)
                                                            return (
                                                                <TimeField
                                                                id={`${day}_time_out`}
                                                                {...field}
                                                                // value={value}
                                                                // value={timeOutRef.current}
                                                                value={isAddOrEdit == 'add' ? timeOutRef.current : value}
                                                                // value={inputValue}
                                                                colon=":" 
                                                                onChange={(e, val) => setFieldValue(`${day}_time_out`, val)}
                                                                
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`${day}_time_out`} />
                                                    </div>
                                                    <div className="day-field-container" key={`istirahat-${hari}`}>
                                                        <label htmlFor={`${day}_time_break_start`}>Istirahat</label>
                                                        <Field name={`${day}_time_break_start`} key={`${day}_time_break_start`}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return (
                                                                <TimeField
                                                                id={`${day}_time_break_start`}
                                                                {...field}
                                                                // value={value}
                                                                value={isAddOrEdit == 'add' ? timeBreakStartRef.current : value}
                                                                // value={timeBreakStartRef.current}
                                                                colon=":" 
                                                                onChange={(e, val) => setFieldValue(`${day}_time_break_start`, val)}
                                                                
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`${day}_time_break_start`} />
                                                    </div>
                                                    <div className="day-field-container" key={`durasi-istirahat-${hari}`}>
                                                        <label htmlFor={`${day}_break_duration`}>Durasi Istirahat</label>
                                                        <Field id={`${day}_break_duration`} name={`${day}_break_duration`} placeholder={breakDurationRef.current ? breakDurationRef.current : null} type="number" style={{width: '35px'}} key={`${day}_break_duration`}
                                                        onChange={(e) => setFieldValue(`${day}_break_duration`, e.target.value)}
                                                        />
                                                        <ErrorMessage component={TextError} name={`${day}_break_duration`} />
                                                    </div>
                                                    <div className="day-field-container" key={`toleransi-telat-${hari}`}>
                                                        <label htmlFor={`${day}_late_tolerance`}>Toleransi Telat</label>
                                                        <Field id={`${day}_late_tolerance`} name={`${day}_late_tolerance`} placeholder={lateToleranceRef.current ? lateToleranceRef.current : null} type="number" style={{width: '35px'}} key={`${day}_late_tolerance`}
                                                        onChange={(e) => setFieldValue(`${day}_late_tolerance`, e.target.value)}
                                                        />
                                                        <ErrorMessage component={TextError} name={`${day}_late_tolerance`} />
                                                    </div>
                                                </div>
                                                
                                                </React.Fragment>
                                           );
                                           i++;
                                        
                                        }
                                           
                                        return (
                                            <>
                                            <div className='everyday-field' key={`everyday-field-${index}`}>
                                                <h3>Jam Kerja & Istirahat</h3>
                                                <React.Fragment>
                                                <div className='header-everyday-field'>
                                                    <h4>Default</h4>
                                                </div>
                                                <div className="body-everyday-field">
                                                    <div className="day-field-container">
                                                        <label htmlFor={`default_time_in`}>Masuk</label>
                                                        <Field name={`default_time_in`} refs={timeInRef}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return (
                                                                <TimeField
                                                                id={`default_time_in`}
                                                                {...field}
                                                                value={value}
                                                                colon=":" 
                                                                onChange={(e, val) => setFieldValue(`default_time_in`, val)}
                                                                onKeyUp={(e) => handleChangeTimeIn(e)}
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`default_time_in`} />
                                                    </div>
                                                    <div className="day-field-container">
                                                        <label htmlFor={`default_time_out`}>Pulang</label>
                                                        <Field name={`default_time_out`} key={`default_time_out`} refs={timeOutRef}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return (
                                                                <TimeField
                                                                id={`default_time_out`}
                                                                {...field}
                                                                value={value}
                                                                colon=":" 
                                                                onChange={(e) => setFieldValue(`default_time_out`, e.target.value)}
                                                                onKeyUp={(e) => handleChangeTimeOut(e)}
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`default_time_out`} />
                                                    </div>
                                                    <div className="day-field-container">
                                                        <label htmlFor={`default_time_break_start`}>Istirahat</label>
                                                        <Field name={`default_time_break_start`} refs={timeBreakStartRef}>
                                                            {({ form, field }) => {
                                                            const { setFieldValue } = form
                                                            const { value } = field
                                                            return (
                                                                <TimeField
                                                                id={`default_time_break_start`}
                                                                {...field}
                                                                value={value}
                                                                colon=":" 
                                                                onChange={(e, val) => setFieldValue(`default_time_break_start`, val)}
                                                                onKeyUp={(e) => handleChangetimeBreakStart(e)}
                                                                />
                                                            )
                                                            }}
                                                        </Field>
                                                        <ErrorMessage component={TextError} name={`default_time_break_start`} />
                                                    </div>
                                                    <div className="day-field-container">
                                                        <label htmlFor={`default_break_duration`}>Durasi Istirahat</label>
                                                        <Field id={`default_break_duration`} name={`default_break_duration`} placeholder="Menit" type="number" style={{width: '35px'}}
                                                        refs={breakDurationRef}
                                                        onKeyUp={(e) => handleChangeBreakDuration(e)}
                                                        />
                                                        <ErrorMessage component={TextError} name={`default_break_duration`} />
                                                    </div>
                                                    <div className="day-field-container">
                                                        <label htmlFor={`default_late_tolerance`}>Toleransi Telat</label>
                                                        <Field id={`default_late_tolerance`} name={`default_late_tolerance`} placeholder="Menit" type="number" style={{width: '35px'}}
                                                        refs={lateToleranceRef}
                                                        onKeyUp={(e) => handleChangeLateTolerance(e)}
                                                        />
                                                        <ErrorMessage component={TextError} name={`default_late_tolerance`} />
                                                    </div>
                                                </div>
                                                
                                                </React.Fragment>
                                            {
                                                allDayElements.map(allDayElement => (
                                                    allDayElement
                                                ))
                                            }
                                            </div>
                                            </>
                                        )
                    
                                    }
                                    return (
                                        <FormControl key={field.name}
                                            control={field.control}
                                            type={field.type}
                                            label={field.label}
                                            name={field.name}
                                            style={getStyle(errors, touched, field.name)}
                                            options={field.options}
                                            callback={field.callback}
                                            {...field}
    
                                        />
                                    )
                                        
                                })
                            }    
                            </div>  

                        </div>
                        <div className="modal-footer">
                            <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{(isAddOrEdit == 'add') ? 'Tambah' : 'Simpan' }</Button>
                        </div>
                    </Form>
                    )}
                </Formik>

                </div>
            </Modal>


            <Modal 
                onRequestClose={() => setModalSkemaLemburIsOpen(false)}
                isOpen={modalSkemaLemburIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                      },
                    content: {
                        border: '1px solid #222',
                        padding:0,
                        top: '25px',
                        left: '450px',
                        right: '450px',
                        bottom: '50px',
                    }
                }}
            >
                <div className="modal-container">
                    <div className="modal-header">
                        <h2 className="modal-title">{title}</h2>
                        <button className="close-modal" onClick={() => setModalSkemaLemburIsOpen(false)}>X</button>
                    </div>
                    <Formik enableReinitialize initialValues={initialValuesSkemaLembur} validationSchema={schemaValidationSkemaLembur} onSubmit={handleSubmitSkemaLembur}>
                    {({errors, touched, isValid, setFieldValue, values}) => (
                        
                    <Form>
                        <div className="modal-body">
                            <div className="form-row">
                                
                            {
                                                        
                                formFields.map(field => {
                                    return (
                                        <FormControl key={field.name}
                                            control={field.control}
                                            type={field.type}
                                            label={field.label}
                                            name={field.name}
                                            style={getStyle(errors, touched, field.name)}
                                            options={field.options}
                                            callback={field.callback}
                                            {...field}

                                            />
                                    )
                                })
                            }
                                
                            </div>  

                        </div>
                        
                        <div className="modal-footer">
                            <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" disabled={!isValid || props.isLoading} className={props.isLoading ? 'btnLoading' : null}>{(isAddOrEdit == 'add') ? 'Tambah' : 'Simpan' }</Button>
                        </div>
                    </Form>
                    )}
                </Formik>  
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
    createBranch : (token, data) => dispatch(createBranch(token, data)),
    editBranch : (token, data) => dispatch(editBranch(token, data)),

    

})
export default connect(reduxState, reduxDispatch)(HRSettingMenu)