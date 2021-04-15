

const format_tanggal_indo = (date) => {
    // console.log(date)
    let tanggal = date.getDate();
    let bulan = date.getMonth() + 1;
    let tahun = date.getFullYear();
    if(tanggal<10) 
    {
        tanggal='0'+tanggal;
    } 

    if(bulan<10) 
    {
        bulan='0'+bulan;
    } 
    // date = mm+'-'+dd+'-'+yyyy;
    // console.log(date);
    // date = mm+'/'+dd+'/'+yyyy;
    // console.log(date);
    // date = dd+'-'+mm+'-'+yyyy;
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
    // const tahun = date.split("-")[2];
    // const bulan = date.split("-")[1];
    // const tanggal = date.split("-")[0];
 
    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

const tanggal_bulan_tahun = (date) => {
    
    let tanggal = date.getDate();
    let bulan = date.getMonth() + 1;
    let tahun = date.getFullYear();
    if(tanggal<10) 
    {
        tanggal='0'+tanggal;
    } 

    if(bulan<10) 
    {
        bulan='0'+bulan;
    } 
    date = tanggal+'-'+bulan+'-'+tahun;
    return date;

}

const getTotalHours = (time_1, time_2) => {
    const time1 = time_1.split(':');
    const time2 = time_2.split(':');

    const hours1 = parseInt(time1[0], 10);
    const hours2 = parseInt(time2[0], 10);
    const mins1 = parseInt(time1[1], 10);
    const mins2 = parseInt(time2[1], 10);
    
    let hours = hours2 - hours1;
    let mins;
    

    if(mins2 >= mins1) {
        mins = mins2 - mins1;
        // console.log(mins)
    }
    else {
        mins = (mins2 + 60) - mins1;
        hours--;
    }
    // console.log('mins :', mins);
    mins = mins / 60; // take percentage in 60
    // console.log('mins :', mins);
    if(hours <= 0){
        hours = 24 + hours;
        if(mins > 0) {
            hours -= 24;
        }
    }
    hours += mins;
    // console.log(hours);
    hours = hours.toFixed(2);
    return hours;
}

const YMdToFormatIndo = (date) => {
    let b = date.split('-');
    let tanggal = b[2];
    let bulan = b[1];
    let tahun = b[0];
    // if(tanggal<10) 
    // {
    //     tanggal='0'+tanggal;
    // } 

    // if(bulan<10) 
    // {
    //     bulan='0'+bulan;
    // } 
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];

    return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
}

const YMdtoDateMonth = (date) => {
    let b = date.split('-');
    let tanggal = b[2];
    let bulan = b[1];
    let tahun = b[0];
    const bulanIndo = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September' , 'Oktober', 'November', 'Desember'];
    return tanggal + " " + bulanIndo[Math.abs(bulan)];


}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

const jam_menit_detik = () => {
    
    let today = new Date();
    let curr_hour = today.getHours();
    let curr_minute = today.getMinutes();
    let curr_second = today.getSeconds();

    curr_hour = checkTime(curr_hour);
    curr_minute = checkTime(curr_minute);
    curr_second = checkTime(curr_second);
    return curr_hour + ":" + curr_minute + ":" + curr_second;

}
const tahun_bulan_tanggal = (date) => {
    // date = new Date()
    // console.log(date)

    let tanggal = date.getDate();
    let bulan = date.getMonth() + 1;
    let tahun = date.getFullYear();
    if(tanggal<10) 
    {
        tanggal='0'+tanggal;
    } 

    if(bulan<10) 
    {
        bulan='0'+bulan;
    } 
    date = tahun+'-'+bulan+'-'+tanggal;
    return date;

}

const apakahHariMinggu = (hari) => {
    if (hari == 0)
    {
       return true;
    } 
    
}

const bulan_indo = (month) => {
    // console.log(month)
    switch(parseInt(month)) {
        case 0: return "Januari"; break;
        case 1: return "Februari"; break;
        case 2: return "Maret"; break;
        case 3: return "April"; break;
        case 4: return "Mei"; break;
        case 5: return "Juni"; break;
        case 6: return "Juli"; break;
        case 7: return "Agustus"; break;
        case 8: return "September"; break;
        case 9: return "Oktober"; break;
        case 10: return "November"; break;
        case 11: return "Desember"; break;
        default : null;
    }
}

const getTotalDay = (bulan, tahun) => {
    return new Date(tahun, bulan, 0).getDate();
}

const hmsToSeconds = (s) => {
    // console.log(s)
    let b = s.split(':');
    return b[0]*3600 + b[1]*60 + (+b[2] || 0);
}

const secondsToHMS = (secs) => {
    function z(n){return (n<10?'0':'') + n;}
    let sign = secs < 0? '-':'';
    secs = Math.abs(secs);
    return sign + z(secs/3600 |0) + ':' + z((secs%3600) / 60 |0) + ':' + z(secs%60);
}


const nama_hari = (hari) => {
    switch(hari) {
        case 0: return "Minggu"; break;
        case 1: return "Senin"; break;
        case 2: return "Selasa"; break;
        case 3: return "Rabu"; break;
        case 4: return "Kamis"; break;
        case 5: return "Jum'at"; break;
        case 6: return "Sabtu"; break;
    }
}
export function getDaysInMonth(year, month) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
}

const totalDate = (date1, date2) => {
    let start_date = date1.split('-');
    let end_date = date2.split('-');
    // console.log(start_date);
    if(start_date[2] == end_date[2]){
        // console.log('tes')
        return YMdToFormatIndo(date1);
    }else {
        // console.log('tes 2')
        return YMdtoDateMonth(date1) + " - " + YMdToFormatIndo(date2);
    }

}

const timeStrToFormatIndo = (str) => {
    let date = str.substring(0, 10);

    return YMdToFormatIndo(date);
}


export {
    format_tanggal_indo,
    bulan_indo,
    getTotalDay,
    nama_hari,
    tanggal_bulan_tahun,
    tahun_bulan_tanggal,
    apakahHariMinggu,
    jam_menit_detik,
    hmsToSeconds,
    secondsToHMS,
    YMdToFormatIndo,
    YMdtoDateMonth,
    getTotalHours,
    totalDate,
    timeStrToFormatIndo
};