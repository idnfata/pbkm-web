import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconPlus, iconUser } from '../../../assets'
import { Col, FilterYear, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'
import { LeaveHistoriesContainer, LHPageTitleDesktop, LHPageTitleMobile, LHFilter, LHBalance } from './request-histories.elements'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import swal from 'sweetalert'

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const dataRanking = [
    {
        id: '1',
        name: 'John Doe',
        photo: 'avatar.jpg'
    },
    {
        id: '2',
        name: 'Miskha',
        photo: 'avatar.jpg'
    },
    {
        id: '3',
        name: 'Sindy',
        photo: 'avatar.jpg'
    },
    {
        id: '4',
        name: 'Pedro',
        photo: 'avatar.jpg'
    },
    {
        id: '5',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '6',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '7',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '8',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '9',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '10',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '11',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '12',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '13',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '14',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '15',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '16',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '17',
        name: 'Bella',
        photo: 'avatar.jpg'
    },
    {
        id: '18',
        name: 'Benjamin',
        photo: 'avatar.jpg'
    }
]

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
            console.log(res.data)
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
                    <Row>
                        {
                        leaveHistories.length > 0 ? 
                        leaveHistories.map(leave => (
                            <div key={leave.id}>
                                {leave.leave_type}
                            </div>
                        ))
                        :
                            <h3>{message}</h3>
                        }
                    </Row>
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
