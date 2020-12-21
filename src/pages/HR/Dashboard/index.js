import React, { useEffect, useState } from 'react'
import { Col, DashboardHeader, Gap, Icon, PageHeader, Row, SubTitle } from '../../../components'
import { connect } from 'react-redux'
import { iconSick, iconUser, iconLate, iconCalendar, notifImg, iconCutTime, iconExchange, iconOverTime, iconLoan, iconEdit, iconLeft, iconRight, Avatar, LoginBg, Logo } from '../../../assets'
import { setLoading } from '../../../config/redux/action'
import CircleChart from '../../../components/atoms/CircleChart'
import { greeting } from '../../../utils/helpers/greeting'
import { HRDashboardContainer, SectionPemberitahuan, SPDetail, SPTitle, SPSubTitle, SPDesc, SPButton, SPImg, SectionInfoKehadiran, InfoKehadiranUser, InfoTitle, SectionInfoCuti, InfoChart, SectionInfoSakit, SectionKaryawanTitle, SectionText, SectionLink, KaryawanByGender, KaryawanByStatusKontrak, KaryawanByStatusNikah, KaryawanByCabang, RequestKaryawan, RequestDetail, BuatTugasKaryawan, KehadiranText, OverviewKehadiran, ListTidakHadir, ListTelat, RankKehadiran, UserProfile, UserPhoto, RequestTitle, ListRequestKaryawan, RequestMenu, LinkRequestMenu, TitleSectionKaryawan, ContentSectionKaryawan, KaryawanKontrakBerakhir, KaryawanLembur, PulangAwal } from './dashboard-hr.elements'
import { Link } from 'react-router-dom'
import { Doughnut, Pie } from 'react-chartjs-2'
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { dataRanking } from './data'

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;

                    //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text;
            var color = centerConfig.color || '#222';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

                    //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight);

                    //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
        }
    
    }
   
   
});

