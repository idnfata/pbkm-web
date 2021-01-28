

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



export {
    format_tanggal_indo,
    bulan_indo,
    getTotalDay,
    nama_hari,
    tanggal_bulan_tahun,
    tahun_bulan_tanggal,
    apakahHariMinggu
};