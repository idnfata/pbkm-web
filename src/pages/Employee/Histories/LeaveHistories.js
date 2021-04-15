import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconPlus, iconUser } from '../../../assets'
import { Col, FilterYear, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'
import { LeaveHistoriesContainer, LHPageTitleDesktop, LHPageTitleMobile, LHFilter, LHBalance, LHList } from './request-histories.elements'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import swal from 'sweetalert'
import { dayInDate, tahun_bulan_tanggal, timeStrToFormatIndo, totalDate, YMdToFormatIndo } from '../../../utils/helpers/date'

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const LeaveHistories = (props) => {
    // console.log(props)
    const history = props.history;
    const token = props.user.token;
    const employee = props.user.info;
    const [leaveHistories, setLeaveHistories] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState({});
    const [message, setMessage] = useState('');

    const year = (new Date()).getFullYear();
    const startYear = (new Date()).getFullYear() - 3;
    const [selectedYear, setSelectedYear] = useState(year);
    const cancelRequest = (id) => {
        console.log('cancell request', id);

        swal({
            title: "Anda yakin?",
            text: "Pengajuan Cuti Akan Dibatalkan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                // console.log('Call API delete Departemen');
                return API.deleteLeaveRequest(token, id).then(res => {
                    swal({
                        title: 'Berhasil',
                        text: 'Pengajuan Cuti Berhasil Dibatalkan',
                        icon: "success",
                      });
                    // console.log('call branch Data lagi');
                    //apa supaya tertriger use effectnya
                    API.getEmployeeLeaveHistories(token, employee.id, selectedYear).then((res) => {
                        // console.log(res.data);
                        setLeaveHistories(res.data)
                        
                        
                    }).catch(err => {
                        // console.log(err.response.data.message);
                        setLeaveHistories([]);
        
                        setMessage(err.response.data.message);
                    })
           
                }).catch(err => {
                    console.log(err);
                })
            }
          });
    }
 
    const handleClickLH = (leave) => {
        if(leave.status == 0){
            cancelRequest(leave.id)
        }else {
            // console.log('go to detail', leave.id)
            history.push(`/leave/detail`, {leave: leave})

        }
        
    }
    const handleChangeYearFilter = (e) => {
        setSelectedYear(e.target.value);
       
    }

    const goToLeaveForm = (leave, leave_taken) => {
        // console.log(history)
        if(leave_taken >= leave.balance){
            // alert('Jatah cuti sudah habis');
            swal({
                title: "Tidak Bisa",
                text: `Jatah ${leave.leave_type_name} Sudah Habis`,
                icon: "error",
            });

        }else {
            history.push(`/request/leave/${leave.leave_type}`, {leave: leave})

        }
        //ke halaman form request cuti
        //kirim state ke halaman tersebut
    }

    useEffect(() => {
        // console.log('request leave setup')
        
        API.getSetupLeaveGroup(token, employee.group_id, employee.id, selectedYear).then(res => {
            // console.log(res.data)
            setLeaveTypes(res.data)

            // console.log('request leave histories')
            // console.log('get leave histories year :', selectedYear)
            API.getEmployeeLeaveHistories(token, employee.id, selectedYear).then((res) => {
                // console.log(res.data);
                setLeaveHistories(res.data)
                
                
            }).catch(err => {
                // console.log(err.response.data.message);
                setLeaveHistories([]);

                setMessage(err.response.data.message);
            })
        }).catch(err => {
            setLeaveTypes([]);
            // console.log(err.response.data.message);
        })

    }, [selectedYear]);



        
        
    // console.log(Object.keys(leaveTypes).length === 0)




    return (
        <>
            <PageHeader
                title="Riwayat Cuti"
                subtitle={props.user.client_id}
                name={props.user.name}
                photo={iconUser}
                mobileTitle="Riwayat Cuti"
            />
            {/* <Gap height={20} /> */}
            <LeaveHistoriesContainer>
                <LHPageTitleMobile>
                    Jatah Cuti

                </LHPageTitleMobile>
                <LHPageTitleDesktop>

                    <Link to='/request' className="back-button" >                    
                        <Icon icon={iconLeft} color="#fff" />
                        <p>Back</p>
                    </Link>
                </LHPageTitleDesktop>
                <LHFilter>
                    <FilterYear year={year} startYear={startYear} selectedYear={selectedYear} handleChange={handleChangeYearFilter} />

                </LHFilter>
                {
 
                    Object.keys(leaveTypes).length > 0 ? <>
                    <LHBalance>
                    <span>klik untuk melakukan pengajuan</span>
  
                        <Swiper
                            spaceBetween={20}
                            // slidesPerView={4}
                            // navigation
                            // pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            // onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            className="leave-type-slide"
                            breakpoints={{
                                // when window width is >= 640px
                                400: {
                                width: 400,
                                slidesPerView: 3,
                                },
                                // when window width is >= 768px
                                1000: {
                                width: 1000,
                                slidesPerView: 4,
                                },
                            }}
                            >
                            
                            {leaveTypes.data.map(leave => (

                                <SwiperSlide key={leave.leave_type} className="leave-type-slide-item" onClick={() => goToLeaveForm(leave, leaveTypes[leave.leave_type])}>
                                    {/* <img src={`/images/${leave.photo}`} alt="photo" /> */}
                                    {/* {require(`/public/images/${leave.photo}`)} */}
                                    <p>{leave.leave_type_name}</p>
                                    {selectedYear < year ? null : <h3>{`${leaveTypes[leave.leave_type] != null ? leaveTypes[leave.leave_type] : "0"}/${leave.balance}`}</h3>}
                                    
                                </SwiperSlide>

                            ))}
                        </Swiper>
                        

                    
                    </LHBalance>
                    <LHList>
                        {
                        leaveHistories.length > 0 ? 
                        leaveHistories.map(leave => (
                            <div key={leave.id} className="lh-list-wrapper" onClick={() => handleClickLH(leave)}>
                                <div className="lh-status">
                                    {leave.status == 0 ? <p className="waiting">Menunggu Persetujuan</p> : leave.status == 1 ? <p className="accepted">Disetujui</p> : <p className="declined">Ditolak</p> }
                                   
                                </div>
                                
                                <h3>{`${leave.total_request_days} Hari ${leave.leave_type_name}`}</h3>
                                <div className="lh-total-days">
                                    {totalDate(leave.request_date_start, leave.request_date_end)}
                                    
                                </div>
                                <div className="lh-desc">
                                    {leave.employee_note}
                                </div>
                                <p className="lh-created-at">
                                    <span>Diajukan pada : </span>{timeStrToFormatIndo(leave.created_at)}
                                </p>
                                
                           
                               
                            </div>
                        ))
                        :
                            <h3>{message}</h3>
                        }
                    </LHList>
                    </>
                    :
                    <h3>Pengaturan cuti untuk grup kerja Anda belum diatur, Hubungi HR.</h3>
    
                }
                
                
            </LeaveHistoriesContainer>

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
export default connect(reduxState, reduxDispatch)(LeaveHistories)
