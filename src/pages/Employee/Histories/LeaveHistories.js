import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconLeft, iconPlus, iconUser } from '../../../assets'
import { Col, Gap, Icon, PageHeader, Row } from '../../../components'
import API from '../../../config/api'
import { LeaveHistoriesContainer, LHPageTitleDesktop, LHPageTitleMobile, LHRequestButton, LHBalance } from './request-histories.elements'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

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
        name: 'Benjamin',
        photo: 'avatar.jpg'
    }
]

const LeaveHistories = (props) => {
    // console.log(props)
    const token = props.user.token;
    const employee = props.user.info;
    const [overtimes, setOvertimes] = useState([]);
    const [message, setMessage] = useState('');




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
                <LHRequestButton>
                    <Link to='/request/leave' className="add-button">
                        <Icon icon={iconPlus} color="#fff" marginRight="10px" />
                        Ajukan

                    </Link>
                </LHRequestButton>
                <LHBalance>
                {/* <h3>
                Ranking Kedisiplinan Kehadiran
                </h3> */}
                <div className="slide-container">
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={5}
                        navigation
                        pagination={{ clickable: true }}
                        // scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        className="slide-wrapper"
                        >
                        
                        {dataRanking.map(user => (

                            <SwiperSlide key={user.id} className="slide-item">
                                <img src={`/images/${user.photo}`} alt="photo" />
                                {/* {require(`/public/images/${user.photo}`)} */}
                                <p>
                                    {user.name}
                                </p>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                    
                </div>
            </LHBalance>
            </LeaveHistoriesContainer>
            
            tombol tambah di destop dan mobile <br />
                jenis cuti swipe right <br />
                title filter <br />
                select option filter (month) <br />
                card riwayat Cuti max-height 80vh
            {/* <Row>
                

                
            </Row> */}
            halaman history cuti
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
