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
import API from '../../../config/api'
import { format_tanggal_indo, hmsToSeconds, jam_menit_detik, secondsToHMS, tahun_bulan_tanggal } from '../../../utils/helpers/date'
import { greeting } from '../../../utils/helpers/greeting'
import DaftarTugas from './DaftarTugas'
import { SectionTitleDaftarTugas, SectionDaftarTugas, MenuRequest, TitleMenuRequest, ContentMenuRequest, LinkMenuRequest} from './dashboard-employee.elements'

const pemberitahuanJamKerja = (current_time, time_in, late_tolerance, time_break_start, break_duration, time_out, status) => {
    time_in = (time_in == '00:00:00') ? '24:00:00' : time_in;
    function z(n){return (n<10?'0':'') + n;}
    // let secs = Math.abs(current_time);
    // let jam = z(secs/3600 |0);
    // let menit = z((secs%3600) / 60 |0);
    // let detik = z(secs%60) + ' detik';
    if(status == 1){
         //apabila masuk jam istirahat
         if(hmsToSeconds(current_time) >= (hmsToSeconds(time_break_start) + (break_duration * 60))){
            // return 'masuk jam istirahat'
            let sisaPulang = hmsToSeconds(time_out) - hmsToSeconds(current_time);
            sisaPulang = z(sisaPulang%3600 / 60 |0);
            sisaPulang = sisaPulang > 0 ? sisaPulang + ' menit lagi jam pulang. <br /> <b>durasi kerja</b>' : 'Saatnya pulang. Tapi sebelum pulang absen keluar dulu, ya... <br /> <b>durasi kerja</b>';
            if(hmsToSeconds(current_time) >= (hmsToSeconds(time_out) - (60 * 5))){
                return `Yeay! ${sisaPulang}`
            }else {
                return `Sudah masuk jam istirahat. Istirahat dulu, yuk!`
            }
        }else {
            //Apabila belum masuk istirahat
            return 'Selamat Bekerja!';


        }


    }else if(status == 2){
        return `Selamat istirahat!`
    }else {
        // return 'belum absen';
        //apabila jam sekarang belum jam kerja
        let waktuSisa = hmsToSeconds(current_time) - hmsToSeconds(time_in);
        // console.log(waktuSisa);
        if(waktuSisa < 0){
            // return 'belum masuk jam kerja';
            let secs = Math.abs(waktuSisa)
            let jam = z(secs/3600 |0);
            jam = jam > 0 ? jam + ' jam ': '';
            let menit = z(secs%3600 / 60 |0);
            menit = menit > 0 ? menit + ' menit ' : '';
            let detik = z(secs%60) + ' detik';
            

            //jika waktu sisa lebih dari 5 menit
            if(secs > (60 * 5)){
                // return 'waktu sisa lebih dari 5 menit';
                return `<b>${jam + menit + detik}</b> lagi jam kerjamu. Jangan lupa untuk melakukan absensi.`;

            }else {
                // return 'waktu sisa kurang dari 5 menit';
                return `<b>${jam + menit + detik}</b> lagi jam kerjamu. Tapi kamu sudah bisa untuk melakukan absensi.`;

            }

        }else {
            //apabila masuk jam kerja
            // return 'sudha masuk jam kerja';
            let secs = Math.abs(waktuSisa)
            let jam = z(secs/3600 |0);
            jam = jam > 0 ? jam + ' jam ': '';
            let menit = z(secs%3600 / 60 |0);
            menit = menit > 0 ? menit + ' menit ' : '';
            let detik = z(secs%60) + ' detik';
            let sisa_toleransi = (late_tolerance * 60) - (secs);
            let jamTelat = z(Math.abs(sisa_toleransi)/3600 |0);
            let menitTelat = z(Math.abs(sisa_toleransi)%3600 / 60 |0);
            jamTelat = jamTelat > 0 ? jamTelat + ' jam ': '';
            menitTelat = menitTelat > 0 ? menitTelat + ' menit.': '';
            let jumlahTelat = jamTelat + menitTelat;
            

            //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
            if(hmsToSeconds(current_time) <= (hmsToSeconds(time_in) + (late_tolerance * 60))){
                // return 'jam kerja sudah lewat tapi masih ada toleransi telat';
                let textSudahMasuk = `Jam kerja sudah masuk${jam + menit} ${menit ? ' yang lalu' : ''}.`
                return `${textSudahMasuk} ${menit ? '' : '<br />'} Segera lakukan absen masuk sebelum jam ${secondsToHMS(hmsToSeconds(time_in) + (late_tolerance * 60))}.`;
            }else {
                //apabila jam kerja sudah lewat & toleransi telat sudah habis
                //apabila masuk jam istirahat
                if(hmsToSeconds(current_time) >= (hmsToSeconds(time_break_start) + (break_duration * 60))){
                    // return 'masuk jam istirahat'
             
                    if(hmsToSeconds(current_time) >= (hmsToSeconds(time_out) - (60 * 5))){
                        return `Kamu dianggap mangkir hari ini. Karena <b>tidak melakukan absen masuk</b> sampai jam kerja selesai.`
                    }else {
                        return `Sudah lewat jam istirahat. Kenapa belum melakukan absen masuk?`
                    }
                }else {
                    return `Toleransi keterlambatan habis. Segera lakukan absen masuk, kamu sudah telat${menitTelat ? '' : '.'} <b>${jumlahTelat}</b>`;

                }

            }
            //apabila jam kerja sudah lewat
                //apabila jam kerja sudah lewat & toleransi telat sudah habis
                    //apabila sudah absen
                        //apabila masuk jam istirahat
                        //apabila habis jam istirahat
                        //apabila masuk jam pulang
                        //apabila lewat jam pulang > 5 menit, auto absen pulang, kecuali ada jadwal lembur / 
                    //apabila belum absen
                        //apabila masuk jam istirahat
                        //apabila habis jam istirahat
                        //apabila di atas jam istirahat hanyar masuk, maka dianggap meambil cuti setengah hari
                        //apabila masuk jam pulang
                        
                        
        }

    }



    //pemberitahuan durasi kerja apabila sudah absen

    //pemberitahuan istirahat apabila jam sekarang sama dengan time_break_start + break_duration
    
    //pemberitahuan lanjut kerja lagi, yuk! apabila jam sekarang > time_break_start + break_duration 

    //pemberitahuan bersiap untuk pulang, apabila jam sekarang 10 menit lagi time_out


}

