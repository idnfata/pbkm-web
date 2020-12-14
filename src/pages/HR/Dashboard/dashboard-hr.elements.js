import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HRDashboardContainer = styled.div`
  display: grid;
  grid-template-areas:
    "pemberitahuan pemberitahuan pemberitahuan info-kehadiran"
    "karyawan karyawan karyawan info-cuti"
    "karyawan-by-gender karyawan-by-status-nikah karyawan-by-status-kontrak info-sakit"
    "karyawan-by-divisi karyawan-by-divisi karyawan-by-status-kontrak karyawan-request"
    "karyawan-by-cabang karyawan-by-cabang karyawan-kontrak-berakhir karyawan-request"
    "karyawan-by-cabang karyawan-by-cabang karyawan-kontrak-berakhir buat-tugas"
    "kehadiran kehadiran kehadiran filter-tanggal"
    "overview-kehadiran overview-kehadiran overview-kehadiran list-tidak-hadir"
    "overview-kehadiran overview-kehadiran overview-kehadiran list-tidak-hadir"
    "list-telat list-telat list-pulang-awal list-pulang-awal"
    
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
            'info-lembur-cuti-sakit-izin'
            'karyawan-request'
            'kehadiran'
            'overview-kehadiran'
            'list-tidak-hadir'
            'list-telat'
            'buat-tugas'
        ;
        margin: 25px auto;
        margin-top: 50px;
        gap: 0;
        grid-template-columns: 100%;


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
  width: 100%;
  /* border-left: 15px solid var(--primary-color) */
  @media screen and (max-width: 500px) {
    margin: 0 auto;
  }
`;

export const SPDetail = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  @media screen and (max-width: 500px) {

  }
`;

export const SPTitle = styled.h2`
    font-size: 19px;
  @media screen and (max-width: 500px) {

  }
`;

export const SPSubTitle = styled.h2`
    font-size: 13px;
    color: #c2c2c4;
    margin-top: -15px;
    
    span {
        font-size: 12px;
        color: var(--primary-color);
        font-weight: bold;
    }
  @media screen and (max-width: 500px) {
    margin: 0 auto;
    margin-top: -15px;
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
        justify-content: center;
        height: 150px;
       /* margin-left: -20px; */
    }

`;

export const InfoKehadiranUser = styled.div`

    display: flex;
    flex-direction: row;
    text-align: center;
    @media screen and (max-width: 500px) {
        margin-top: 15px;

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
        top: 70px;
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
    border: 3px solid #F5F5FD;
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
  color: #acacac;
  letter-spacing: -.2px;
`;

export const KaryawnaByGender = styled.div`
    background-color: #FF4136;
    grid-area: karyawan-by-gender;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByStatusNikah = styled.div`
    grid-area: karyawan-by-status-nikah;
    background-color: #776160;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByStatusKontrak = styled.div`
    grid-area: karyawan-by-status-kontrak;
    background-color: #faaca8;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByDivisi = styled.div`
    grid-area: karyawan-by-divisi;
    background-color: #a9a9a9;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanByCabang = styled.div`
    grid-area: karyawan-by-cabang;
    background-color: #b68583;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const KaryawanKontrakBerakhir = styled.div`
    grid-area: karyawan-kontrak-berakhir;
    background-color: antiquewhite;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const RequestKaryawan = styled.div`
    grid-area: karyawan-request;
    background-color: antiquewhite;

`;

export const BuatTugasKaryawan = styled.div`
    grid-area: buat-tugas;
    background-color: #b49b0d;
`;

export const KehadiranText = styled.div`
    grid-area: kehadiran;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: salmon; */
    height: 25px;
    /* margin-top: 15px; */
`;

export const OverviewKehadiran = styled.div`
    grid-area: overview-kehadiran;
    background-color: cadetblue;
    /* height: 400px; */
    margin-top: -70px;
    height: 275px;
`;

export const ListTidakHadir = styled.div`
    grid-area: list-tidak-hadir;
    background-color: chocolate;
    height: 275px;
    margin-top: -70px;

`;

export const ListTelat = styled.div`
    grid-area: list-telat;
    background-color: saddlebrown;
    margin-top: 5px;
`;

export const ListPulangAwal = styled.div`
    grid-area: list-pulang-awal;
    background-color: coral;
    margin-top: 5px;
    @media screen and (max-width: 500px) {
      display: none;
    }
`;

export const ListLembur = styled.div`
`;