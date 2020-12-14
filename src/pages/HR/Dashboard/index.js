import React, { useEffect, useState } from 'react'
import { Col, DashboardHeader, Gap, PageHeader, Row, SubTitle } from '../../../components'
import { connect } from 'react-redux'
import { iconUser, notifImg } from '../../../assets'
import { setLoading } from '../../../config/redux/action'
import CircleChart from '../../../components/atoms/CircleChart'
import { greeting } from '../../../utils/helpers/greeting'
import { HRDashboardContainer, SectionPemberitahuan, SPDetail, SPTitle, SPSubTitle, SPDesc, SPButton, SPImg, SectionInfoKehadiran, InfoKehadiranUser, InfoTitle, SectionInfoCuti, InfoChart, SectionInfoSakit, SectionKaryawanTitle, SectionText, SectionLink, KaryawnaByGender, KaryawanByStatusKontrak, KaryawanKontrakBerakhir, KaryawanByStatusNikah, KaryawanByCabang, KaryawanByDivisi, RequestKaryawan, BuatTugasKaryawan, KehadiranText, OverviewKehadiran, ListTidakHadir, ListTelat, ListPulangAwal, UserProfile, UserPhoto } from './dashboard-hr.elements'

const HRDashboard = (props) => {
    console.log(props)

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
                    <SPSubTitle>1 Desember 2020, <span>08:30:20</span></SPSubTitle>
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
                        <p className="text-small">Kehadiran</p>
                        <p className="text-big">22</p>
                    </div>
                    <div>
                        <p className="text-small">Telat</p>
                        <p className="text-big">2</p>
                    </div>
                    <div>
                        <p className="text-small">Mangkir</p>
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
            <KaryawnaByGender>by gender</KaryawnaByGender>
            <KaryawanByStatusKontrak>by status kontrak</KaryawanByStatusKontrak>
            <KaryawanKontrakBerakhir>kontrak berakhir</KaryawanKontrakBerakhir>
            <KaryawanByStatusNikah>by status nikah</KaryawanByStatusNikah>
            <KaryawanByCabang>by cabang</KaryawanByCabang>
            <KaryawanByDivisi>by divisi</KaryawanByDivisi>
            <RequestKaryawan>request karyawan, lembur, izin, cuti, sakit</RequestKaryawan>
            <BuatTugasKaryawan>buat tugas untuk karyawan</BuatTugasKaryawan>
            <KehadiranText>
                <SectionText>Kehadiran</SectionText>
                <SectionLink to="/attendance/overview">see detail</SectionLink>
            </KehadiranText>
            <OverviewKehadiran>
                hadir, telat absen, cuti, izin, sakit, off
            </OverviewKehadiran>
            <ListTidakHadir>
                list tidak hadir
            </ListTidakHadir>
            <ListTelat>
                list telat
            </ListTelat>
            <ListPulangAwal>
                list pulang awal
            </ListPulangAwal>
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