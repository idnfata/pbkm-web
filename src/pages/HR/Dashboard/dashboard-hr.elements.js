import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HRDashboardContainer = styled.div`
  display: grid;
  grid-template-areas:
    "pemberitahuan pemberitahuan pemberitahuan info-kehadiran"
    "karyawan karyawan karyawan info-cuti"
    "karyawan-by-gender karyawan-by-status-nikah karyawan-by-status-kontrak info-sakit"
    "karyawan-by-cabang karyawan-by-cabang karyawan-by-status-kontrak karyawan-request"
    "karyawan-by-cabang karyawan-by-cabang karyawan-by-status-kontrak karyawan-request"
    "karyawan-by-cabang karyawan-by-cabang karyawan-kontrak-berakhir buat-tugas-pengumuman"
    "kehadiran kehadiran kehadiran kosong"
    "overview-kehadiran overview-kehadiran list-telat list-tidak-hadir"
    "overview-kehadiran overview-kehadiran list-telat list-tidak-hadir"
    /* "belum-absen karyawan-lembur rank-kehadiran rank-kehadiran" */
    "karyawan-lembur pulang-awal rank-kehadiran rank-kehadiran"
    "quick-links-1 quick-links-2 calendar calendar"

                        ;
  grid-template-columns: 1fr 1fr 1fr minmax(175px, 255px);
  grid-gap: 20px;
  /* grid-template-rows: 1fr; */
  grid-auto-rows: minmax(90px, 90px);
  /* margin-top: 15px; */

  overflow: hidden;
  @media screen and (max-width: 500px) {
        grid-template-areas:
            'info-kehadiran'
            'pemberitahuan'
            'request-menu'
            'kehadiran'
            'overview-kehadiran'
            'list-tidak-hadir'
            'list-telat'
            'buat-tugas-pengumuman'
        ;
        margin: 0 auto;
        margin-bottom: 55px;
        /* align-content: center; */
        justify-content: center;
        gap: 0;
        grid-template-columns: 1fr;
        max-width: 100%;
        /* grid-auto-rows: 200px; */
        /* overflow-x: hidden; */
        /* background-color: var(--primary-color); */


  }
`;

export const SectionPemberitahuan = styled.div`
      grid-area: pemberitahuan;
  /* width: 700px; */
  display: flex;
  /* flex-direction: column; */
  height: 155px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 25px;
  box-sizing: border-box;
  color: #000;
  /* border-left: 15px solid var(--primary-color) */
  @media screen and (max-width: 500px) {
    margin: 0 auto;
    margin-top: 45px;
    align-items: center;
    width: 92%;
    /* border-radius: 0; */
    /* height: 200px; */
    background-color: var(--container-background-color);
    justify-content: flex-end;


  }
`;

export const SPDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  @media screen and (max-width: 500px) {
    margin: 0;

  }
`;

export const SPTitle = styled.h2`
    font-size: 19px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const SPSubTitle = styled.h2`
    font-size: 13px;
    color: #222;
    margin-top: -15px;

    span {
        font-size: 12px;
        color: var(--secondary-color);
        font-weight: bold;
    }
  @media screen and (max-width: 500px) {
    margin: 0 auto;
    margin-bottom: 10px;
    margin-top: 25px;
    font-size: 12px;
    padding: 0;
    color: #222;
    /* margin-top: -15px; */
  }
`;

export const SPDesc = styled.p`
    font-size: 14px;
    color: #3a3a3a;

    span {
        font-size: 12px;
        color: var(--primary-color);
        font-weight: bold;
    }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 12.5px;
    margin-bottom: 10px;
    padding: 0;
    color: var(--text);
  }
`;


export const SPImg = styled.img`
    position: relative;
    margin-left: auto;
    top: -65px;
    width: 230px;
    height: 220px;
    transform: scaleX(-1);
    right: -20px;
  @media screen and (max-width: 500px) {
      display: none;
  }

`;

export const SPButton = styled(Link)`
  background-color: #098a36;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  text-decoration: none;
  padding: 10px;

  &:hover {
      background-color: #0fd655;
  }
  @media screen and (max-width: 500px) {
        margin: 0 auto;
        width: 90%;
        text-align: center;
  }

`;

export const SectionInfoKehadiran = styled.div`
    display: flex;
    position: relative;

    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: info-kehadiran;
    box-sizing: border-box;
    background-color: #fff;
    @media screen and (max-width: 500px) {
        position: relative;
        /* justify-content: center; */
        border-radius: 10px;
        height: 150px;
        width: 92%;
        margin: 0 auto;
        margin-top: 25px;
        background-color: var(--container-background-color);


       /* margin-left: -20px; */
    }

`;

