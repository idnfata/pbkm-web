import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const EmployeeDashboardContainer = styled.div`
  display: grid;
  /* margin-bottom: 65px; */
  grid-template-areas:
    "pemberitahuan pemberitahuan pemberitahuan info-kehadiran"
    "title-daftar-tugas title-daftar-tugas title-daftar-tugas info-cuti"
    "daftar-tugas daftar-tugas daftar-tugas info-sakit"
    "daftar-tugas daftar-tugas daftar-tugas menu-request"
    "request-permit-links request-permit-links quick-access-menu quick-access-menu"

                        ;
  grid-template-columns: 1fr 1fr 1fr minmax(175px, 255px);
  grid-gap: 20px;
  grid-template-rows: repeat(3, 90px) 250px;
  /* grid-auto-rows: minmax(90px, 90px); */
  margin-top: 20px;

  overflow: hidden;
  @media screen and (max-width: 500px) {
        grid-template-areas:
            'pemberitahuan'
            'menu-request'
            'title-daftar-tugas'
            'daftar-tugas'
        ;
        margin: 0 auto;
        margin-bottom: 55px;
        /* margin-top: 20px; */
        
        /* align-content: center; */
        justify-content: center;
        gap: 0;
        grid-template-columns: 1fr;
        max-width: 100%;
        grid-template-rows: 1fr .55fr .45fr 1.5fr;


        /* grid-auto-rows: 1fr .5fr 1fr; */
        /* overflow-x: hidden; */
        /* background-color: var(--primary-color); */
        background-color: ${({mobileBG}) => mobileBG ? mobileBG : "var(--mobile-background-color)"};



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
    margin-top: 30px;
    padding-top: 65px;
    height: 195px;
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
    width: 100%;
    
  @media screen and (max-width: 500px) {
    margin: 0;

  }
`;

export const SPTitle = styled.h2`
    font-size: 19px;
    margin-top: -10px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const SPSubTitle = styled.h2`
    font-size: 13px;
    color: #222;
    margin-top: -10px;
    

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

export const SPDesc = styled.div`
    font-size: 14px;
    color: #3a3a3a;

    span {
        font-size: 12px;
        color: var(--primary-color);
        font-weight: bold;
    }
    p {
      margin-top: 3.5px;
    }
  @media screen and (max-width: 500px) {
    text-align: center;
    font-size: 12.5px;
    margin: 0 auto;

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
  margin-bottom: -10px;
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

        display: none;
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