import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { iconAdd, iconLeft, iconUser } from '../../../../assets'
import { Button, Col, FormControl, Gap, Icon, PageHeader, Row } from '../../../../components'
import API from '../../../../config/api'
import { getTotalHours, tahun_bulan_tanggal } from '../../../../utils/helpers/date'
import { getStyle } from '../../../../utils/helpers/errorMessage'
import { RequestOvertimeFields, RequestOvertimeValidationSchema } from '../fields'
import { OverviewOvertimeRequest, WrapperFormRequest } from '../request.elements'

const initialValues = {
    date : '',
    start_from: '',
    ends_on: '',
    desc: ''
};

const RequestOvertime = (props) => {
    // console.log(props)
    

    const token = props.user.token;
    const employee = props.user.info;
    const history = props.history;
    const [message, setMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(tahun_bulan_tanggal(new Date));
    const [schedule, setSchedule] = useState(null);
    const [overtimeDayType, setOvertimeDayType] = useState(1);
    const [workDayInWeek, setWorkDayInWeek] = useState(1);
    const [paidPer, setPaidPer] = useState(1);
    const [fixRate, setFixRate] = useState(1);
    const [basicSalary, setBasicSalary] = useState(1);
    const [amount, setAmount] = useState(null);

    

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        // console.log('simpan data');

        //check apakah paid_by == 1, bila 1 berarti amount = total uang yang didapat, bila 2, berarti amount = total hari yang didpaat
        values.overtime_day_type = overtimeDayType;
        values.employee_id = employee.id;
     
        
        if(values.paid_by == 1){
               //check paid_per, apabila nilainya = 1, maka hitung upah lemburnya sesuai peraturan pemerintah
            //apabila nilainya = 2, maka ambil nilai fix_rate
            //apabila nilainya = 3, maka ambil nilai fix_rate * jumlah jam lembur yang diambil
            const total_hours = getTotalHours(values.start_from, values.ends_on);
            const upah_per_jam =  Math.round(1/173 * basicSalary);
            // console.log('gaji pokok', basicSalary);
            // console.log('upah sejam', upah_per_jam);
            switch (paidPer) {
                case 1:
                    // console.log('hitung upah lembur sesuai peraturan pemerintah');
                    // setAmount()
                    if(total_hours > 0){
                        // console.log('jumlah jam lembur', total_hours);
                        //check overtime_day_type, 
                        if(values.overtime_day_type == 1){ //lembur hari biasa
                            // console.log('hitung lembur di hari biasa');
                            //1 jam pertama dikal 1.5
                            //jam kedua dan seterusnya dikali 2
                            
                            const overtime_index_rate = (total_hours > 1) ? (1 * 1.5) + ((total_hours - 1) * 2) : 1 * 1.5;
                            // return overtime_index_rate * 1/173 * basic_salary;
                            // console.log('overtime index rate', overtime_index_rate)
                            values.amount = overtime_index_rate * upah_per_jam;
                            // values.amount.toFixed(2);
                            // console.log('upah lembur di hari biasa', overtime_index_rate * upah_per_jam);
                
                            
                            
                        } else { //lembur di hari libur
                            //check jadwal kerjanya 5 hari atau 6 hari
                            // console.log('hitung lembur di hari libur')
                            if(workDayInWeek == 5) {
                                // console.log('5 hari kerja')
                                //8 jam pertama dikali 2
                                //jam ke-9 dikali 3
                                //jam ke-10 - ke-11 dikali 4
                                const overtime_index_rate = (total_hours > 8) ? (8 * 2) + ( ((total_hours - 8) > 0) && 1 * 3) + ((total_hours - 9 > 0) && (total_hours - 9) * 4) : total_hours * 2;
                                // console.log('overtime index rate', overtime_index_rate);
                                // console.log('upah lembur di hari libur 5 hari kerja', overtime_index_rate * upah_per_jam)
                                values.amount = overtime_index_rate * upah_per_jam;
                                // return overtime_index_rate * 1/173 * basic_salary;
                                
                                
                            }else { // 6 hari dalam seminggu
                                // let date = new Date(values.date)
                                // console.log('6 hari kerja')
                                //cek apakah itu hari jumat?     
                                if(values.date.getDay() == 5){
                                    // console.log('lembur di hari libur hari jumat');
                                     //5 jam pertama dikali 2
                                    // jam ke-6 dikali 3
                                    //seterusnya dikali 4, 
                                    //jam ke-7 ke-8 dikali 4
                                                                                    //5 jam pertama        jam ke-6                     jam ke-7 dan seterusnya
                                    //jika jam lembur lebih dari 5 jam
                                    const overtime_index_rate = (total_hours > 5) ? (5 * 2) + ( ((total_hours - 5) > 0) && 1 * 3) + ((total_hours - 6 > 0) && (total_hours - 6) * 4) : total_hours * 2;
                                    // console.log('overtime index rate', overtime_index_rate);
                                    // console.log('upah lembur di hari libur terpendek', overtime_index_rate * upah_per_jam)
                                    values.amount = overtime_index_rate * upah_per_jam;
                                    
                                }else {
                                    console.log('hari libur');
                                    //7 jam pertama dikali 2
                                    // jam ke-8 dikali 3
                                    //seterusnya dikali 4, 
                                    //jam ke-9 - ke-10 dikali 4
                                                                                    //7 jam pertama        jam ke-8                     jam ke-9 dan seterusnya
                                    const overtime_index_rate = (total_hours > 7) ? (7 * 2) + ( ((total_hours - 7) > 0) && 1 * 3) + ((total_hours - 8 > 0) && (total_hours - 8) * 4) : total_hours * 2;
                                    // console.log('overtime index rate', overtime_index_rate);
                                    // console.log('upah lembur di hari libur 6 hari kerja', overtime_index_rate * upah_per_jam)
                                    values.amount = overtime_index_rate * upah_per_jam;

                                }
                                
                            }
                        
                
                        }
                
                    }else {
                        values.amount = 0;
                    }
                    
                    break;
                case 2:
                    // console.log('hitung upah lembur sesuai fix rate');
                    values.amount = fixRate;
                    break;
                case 3:
                    // console.log('hitung upah lembur sesuai fix_rate * jumlah jam lembur yang diambil');
                    const jumlah_jam = getTotalHours(values.start_from, values.ends_on);
                    // console.log(jumlah_jam);
                    values.amount = fixRate * jumlah_jam;
                    break;
                default:
                    break;
            }
        }else {
            values.amount = 1;
        }
        values.date = tahun_bulan_tanggal(values.date)

        // console.log(values)

        API.addOvertimeRequest(token, values).then(res => {
            // console.log(res)
            // console.log(res.data.message);
            swal({
                title: res.data.status,
                text: res.data.message,
                icon: "success",
            });

            history.push('/overtime');
      
            
          }).catch(err => {
            //   console.log(err.response);
              swal({
                  title: err.status,
                  text: err.response.data.message,
                  icon: "error",
              });
              history.push('/overtime');
      
      
          });
        resetForm();
        setSubmitting(false);
        
    }

  
    useEffect(() => { 
        RequestOvertimeFields[0].callback;
        RequestOvertimeFields[0].callback = (value) => {
            setSelectedDate(tahun_bulan_tanggal(value));

        };

        //get gaji pokok & jumlah hari kerja karyawan
        API.getBasicSalaryAndWorkDayInWeek(token, employee.position_id, employee.group_id).then(res => {
            setWorkDayInWeek(res.data[0].work_day_in_week)
            setBasicSalary(res.data[1].gaji_pokok)
            
        }).catch(err => {
            console.log(err)
        })
    }, [])

 
    useEffect(() => {

        //check apakah tanggal yang dipilih punya jadwal? jika tidak maka lemburnya adalah lembur di hari libur
        //check apakah tanggal yang dipilih hari libur? jika iya maka lemburnya adalah lembur di hari libur
        //check apakah hari liburnya adalah hari libur jam kerja terpendek, jika iya maka jenis lemburnya adlaah lembur di hari libur jam kerja terpendek
        //apabila punya jadwal, tampilkan jenis lembur sebelum masuk atau sesudah pulang check apakah jam sekarang sudah lewat jam masuk?
        //jika lewat jam masuk berarti lembur sebelum masuk hilangkan
        // console.log(selectedDate);

        API.checkTodayScheduleOfEmployee(token, employee.id, selectedDate).then(res => {
            // console.log('jadwal ditemukan');
            //berarti jenis lemburnya adalah lembur di hari kerja
            setSchedule(res.data);
            setOvertimeDayType(1);


        }).catch(err => {
            // console.log(err.response.data.message)
            setSchedule(null);
            //check apakah tanggal yang dipilih itu hari libur
            API.isDateHoliday(token, selectedDate).then(res => {
                // console.log(res);
                //jika iya hari libur, apa jenis hari liburnya,
                //hari libur nasional = 3, 
                //hari libur keagamaan = 4,
                //cuti bersama = 5
                switch (res.data.type) {
                    case "Hari Libur Nasional" :
                        setOvertimeDayType(3);
                        break;
                    case "Hari Libur Keagamaan" :
                        setOvertimeDayType(4);
                        break;
                    case "Cuti Bersama" :
                        setOvertimeDayType(5);
                        break;
                    default:
                        break;
                }
              
            }).catch(err => {
                //jika tanggal yang dipilih tidak ada di tabel holiday maka, jenis lemburnya adalah lembur di hari off kerja = 2
                // console.log(err);
                setOvertimeDayType(2);

            })
            
            

        });
    }, [selectedDate])

    useEffect(() => {
        RequestOvertimeFields[4].options.length = 2;


        //ini untuk menghitung upah lemburnya

        /**
         * get setup_overtime_schemes by group_id and overtime_day_types
         */
        API.getOvertimeSchemes(token, employee.group_id, overtimeDayType).then(res => {
            // * apabila sudah dapat pengaturan skema lemburnya,
            console.log(res.data)
            //check can_increase_leave_balance, if nilainy = 1, munculkan field radio button untuk memilih upah lembur, uang atau tambah jatah cuti
            if(res.data.can_increase_leave_balance == 1){
                // alert('tampilkan field radio button untuk memilih upah lembur uang atau tambah jatah cuti')
                RequestOvertimeFields[4].options.push({key: "Tambah Cuti", value : 2});
                
            }
            setFixRate(res.data.fix_rate);
            setPaidPer(res.data.paid_per);
            
       
        }).catch(err => {
            // apabila tidak ada pengaturan skema lemburnya
            // console.log(err)

            swal({
                title: err.status,
                text: err.response.data.message,
                icon: "error",
            });
            // history.push('/overtime');

        })

        
        // console.log("overtime day type :", overtimeDayType)
        

        
      
        
    }, [overtimeDayType])

    
    return (
        <>
            <PageHeader
                title="Form Pengajuan Lembur"
                mobileTitle="Pengajuan Lembur"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
            />
            <Gap height={20} />
            <Row>
                <Col>
                <Link to='/overtime' className="back-button" >                    
                    <Icon icon={iconLeft} color="#fff" />
                    <p>Back</p>
                </Link>
                </Col>
            
            </Row>
            <Gap height={20} />
        
            <WrapperFormRequest>
                <div className="fr-header">
                    Form Pengajuan Lembur
                </div>
                <div className="fr-body">
                <Formik enableReinitialize initialValues={initialValues}
                 validationSchema={RequestOvertimeValidationSchema}
                 onSubmit={(values, props) => handleSubmit(values, props)} >
                    {({errors, touched, isValid}) => (
                    <Form>
                         {
                            RequestOvertimeFields.map(field => (
                                // console.log(field)
                                <FormControl key={field.name}
                                    control={field.control}
                                    type={field.type}
                                    label={field.label}
                                    name={field.name}
                                    style={getStyle(errors, touched, field.name)}
                                    options={field.options}
                                    minDate={field.minDate || ""}
                                    callback={field.callback || ""}
                                />
                            ))
                        }    
                        <Button buttonFull buttonColor='var(--green)' align="right" buttonHover type="submit" 
                        disabled={!isValid || props.isLoading}
                        className={props.isLoading ? 'btnLoading' : null}>Ajukan</Button>
                    </Form>
                    )}
                </Formik>
                </div>
                <OverviewOvertimeRequest>
                <h3>
                    {overtimeDayType}
                </h3>
                </OverviewOvertimeRequest> 
               
            </WrapperFormRequest>
            <Gap height={50} />


        
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
export default connect(reduxState, reduxDispatch)(RequestOvertime)