export const InfoKehadiranUser = styled.div`

    display: flex;
    flex-direction: row;
    text-align: center;
    @media screen and (max-width: 500px) {
        margin-top: 25px;
        padding-top: 50px;
    }
    p {
        margin-top: 3px;
        margin: 0 10px;

    }

    div:nth-last-child(even){
        padding: 0 22px;
        border-left: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
    }
`;

export const UserProfile = styled.div`
    display: none;

    .user-name {
        font-size: 16px;
        color: #222;
    }
    .user-role {
        font-size: 12px;
        color: var(--primary-color);
    }
    @media screen and (max-width: 500px) {
        display: flex;
        position: absolute;
        z-index: 2;
        top: 65px;
        left: calc(50% - 65px);
        flex-direction: column;
        align-items: center;
    }
`;

export const UserPhoto = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    background-color: white;
    border: 3px solid var(--mobile-background-color);
    margin-bottom: 5px;
`;

export const SectionInfoCuti = styled(Link)`
    grid-area: info-cuti;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    text-decoration: none;
    color: #222;
    border: 2px solid transparent;

    &:hover {
        background-color: transparent;
        border: 2px solid #eee;
    }
    &:hover p {
        color: #222;
    }
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const SectionInfoSakit = styled(Link)`
  grid-area: info-sakit;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  text-decoration: none;
  color: #222;
  border: 2px solid transparent;

    &:hover {
        background-color: transparent;
        border: 2px solid #eee;
    }
    &:hover p {
        color: #222;
    }
  @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const InfoTitle = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: 10px;
`;

export const InfoChart = styled.div`
    display: flex;
    flex-direction: column;
`;


export const SectionKaryawanTitle = styled.div`
      grid-area: karyawan;
  margin-top: 70px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: #FF4136; */ 
  @media screen and (max-width: 500px) {
      display: none;
    }
`; 

export const SectionText = styled.p`
    font-size: 18px;
    font-weight: bold;
`;

export const SectionLink = styled(Link)`
  font-size: 13px;
  font-weight: 400;
  color: var(--text);
  letter-spacing: -.2px;
  @media screen and (max-width: 500px) {
      color: var(--mobile-text-link);
  }

`;

export const KaryawanByGender = styled.div`
    grid-area: karyawan-by-gender;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      font-size: 14px;
      color: var(--text);
    }

    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByStatusNikah = styled.div`
    grid-area: karyawan-by-status-nikah;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    
    p {
      font-size: 14px;
      color: var(--text);
    }
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByStatusKontrak = styled.div`
    grid-area: karyawan-by-status-kontrak;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;

    div {
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      h3 {
        font-size: 28px;
        


      }
      
      p {
        margin-top: -5px;
        font-size: 12px;
        border-bottom: 1px solid var(--background-color);
        color: var(--text);
      }

    }
    @media screen and (max-width: 500px) {
      display: none;
    }
`;
export const KaryawanKontrakBerakhir = styled(Link)`
    grid-area: karyawan-kontrak-berakhir;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;    
    align-items: center;
    padding: 7px 5px;
    text-decoration: none;
    h2 {
      color: #fa7d00;
      font-size: 26px;
    }
    h3 {
      color: #222;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
    }
 
    p {
      font-size: 13px;
      color: var(--text);

    }
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const TitleSectionKaryawan = styled.h3`
  font-size: 15px;
  color: ${props => props ? props : 'var(--text)'};
  margin-bottom: 7px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .link {
    font-size: 11px;
    color: var(--text);
    

  }
  
`;

export const ContentSectionKaryawan = styled.div`
  width: ${props => props.full ? '100%' : '80%'};

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: #aaa; */
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;



export const KaryawanByCabang = styled.div`
    grid-area: karyawan-by-cabang;
    background-color: #fff; 
    /* position: relative; */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-evenly;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;


export const ListRequestKaryawan = styled.div`
  grid-area: karyawan-request;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 12px;
 
  p {
    font-size: 12px;
    padding: 5px 0;
    color: var(--text);
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--background-color);

    /* background-color: #aaa; */
    
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const RequestMenu = styled.div`
    grid-area: request-menu;
    display: none;
    overflow: hidden;
    


    @media screen and (max-width: 500px) {
        /* background-color: transparent; */
        display:flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100px;
        margin-top: 125px;
        /* padding-top: 15px; */
    }

`;