const buttonPemberitahuanJamKerja = (current_time, time_in, late_tolerance, time_break_start, break_duration, time_out, status) => {
    time_in = (time_in == '00:00:00') ? '24:00:00' : time_in;
    function z(n){return (n<10?'0':'') + n;}
    // let secs = Math.abs(current_time);
    // let jam = z(secs/3600 |0);
    // let menit = z((secs%3600) / 60 |0);
    // let detik = z(secs%60) + ' detik';
    // check apakah sudah absen
    if(status == 1){
        // return 'durasi kerja';
         //apabila masuk jam istirahat
         if(hmsToSeconds(current_time) >= (hmsToSeconds(time_break_start) + (break_duration * 60))){
            // return 'masuk jam istirahat'
            
            if(hmsToSeconds(current_time) >= (hmsToSeconds(time_out) - (60 * 5))){
                //apabila masuk jam pulang 
                return <SPButton to="/attendance/check-out">Absen Keluar</SPButton>
            }else {
                return `Durasi kerja tapi kada betambah(difreeze)`
            }
        }else {
            //Apabila belum masuk istirahat
            return 'Durasi Kerja';


        }

    }else {
        // return 'belum absen';
        //apabila jam sekarang belum jam kerja
        let waktuSisa = hmsToSeconds(current_time) - hmsToSeconds(time_in);
        // console.log(waktuSisa);
        if(waktuSisa < 0){
            // return 'belum masuk jam kerja';
            let secs = Math.abs(waktuSisa)

            //jika waktu sisa lebih dari 5 menit
            if(secs > (60 * 5)){
                // return 'waktu sisa lebih dari 5 menit';
                return <SPButton to="/schedule">Lihat Jadwal</SPButton>

            }else {
                // return 'waktu sisa kurang dari 5 menit';
                return <SPButton to="/attendance/check-in">Absen Masuk</SPButton>



            }

        }else {
            //apabila masuk jam kerja
            // return 'sudha masuk jam kerja';
            
            //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
            if(hmsToSeconds(current_time) <= (hmsToSeconds(time_in) + (late_tolerance * 60))){
                // return 'jam kerja sudah lewat tapi masih ada toleransi telat';
                return <SPButton to="/attendance/check-in" className="waktu-kerja-lewat">Absen Masuk</SPButton>
            }else {
                //apabila jam kerja sudah lewat & toleransi telat sudah habis
                //apabila masuk jam istirahat
                if(hmsToSeconds(current_time) >= (hmsToSeconds(time_break_start) + (break_duration * 60))){
                    // return 'masuk jam istirahat'
                    if(hmsToSeconds(current_time) >= (hmsToSeconds(time_out) - (60 * 5))){
                        return <SPButton to="/attendance/history">Riwayat Kehadiran</SPButton>
                    }else {
                        return <SPButton to="/attendance/check-in" className="waktu-kerja-dan-toleransi-lewat">Absen Masuk</SPButton>
                    }
                    
                }else {
                    return <SPButton to="/attendance/check-in" className="waktu-kerja-dan-toleransi-lewat">Absen Masuk</SPButton>
                }
                
                

            }
        }
    }


    
}

