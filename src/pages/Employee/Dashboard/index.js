import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { iconAdd, iconCalendar, iconCutTime, iconEdit, iconExchange, iconLate, iconLoan, iconOverTime, iconSick, iconUser, notifImg } from '../../../assets'
import { Gap, PageHeader, Row,
    InfoChart, InfoKehadiranUser, InfoTitle,
    SectionInfoCuti,
    SectionInfoKehadiran,
    SectionPemberitahuan,
    SPButton,
    SPDesc,
    SPDetail,
    SPImg,
    SPSubTitle,
    SPTitle,
    UserPhoto,
    UserProfile,
    CircleChart,
    SectionInfoSakit,
    EmployeeDashboardContainer,
    SectionText,
    SectionLink,
    Icon
} from '../../../components'
import { greeting } from '../../../utils/helpers/greeting'
import DaftarTugas from './DaftarTugas'
import { SectionTitleDaftarTugas, SectionDaftarTugas, MenuRequest, TitleMenuRequest, ContentMenuRequest, LinkMenuRequest} from './dashboard-employee.elements'

const EmployeeDashboard = (props) => {
    // console.log(props)
    const {history, isLoading, loading} = props;
    const [title, setTitle] = useState('');
    useEffect(() => {
        setTitle(greeting())
        // console.log(greeting())
    }, []);



   
    return (
        <>
        <PageHeader name={props.user.name} photo={iconUser} title={title} pathname={history.location.pathname} />
        <Gap height={20} />
        <EmployeeDashboardContainer>
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
                    <p className="user-name">{props.user.name}</p>
                    <p className="user-role">Staff IT</p>
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
            <SectionTitleDaftarTugas>
                <SectionText>
                    Daftar Tugas
                </SectionText>
                <SectionLink to="/task/list">
                    see all
                </SectionLink>
            </SectionTitleDaftarTugas>
            <SectionDaftarTugas>
              <DaftarTugas />
            </SectionDaftarTugas>

            <MenuRequest>
                <TitleMenuRequest>Buat Pengajuan <Link to="/request/history" className="link">Riwayat</Link></TitleMenuRequest>
                <ContentMenuRequest>
                    <LinkMenuRequest to="/request/leave/annual">
                        <h3>Cuti Tahunan</h3>
                        <Icon icon={iconCalendar} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/leave/sick">
                        <h3>Cuti Sakit</h3>
                        <Icon icon={iconSick} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/late">
                        <h3>Izin Telat</h3>
                        <Icon icon={iconLate} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/out-early">
                        <h3>Izin Pulang Duluan</h3>
                        <Icon icon={iconCutTime} color="#222" />
                    </LinkMenuRequest>
                  
                    <LinkMenuRequest to="/request/loan">
                        <h3>Pinjaman</h3>
                        <Icon icon={iconLoan} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/permit/switch-shift">
                        <h3>Tukar Shift</h3>
                        <Icon icon={iconExchange} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/overtime">
                        <h3>Lembur</h3>
                        <Icon icon={iconOverTime} color="#222" />
                    </LinkMenuRequest>
                    <LinkMenuRequest to="/request/edit-personal-data">
                        <h3>Ubah Data</h3>
                        <Icon icon={iconEdit} color="#222" />

                    </LinkMenuRequest>
                </ContentMenuRequest>
        
            </MenuRequest>
        </EmployeeDashboardContainer>
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
export default connect(reduxState, reduxDispatch)(EmployeeDashboard)