export const IconRequestMenu = styled.svg`

`;

export const RequestDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    /* margin-top: 5px; */
    /* position: relative; */
    width: 90%;
    margin: 0 auto;

    &::-webkit-scrollbar {
            display: none;
    }

    @media screen and (max-width: 500px) {
        overflow-x: auto;

    }
`;

export const LinkRequestMenu = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #FFF;
  height: 100%;
  min-width: calc(50% - 40px);
  margin-left: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #222;
  &:first-child {
      margin-left: 0;
      
  }
  h3 {
    font-size: 14px;
    padding: 0 5px;
  }
  img {
    height: 50px;
    width: 30px;
  }
  .cuti {
        color: #aaa;

    }
    .izin {
        color: #123;

    }
    .pinjaman {
        color: #321;
    }
    .sakit {
        color: #453;
    }
    .telat {
        color: #ec2;
    }
            

    
`;

export const RequestTitle = styled.div`
    display: none;
    @media screen and (max-width: 500px) {
        margin: 0 20px;
        color: white;
        display: flex;
        justify-content: space-between;
    }
`;


export const BuatTugasKaryawan = styled.div`
    grid-area: buat-tugas-pengumuman;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    /* padding: 0 10px; */
   
    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--primary-color);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      padding: 5px;

    }
    div {
      display: flex;
      background-color: var(--white);
      justify-content: space-evenly;
      font-size: 13px;
      .button-link {
        font-weight: bold;
        margin-top: 15px;
        padding: 7px 10px;
        border: 1px solid var(--primary-color);
        border-radius: 3px;
        /* background-color: var(--primary-color-hover); */
        color: var(--primary-color);
        text-decoration: none;
        &:hover {
        background-color: var(--primary-color-hover);
        border: 1px solid var(--primary-color-hover);
        color: var(--white);



        }

      }

    }
    @media screen and (max-width: 500px) {
        height: 200px;
        margin-top: 35px;
        display: none;

    }
`;


export const KehadiranText = styled.div`
    grid-area: kehadiran;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: salmon; */
    height: 25px;
    /* margin-top: 15px; */
    @media screen and (max-width: 500px) {
      display: none;
    }
`;


export const OverviewKehadiran = styled.div`
    grid-area: overview-kehadiran;
    background-color: #fff;
    /* height: 400px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-top: -70px;
    height: 275px;
    box-sizing: border-box;
    /* position: relative; */
    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--green);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }
    div {
      margin-top: 7px;
      /* margin-bottom: 10px; */
    }
    div.total-kehadiran {
      /* background-color: #aaa; */
      position: relative;
      margin-left: auto;
      top: -35px;
      right: 30px;
      h4 {
        font-size: 26px;
        color: var(--black);
        span {
          font-size: 16px;
          font-weight: normal;
        }
      }
      p {
        color: var(--text);
        text-align: center;
        font-size: 14px;
      }

    }
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const ListTidakHadir = styled.div`
    grid-area: list-tidak-hadir;
    background-color: #fff;
    /* height: 400px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-top: -70px;
    height: 275px;
    box-sizing: border-box;
    /* position: relative; */
    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--black);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }
 
    @media screen and (max-width: 500px) {
      display: none;
    }

`;

export const ListTelat = styled.div`
    grid-area: list-telat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: var(--white);
    margin-top: -70px;
    height: 275px;
    box-sizing: border-box;
    /* position: relative; */
    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--red);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }

    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const RankKehadiran = styled.div`
    grid-area: rank-kehadiran;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    background-color: var(--white);
    border-radius: 5px;
    width: 100%;
    height: 145px;
    box-sizing: border-box;
    position: relative;
    overflow: visible;

    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--primary-color);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }
    
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const PulangAwal = styled.div`
    grid-area: pulang-awal;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: var(--white);
    border-radius: 5px;
    width: 100%;
    height: 145px;
    box-sizing: border-box;
    position: relative;

    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: orange;
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }
    

    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanLembur = styled.div`
    grid-area: karyawan-lembur;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--white);
    border-radius: 5px;
    width: 100%;
    height: 145px;
    box-sizing: border-box;
    h3 {
      font-size: 15px;
      border-bottom: 1px solid var(--background-color);
      background-color: var(--green);
      border-radius: 3px;
      text-align: center;
      color: var(--white);
      width: 100%;
      padding: 7px 0;

    }
`;