const EmployeeDashboard = (props) => {
    const {history, isLoading, loading, isLogin, user} = props;
    const [title, setTitle] = useState('');
    const [time, setTime] = useState(jam_menit_detik());
    const [isHaveScheduleToday, setIsHaveScheduleToday] = useState(false);
    const [schedule, setSchedule] = useState({});
    const today = new Date();
    const token = user.token;
    const employee = user.info;
    // console.log(props)

    useEffect(() => {
        setTitle(greeting())

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('This will run every second!');
            setTime(jam_menit_detik());
         }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        //check apakah ada jadwal hari ini
        API.checkTodayScheduleOfEmployee(token, employee.id, tahun_bulan_tanggal(today)).then(res => {
            console.log(res);
            setSchedule(res.data);
            setIsHaveScheduleToday(true);
        }).catch(err => {
            console.log(err.response.data.message)
            setIsHaveScheduleToday(false);
        })

        
    }, [])


   
    return (
        <>
        <PageHeader name={props.user.name} photo={iconUser} title={title} pathname={history.location.pathname} />
        <Gap height={20} />
        <EmployeeDashboardContainer>
            <SectionPemberitahuan>
                    <SPDetail>
                        <SPTitle>Informasi & Pemberitahuan</SPTitle>
                        <SPSubTitle>{format_tanggal_indo(today)}, <span>{time}</span></SPSubTitle>
                        <SPDesc>
                        
                        {
                            isHaveScheduleToday ? <p dangerouslySetInnerHTML={{__html: pemberitahuanJamKerja(time, schedule.time_in, schedule.late_tolerance, schedule.break_start, schedule.break_duration, schedule.time_out, schedule.status) }} />
                            : `Libur! Tidak ada jadwal kerja hari ini.`
                        }
                        </SPDesc>
                        {
                           isHaveScheduleToday ? buttonPemberitahuanJamKerja(time, schedule.time_in, schedule.late_tolerance, schedule.break_start, schedule.break_duration, schedule.time_out, schedule.status)
                           :    <SPButton to='/schedule'>Lihat Jadwal</SPButton>
                        }
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