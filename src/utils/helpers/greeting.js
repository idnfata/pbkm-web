export const greeting = () => {
    const tanggal = new Date();
    const jam = tanggal.getHours();

    if((jam >= 19 && jam <= 24) || jam < 5 ){
        return 'Selamat Malam';
    }else if(jam >= 5 && jam < 11){
        return 'Selamat Pagi';
    }else if(jam >= 11 && jam < 16){
        return 'Selamat Siang';
    }else if(jam >= 16 && jam < 19 ){
        return 'Selamat Sore';
    }
}