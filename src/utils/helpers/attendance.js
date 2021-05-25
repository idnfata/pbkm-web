import { hmsToSeconds, secondsToHMS } from "./date";

const attendanceText = (current_time, schedule, attendance) => {
    schedule.attTimeIn = (schedule.attTimeIn == '00:00:00') ? '24:00:00' : schedule.attTimeIn;
    function z(n){return (n<10?'0':'') + n;}
    // let secs = Math.abs(current_time);
    // let jam = z(secs/3600 |0);
    // let menit = z((secs%3600) / 60 |0);
    // let detik = z(secs%60) + ' detik';
    if(attendance == null){ //jika belum absen
        // return "attendance text belum absen"
        //apabila jam sekarang belum jam kerja
        let waktuSisa = hmsToSeconds(current_time) - hmsToSeconds(schedule.attTimeIn);
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
            menit = menit > 0 ? ' '+ menit + ' menit ' : '';
            let detik = z(secs%60) + ' detik';
            let sisa_toleransi = (schedule.attLateTolerance * 60) - (secs);
            let jamTelat = z(Math.abs(sisa_toleransi)/3600 |0);
            let menitTelat = z(Math.abs(sisa_toleransi)%3600 / 60 |0);
            jamTelat = jamTelat > 0 ? jamTelat + ' jam ': '';
            menitTelat = menitTelat > 0 ? menitTelat + ' menit.': '';
            let jumlahTelat = jamTelat + menitTelat;
            

            //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
            if(hmsToSeconds(current_time) <= (hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))){
                // return 'jam kerja sudah lewat tapi masih ada toleransi telat';
                let textSudahMasuk = `Jam kerja sudah masuk${jam + menit} ${menit ? ' yang lalu' : ''}.`
                return `${textSudahMasuk} ${menit ? '' : '<br />'} Segera lakukan absen masuk sebelum jam ${secondsToHMS(hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))}.`;
            }else {
                //apabila jam kerja sudah lewat & toleransi telat sudah habis
                //apabila masuk jam istirahat
                if(hmsToSeconds(current_time) >= (hmsToSeconds(schedule.attBreakStart) + (schedule.attBreakDuration * 60))){
                    // return 'masuk jam istirahat'
             
                    if(hmsToSeconds(current_time) >= (hmsToSeconds(schedule.attTimeOut) - (60 * 5))){
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

    }else { //jika sudah absen
        // console.log(attendance)
        // console.log(schedule)
        if(attendance.time_out !== null) {
            return  `Terima kasih, selamat istirahat!`
        }else {
            // return "attendance text sudah absen"
            //apabila masuk jam istirahat
    
            if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_break_start))){
                // return 'masuk jam istirahat'
                
                let sisaPulang = hmsToSeconds(attendance.time_out_schedule) - hmsToSeconds(current_time);
                sisaPulang = z(sisaPulang%3600 / 60 |0);
                sisaPulang = sisaPulang > 0 ? sisaPulang + ' menit lagi jam pulang. <br /> <b>durasi kerja</b>' : 'Saatnya pulang. Tapi sebelum pulang absen keluar dulu, ya... <br /> <b>durasi kerja</b>';
                //apabila lewat jam istirahat
    
                if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))) {
                    if(hmsToSeconds(attendance.time_in) >= (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))){
                        // console.log('absen di atas jam istirahat')
                        if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_out_schedule))){
                            //apabila masuk jam pulang 
                            return `Yeay, saatnya pulang!`
                        }else {
                            return `Absen di atas jam istirahat. Selamat Bekerja!`;
                        }
    
                    } else {
                        if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_out_schedule))){
                            //apabila masuk jam pulang 
                            return `Yeay, saatnya pulang!`
                        }else {
                            return 'Selamat Bekerja Kembali!';
    
                        }
                    }
                }else if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_out_schedule) - (60 * 5))){
                    return `Yeay! ${sisaPulang}`
                }else {
                     //apabila belum lewat jam istirahat
                     
                     //check apakah absennya di atas jam istirahat
                    if(hmsToSeconds(attendance.time_in) >= (hmsToSeconds(attendance.time_break_start))){
                        return `Absen pada saat jam istirahat. Durasi kerja tidak akan berjalan pada saat jam istirahat`;
    
                    }else {
                        return `Sudah masuk jam istirahat. Istirahat dulu, yuk!`
                    }
                }
            }else {
                //Apabila belum masuk istirahat
                return `Selamat Bekerja!`;
    
    
            }

        }

    }
    



    //pemberitahuan durasi kerja apabila sudah absen

    //pemberitahuan istirahat apabila jam sekarang sama dengan schedule.attBreakStart + schedule.attBreakDuration
    
    //pemberitahuan lanjut kerja lagi, yuk! apabila jam sekarang > schedule.attBreakStart + schedule.attBreakDuration 

    //pemberitahuan bersiap untuk pulang, apabila jam sekarang 10 menit lagi time_out


}

