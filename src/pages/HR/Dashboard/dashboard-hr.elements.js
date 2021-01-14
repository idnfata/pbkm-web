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