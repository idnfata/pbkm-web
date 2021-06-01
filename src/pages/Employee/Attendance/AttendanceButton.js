import React from 'react'
import { useHistory } from 'react-router-dom';
import { hmsToSeconds, secondsToHMS } from '../../../utils/helpers/date';
import { AttendanceRecordButton } from './attendance.elements';


const AttendanceButton = (current_time, schedule, attendance, absenMasuk, absenPulang) => {
    // console.log(schedule)
    // console.log(attendance)
    // console.log(current_time)
    const history = useHistory();

    const renderButton = () => {
        // console.log(schedule)

        // jika ada lembur
        if(attendance == null){ //jika belum absen
            // console.log('belum absen')
            schedule.attTimeIn = (schedule.attTimeIn == '00:00:00') ? '24:00:00' : schedule.attTimeIn;

           
            let waktuSisa = hmsToSeconds(current_time) - hmsToSeconds(schedule.attTimeIn);
            // console.log(waktuSisa)
            if(waktuSisa < 0){
                // console.log('belum masuk jam kerja')
                let secs = Math.abs(waktuSisa)
                //jika waktu sisa lebih dari 5 menit
                if(secs > (60 * 5)){
                    // console.log('waktu sisa lebih dari 5 menit')
                    return <AttendanceRecordButton onClick={() => history.push('/schedule')}>Lihat Jadwal</AttendanceRecordButton>

                }else {
                    // console.log('waktu sisa kurang dari 5 menit')
                    return <AttendanceRecordButton onClick={() => absenMasuk()}>Absen Masuk</AttendanceRecordButton>
                    // return <button onClcik={() => API.addAttendance()}>Absen Masuk</button>



                }

            }else { //apabila masuk jam kerja
                // console.log('sudah masuk jam kerja')
                
                //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
                if(hmsToSeconds(current_time) <= (hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))){
                    // console.log('jam kerja sudah lewat tapi masih ada toleransi telat')
                    
                    return <AttendanceRecordButton onClick={() => absenMasuk()} className="waktu-kerja-lewat">Absen Masuk</AttendanceRecordButton>
    
                }else { //apabila jam kerja sudah lewat & toleransi telat sudah habis
                    //cek dulu apakah sudah masuk jam pulang
                    if(hmsToSeconds(current_time) <= (hmsToSeconds(schedule.attTimeOut) - (60 * 60))){
                        // console.log('belum masuk jam pulang')
                        return <AttendanceRecordButton className="waktu-kerja-dan-toleransi-lewat" onClick={() => absenMasuk()}>Absen Masuk</AttendanceRecordButton>

                    }else {
                        // console.log('sudah masuk jam pulang')
                        return <AttendanceRecordButton onClick={() => history.push('/schedule')}>Riwayat Kehadiran</AttendanceRecordButton>


                    }
    
                }
            }


        }else { //jika sudah absen
            if(attendance.time_out !== null) {
                // console.log('total durasi kerja');
                return <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(attendance.time_out_schedule) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}`}</AttendanceRecordButton>
            }else {
                // console.log('sudah absen, tampil durasi kerja');
    
                if(hmsToSeconds(current_time) < (hmsToSeconds(attendance.time_break_start))){ 
                    // console.log('belum masuk istirahat')
                    return <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(current_time) - hmsToSeconds(attendance.time_in))}`}</AttendanceRecordButton>
    
                }else { //'masuk jam istirahat'
                    // console.log('jam istirahat')
                    if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))) { // lewat jam istirahat
                        // console.log('jam istirahat lewat')
                        if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_out_schedule))){ // apabila masuk jam pulang 
                            // console.log('masuk jam pulang, button pulang')
                            return <AttendanceRecordButton onClick={() => absenPulang()}>Absen Pulang</AttendanceRecordButton>
                        }else {
                            // console.log('durasi kerja setelah jam istirahat')
                            if(hmsToSeconds(attendance.time_in) > (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))){ //jika absen di atas jam istirahat
                                
                                return  <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(current_time) - (hmsToSeconds(attendance.time_in)))}`}</AttendanceRecordButton>;
                            }else {
                                return  <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(current_time) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}`}</AttendanceRecordButton>;

                            }
    
    
    
                        }
    
                    }else { //apabila belum lewat jam istirahat
                        // console.log('masih jam istirahat')
                        if(hmsToSeconds(attendance.time_break_start) - hmsToSeconds(attendance.time_in) < 0){
                            // console.log('minus')
                            return <AttendanceRecordButton>00:00:00</AttendanceRecordButton>
    
                        }else {
                            // console.log('istirahat')
                            // berapa jumlah durasi kerja dari awal masuk sebelum jam istirahat
                        
                            return <AttendanceRecordButton>{secondsToHMS(hmsToSeconds(attendance.time_break_start) - hmsToSeconds(attendance.time_in))}</AttendanceRecordButton>
                            // return <AttendanceRecordButton>{`${secondsToHMS(hmsToSeconds(current_time) - (hmsToSeconds(attendance.time_in)))}`}</AttendanceRecordButton>
    
                        }
                        
                    }
                }

            }

        }
    }

    return (
        <>
            {renderButton()}
        </>
    )
}

export default AttendanceButton