const overtimeText = (current_time, schedule, attendance) => {
    schedule.attTimeIn = (schedule.attTimeIn == '00:00:00') ? '24:00:00' : schedule.attTimeIn;
    function z(n){return (n<10?'0':'') + n;}
    // let secs = Math.abs(current_time);
    // let jam = z(secs/3600 |0);
    // let menit = z((secs%3600) / 60 |0);
    // let detik = z(secs%60) + ' detik';
    if(attendance == null){ //jika belum absen
        // return "attendance text belum absen"
        //apabila jam sekarang belum jam kerja
        let waktuSisa = hmsToSeconds(current_time) - hmsToSeconds(schedule.attTimeIn);
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
                return `<b>${jam + menit + detik}</b> sebelum masuk jadwal lembur. Jangan lupa untuk melakukan absen lembur.`;

            }else {
                // return 'waktu sisa kurang dari 5 menit';
                return `<b>${jam + menit + detik}</b> lagi jam lemburmu. Tapi kamu sudah bisa untuk melakukan absensi.`;

            }

        }else {
            //apabila masuk jam kerja
            // return 'sudha masuk jam kerja';
            let secs = Math.abs(waktuSisa)
            let jam = z(secs/3600 |0);
            jam = jam > 0 ? jam + ' jam ': '';
            let menit = z(secs%3600 / 60 |0);
            menit = menit > 0 ? ' '+ menit + ' menit ' : '';
            let detik = z(secs%60) + ' detik';
            let sisa_toleransi = (schedule.attLateTolerance * 60) - (secs);
            let jamTelat = z(Math.abs(sisa_toleransi)/3600 |0);
            let menitTelat = z(Math.abs(sisa_toleransi)%3600 / 60 |0);
            jamTelat = jamTelat > 0 ? jamTelat + ' jam ': '';
            menitTelat = menitTelat > 0 ? menitTelat + ' menit.': '';
            let jumlahTelat = jamTelat + menitTelat;
            

            //pemberitahuan jam kerja sudah lewat, tapi masih ada late tolerance
            if(hmsToSeconds(current_time) <= (hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))){
                // return 'jam kerja sudah lewat tapi masih ada toleransi telat';
                let textSudahMasuk = `Jam lembur sudah masuk${jam + menit} ${menit ? ' yang lalu' : ''}.`
                return `${textSudahMasuk} ${menit ? '' : '<br />'} Segera lakukan absen masuk lembur sebelum jam ${secondsToHMS(hmsToSeconds(schedule.attTimeIn) + (schedule.attLateTolerance * 60))}.`;
            }else {
                //apabila jam kerja sudah lewat & toleransi telat sudah habis
                //apabila masuk jam istirahat
                if(hmsToSeconds(current_time) >= (hmsToSeconds(schedule.attBreakStart) + (schedule.attBreakDuration * 60))){
                    // return 'masuk jam istirahat'
             
                    if(hmsToSeconds(current_time) >= (hmsToSeconds(schedule.attTimeOut) - (60 * 5))){
                        return `Kamu <b>tidak melakukan absen masuk lembur</b> sampai jam lembur selesai.`
                    }else {
                        return `Sudah lewat jam istirahat lembur. Kenapa belum melakukan absen masuk lembur?`
                    }
                }else {
                    return `Toleransi keterlambatan habis. Segera lakukan absen masuk lembur, kamu sudah telat${menitTelat ? '' : '.'} <b>${jumlahTelat}</b>`;

                }

            }

                        
        }

    }else { //jika sudah absen
        // console.log(attendance)
        // console.log(schedule)
        if(attendance.time_out !== null) {
            return  `Terima kasih, selamat istirahat!`
        }else {
            attendance.ends_on = (attendance.ends_on == '00:00:00') ? '24:00:00' : attendance.ends_on;

            // console.log(attendance)
             // return "attendance text sudah absen"
            if(hmsToSeconds(current_time) < (hmsToSeconds(attendance.time_break_start))){ // belum masuk jam istirahat
                return `Selamat Bekerja!`;
            }else {
                
                let sisaPulang = hmsToSeconds(attendance.ends_on) - hmsToSeconds(current_time);
                // console.log(sisaPulang)
                // sisaPulang = z(sisaPulang%3600 / 60 |0);
                if(sisaPulang > 0){
                    if(sisaPulang <= (60*15)){ //jika sisaPulang kurang dari 15 menit
                        return `${z(sisaPulang%3600 / 60 |0)} menit lagi lemburmu selesai. <br /> <b>${secondsToHMS(hmsToSeconds(current_time) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}</b>`
                    }else {
                     
                        if(hmsToSeconds(current_time) >= (hmsToSeconds(attendance.time_break_start) + (attendance.break_duration * 60))) { // lewat jam istirahat
                            return 'Selamat Bekerja Kembalii!';
        
                        }else { 
                            //apabila belum lewat jam istirahat
                     
                            //check apakah absennya di atas jam istirahat
                            if(hmsToSeconds(attendance.time_in) >= (hmsToSeconds(attendance.time_break_start))){
                                return `Absen pada saat jam istirahat. Durasi lembur tidak akan berjalan pada saat jam istirahat`;
            
                            }else {
                                return `Sudah masuk jam istirahat. Istirahat dulu, yuk!`
                            }
                            
        
                            
                            
                        }
                        
                    }
                   
                }else {
                    return `Saatnya pulang. Tapi sebelum pulang absen keluar dulu, ya... <br /> <b>${secondsToHMS(hmsToSeconds(attendance.ends_on) - (hmsToSeconds(attendance.time_in)) - (attendance.break_duration * 60))}</b>`
                }
                
               
    
    
            }

        }
        

    }

}


function toRadian(degree) {
    return degree*Math.PI/180;
}

function getDistance(origin, destination) {
    // console.log(destination)
    // return distance in meters
    let lon1 = toRadian(origin[1]),
        lat1 = toRadian(origin[0]),
        lon2 = toRadian(destination[1]),
        lat2 = toRadian(destination[0]);

    let deltaLat = lat2 - lat1;
    let deltaLon = lon2 - lon1;

    let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let EARTH_RADIUS = 6371;
    let distance  = c * EARTH_RADIUS * 1000 
    return distance
    // return Math.abs(distance) > 999 ? Math.sign(distance)*((Math.abs(distance)/1000).toFixed(1)) + ' KM' : Math.sign(distance)*Math.abs(distance).toFixed(0) + ' meter'
    // return km.toFixed(1) + ' KM';



}


export {
    attendanceText,
    getDistance,
    overtimeText
}