const HRDashboard = (props) => {

    console.log(props)
    const dataKehadiran = {
        labels: ['Hadir', 'Telat', 'Cuti', 'Sakit', 'Izin', 'Off'],
        datasets: [
            {
                data: [27, 4, 2, 3, 1, 3],
                backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)', 'rgba(60, 179, 113, .9)'],

            }
        ]

    };

    let dataAbsensi = [27, 4, 2, 3, 1, 3];
    let labelKehadiran = ['Hadir', 'Telat', 'Cuti', 'Sakit', 'Izin', 'Off'];
    let customLabels = labelKehadiran.map((label,index) =>`${label}: ${dataAbsensi[index]}`);

    const dataChartKehadiran = {
        labels: customLabels,
        datasets:[
            {
                label: "Ringkasan Kehadiran",
                backgroundColor: [
                    "rgba(60, 179, 113, .9)",
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#cc65fe",
                    "#3d3333",
                  ],
                  data: dataAbsensi,
            }
        ]
    };
    
    const optionsChartKehadiran = {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'right',
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
          elements: {
            center: {
              text: '70',
              sidePadding: 60
            }
          }
    };
    const dataCabang = {
        labels: ['Umum', 'Keuangan', 'Operasional'],
        datasets: [
            {
                // label: 'Sales for 2020 (M)',
                data: [6, 8, 31],
                backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)', 'rgba(60, 179, 113, .9)'],
            }
        ],
    };
    const optionsCabang = {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom',
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
          elements: {
            center: {
              text: '44',
              sidePadding: 60
            }
          }
    };
    const {history, isLoading, loading} = props;
    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle(greeting())
        // console.log(greeting())
    }, []);
   
    useEffect(() => {
        loading(true)
        setTimeout(() => {
            loading(false)
        }, 500)

    }, [])
    

    return (
        <>
        
        <PageHeader name={props.user.name} photo={iconUser} title={title} pathname={history.location.pathname} />
        <Gap height={20} />

        <HRDashboardContainer>
            <SectionPemberitahuan>
                <SPDetail>
                    <SPTitle>Informasi & Pemberitahuan</SPTitle>
                    <SPSubTitle>19 Desember 2020, <span>08:30:20</span></SPSubTitle>
                    <SPDesc>
                    30 menit lagi shift kerjamu, jangan lupa untuk melakukan absensi.
                    </SPDesc>
                    <SPButton to="/attendance/check-in">Absen Masuk</SPButton>
                    {/* Yeay, sebentar lagi pulang! sebelum pulang lengkapi laporan kerjamu terlebih dahulu */}
                </SPDetail>
                <SPImg src={notifImg} alt="notif-img" />

            </SectionPemberitahuan>
            <UserProfile>
                    <UserPhoto>
                        <img src={iconUser} alt="user-photo" className="user-photo" />
                    </UserPhoto>
                    <p className="user-name">Fatahillah Ibrahim</p>
                    <p className="user-role">Jabatan Karyawan</p>
                    {/* <p className="user-role">Lokasi Kerja karyawan</p> */}
            </UserProfile>
            <SectionInfoKehadiran>
        
                <InfoKehadiranUser>
                    <div>
                        <p className="text-small primary">Kehadiran</p>
                        <p className="text-big">22</p>
                    </div>
                    <div>
                        <p className="text-small primary">Telat</p>
                        <p className="text-big">2</p>
                    </div>
                    <div>
                        <p className="text-small primary">Mangkir</p>
                        <p className="text-big">1</p>
                    </div>
                </InfoKehadiranUser>
                
            </SectionInfoKehadiran>
            <SectionInfoCuti to="request/annual-leave">
                <InfoTitle>
                    <p className="text-small">Cuti tahunan terpakai</p>
                    <p className="text-big">20 <span> / 22</span></p>

                    {/* <button>Ajukan cuti tahunan</button> */}


                </InfoTitle>
                <InfoChart>
                    <CircleChart percentage="90" />
                </InfoChart>

            </SectionInfoCuti>
            <SectionInfoSakit to="/request/sick-leave">
                <InfoTitle>
                    <p className="text-small">Cuti sakit terpakai</p>
                    <p className="text-big">4 <span> / 22</span></p>



                </InfoTitle>
                <InfoChart>
                    <CircleChart percentage="20" />
                </InfoChart>

            </SectionInfoSakit>
            
            <SectionKaryawanTitle>
                <SectionText>Karyawan</SectionText>
                <SectionLink to="/employee/overview">see all</SectionLink>
            </SectionKaryawanTitle>
            <KaryawanByGender>
                <TitleSectionKaryawan>
                    Jenis Kelamin
                </TitleSectionKaryawan>
                <ContentSectionKaryawan>
                    <div className="male">
                        {/* <Icon icon={iconMale} color="var(--primary-color)" /> */}
                        <h4>33</h4>
                        <p>Laki-Laki</p>

                    </div>
                    <div className="female">
                        {/* <Icon icon={iconFemale} color="pink" /> */}
                        <h4>10</h4>
                        <p>Perempuan</p>

                    </div>

                </ContentSectionKaryawan>

            </KaryawanByGender>
            <KaryawanByStatusKontrak>
                <TitleSectionKaryawan>
                    Status Bekerja
                </TitleSectionKaryawan>
                <div>
                    <div>
                        <h3>26</h3>
                        <p>Tetap</p>
                    </div>
                    <div>
                        <h3>18</h3>
                        <p>Kontrak</p>
                    </div>
                    <div>
                        <h3>2</h3>
                        <p>Percobaan</p>
                    </div>
                    <div>
                        <h3>1</h3>
                        <p>Magang</p>
                    </div>
                </div>


            </KaryawanByStatusKontrak>
            <KaryawanKontrakBerakhir to="/employee/expiring-contract">
                <TitleSectionKaryawan>
                    Kontrak Berakhir
                </TitleSectionKaryawan>
                <ContentSectionKaryawan>
                        <h2>3</h2>
                        <p>Bulan Ini</p>
                </ContentSectionKaryawan>
            </KaryawanKontrakBerakhir>
            <KaryawanByStatusNikah>
                <TitleSectionKaryawan>
                   Status Nikah
                </TitleSectionKaryawan>
                <ContentSectionKaryawan>
                    <div>
                        <h4>30</h4>
                        <p>Menikah</p>
                    </div>
                    <div>
                        <h4>13</h4>
                        <p>Single</p>
                    </div>
                </ContentSectionKaryawan>
            </KaryawanByStatusNikah>
            <KaryawanByCabang>
                <TitleSectionKaryawan>
                   Total Karyawan
                </TitleSectionKaryawan>
                <ContentSectionKaryawan>
                    <Doughnut data={dataCabang} options={optionsCabang} />

                </ContentSectionKaryawan>

            </KaryawanByCabang>
           
            <ListRequestKaryawan>
                <TitleSectionKaryawan>Pengajuan Karyawan <Link to="/request" className="link">See All</Link></TitleSectionKaryawan>
                {/* <div> */}
                    <div>
                        <p>Cuti</p>
                        <h4>2</h4>
                    </div>
                    <div>
                        <p>Izin</p>
                        <h4>1</h4>
                    </div>
                    <div>
                        <p>Ubah Data</p>
                        <h4>0</h4>
                    </div>
                    <div>
                        <p>Pinjaman</p>
                        <h4>3</h4>
                    </div>
                    <div>
                        <p>Penggantian Biaya</p>
                        <h4>3</h4>
                    </div>
                    <div>
                        <p>Lembur</p>
                        <h4>3</h4>
                    </div>
                {/* </div> */}
            </ListRequestKaryawan>
            <RequestMenu>
                <RequestTitle>
                    <SectionText>Buat Pengajuan</SectionText>
                    <SectionLink to="/request">Riwayat</SectionLink>
                </RequestTitle>
                <RequestDetail>
                    <LinkRequestMenu to="/request/leave/annual">
                        <h3>Cuti Tahunan</h3>
                        <Icon icon={iconCalendar} color="#222" />
                    </LinkRequestMenu>
                    <LinkRequestMenu to="/request/leave/sick">
                        <h3>Cuti Sakit</h3>
                        <Icon icon={iconSick} color="#222" />
                    </LinkRequestMenu>
                    <LinkRequestMenu to="/permit/late">
                        <h3>Izin Telat</h3>
                        <Icon icon={iconLate} color="#222" />
                    </LinkRequestMenu>
                    <LinkRequestMenu to="/permit/out-early">
                        <h3>Izin Pulang Duluan</h3>
                        <Icon icon={iconCutTime} color="#222" />
                    </LinkRequestMenu>
                  
                    <LinkRequestMenu to="/request/loan">
                        <h3>Pinjaman</h3>
                        <Icon icon={iconLoan} color="#222" />
                    </LinkRequestMenu>
                    <LinkRequestMenu to="/permit/switch-shift">
                        <h3>Tukar Shift</h3>
                        <Icon icon={iconExchange} color="#222" />
                    </LinkRequestMenu>
                    <LinkRequestMenu to="/request/overtime">
                        <h3>Lembur</h3>
                        <Icon icon={iconOverTime} color="#222" />

                    </LinkRequestMenu>
                    <LinkRequestMenu to="/request/edit-personal-data">
                        <h3>Ubah Data</h3>
                        <Icon icon={iconEdit} color="#222" />

                    </LinkRequestMenu>
        
                </RequestDetail>
            </RequestMenu>
            <BuatTugasKaryawan>
                <h3>
                    Sampaikan Sesuatu
                </h3>
                {/* <p>Sampaikan tugas atau pengumuman kepada karyawan</p> */}
                <div>
                    <Link to="/create-announcement" className="button-link">Pengumuman</Link>
                    <Link to="/create-task" className="button-link">Tugas</Link>
                </div>
            </BuatTugasKaryawan>
            <KehadiranText>
                <SectionText>Kehadiran</SectionText>
                {/* <SectionLink to="/attendance/overview">see detail</SectionLink> */}
                <input type="date" />
            </KehadiranText>
            <OverviewKehadiran>
                <h3>
                   Ringkasan Kehadiran
                </h3>
                <div>
                    <Pie data={dataChartKehadiran} options={optionsChartKehadiran} width="400" height="205" />
                
                </div>
                <div className="total-kehadiran">
                    <h4>32 <span> / 43</span></h4>
                    <p>Absensi</p>  
                </div>
            </OverviewKehadiran>
            <ListTidakHadir>
                <h3>
                    Karyawan Tidak Hadir
                </h3>
                <div className="wrapper-list">
                    <div className="ringkasan-list">
                        <div className="total-list">
                            <h2>3</h2>
                        </div>
                        <div className="detail-list">
                            <div className="umum-jumlah">
                                <h4>0</h4>
                                <p>Umum</p>
                            </div>
                            <div className="keuangan-jumlah">
                                <h4>1</h4>
                                <p>Keuangan</p>
                            </div>
                            <div className="operasional-jumlah">
                                <h4>2</h4>
                                <p>Operasional</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className="list-item">
                        1
                    </div>
                    <div className="list-item">
                        2
                    </div>
                    <div className="list-item">
                        3
                    </div>
                    <div className="list-item">
                        4
                    </div>
                    <div className="list-item">
                        5
                    </div>
               </div>
                {/* photo, nama, jabatan, divisi, off/cuti/sakit/izin */}
                    
            
            </ListTidakHadir>
            <ListTelat>
                <h3>
                    Karyawan Telat
                </h3>
                
                <div className="wrapper-list">
                    <div className="ringkasan-list">
                        <div className="total-list">
                            <h2>6</h2>
                        </div>
                        <div className="detail-list">
                            <div className="umum-jumlah">
                                <h4>1</h4>
                                <p>Umum</p>
                            </div>
                            <div className="keuangan-jumlah">
                                <h4>1</h4>
                                <p>Keuangan</p>
                            </div>
                            <div className="operasional-jumlah">
                                <h4>4</h4>
                                <p>Operasional</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className="list-item">
                        1
                    </div>
                    <div className="list-item">
                        2
                    </div>
                    <div className="list-item">
                        3
                    </div>
                    <div className="list-item">
                        4
                    </div>
                    <div className="list-item">
                        5
                    </div>
                </div>
                
                    {/* photo, nama, jabatan, divisi, jumlah telat */}
                
            </ListTelat>
            <RankKehadiran>
                <h3>
                Ranking Kedisiplinan Kehadiran
                </h3>
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
            </RankKehadiran>
            <KaryawanLembur>
                <h3>Karyawan Lembur</h3>
                <div className="avatar-group">
                    <div className="hidden-avatars">7</div>
                    
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                </div>
            </KaryawanLembur>
            <PulangAwal>
                <h3>Pulang Duluan</h3>
                <div className="avatar-group">
                    <div className="hidden-avatars">10</div>
                    
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                    <div className="avatar">
                        <img src={`/images/avatar.jpg`} alt="avatar" />
                    </div>
                </div>
            </PulangAwal>
        </HRDashboardContainer>
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
export default connect(reduxState, reduxDispatch)(HRDashboard)