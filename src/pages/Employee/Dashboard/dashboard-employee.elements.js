import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SectionTitleDaftarTugas = styled.div`
    grid-area: title-daftar-tugas;
    margin-top: 70px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background-color: #FF4136;  */
    @media screen and (max-width: 500px) {
        color: var(--white);
        /* display: none; */
        margin-top: 5px;
        padding: 0 12px;

      }
`; 

export const SectionDaftarTugas = styled.div`
  grid-area: daftar-tugas;
  background-color: var(--white);
  overflow-y: auto;
  height: 100%;
  ::-webkit-scrollbar
{
	width: 1px;
	background-color: #F5F5F5;
}

  /* padding: 0 10px; */
  .tambah-tugas {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    input {
      width: 100%;
      /* margin-right: 25px; */
      /* background: var(--secondary-color); */
      background: var(--background-color);
      border: none;
      border-bottom: 2px solid transparent;
      box-sizing: border-box;
      height: 45px;
      border-radius: 0;
      
      padding: 0 20px;
      /* font-size: 16px; */

      
      &:focus {
        border-bottom: 2px solid #ffc800;

        outline: none;
      }
    }

  }
  .tombol-tambah-tugas {
    background-color: #ffc800;
    width: 100px;
    height: 45px;
    /* border-radius: 50%; */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #161117;
    /* margin-right: 15px; */
    font-size: 15px;
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
        /* color: var(--white); */
        /* display: none; */
        /* background-color: transparent; */

        margin-top: -55px;
        padding: 0 20px;

  }
`;

export const WrapperDaftarTugas = styled.ul`
  padding: 0 10px;
  max-height: 200px;
`;

export const ListTugas = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: var(--black);
  background-color: var(--background-color);
  background-color: var(--white);
  border-radius: 5px;
  overflow: hidden;
  margin-top: 15px;
  box-shadow: 0px 5px 10px rgb(0,0,0,0.10);
  .left-cont{
    input {
      display: none;
      cursor: pointer;
    }

    label {
      position: relative;
      cursor: pointer;
      top: 3px;
      &:before {
        content: '';
        padding: 11px;
        display: inline-block;
        position: relative;
        margin-right: 8px;
        vertical-align: middle;
        background-color: var(--secondary-color);
        border-radius: 3px;
      }
    }

    input:checked + label:before {
      background-color: #ffc800;
    }

    input:checked + label:after {
      content: '';
      position:absolute;
      display: inline-block;
      top: 2px;
      left: 8px;
      width: 5px;
      height: 12px;
      border: solid #221525;
      border-width: 0px 2px 2px 0px;
      transform: rotate(45deg);
    }

  } 
  .hapus-tugas {
    color: #ff0047;
    cursor: pointer;
    line-height: 1;
    transform: translateY(48px);
    transition: .5s;

    .active {
      transform: translateY(0px);
      transition: .5s;

    }
  }
`;

export const MenuRequest = styled.div`
  grid-area: menu-request;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  max-width: 100%;
  overflow: hidden;


  @media screen and (max-width: 500px) {
    /* display: none; */
    /* margin-top: 20px; */
    color: white;
    background-color: transparent;
    justify-content: space-evenly;


  }
`;


export const TitleMenuRequest = styled.h3`
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
  @media screen and (max-width: 500px) {
    font-size: 18px;

    .link {
      color: white;
    }
  }
  
`;

export const ContentMenuRequest = styled.div`
  width: ${props => props.full ? '100%' : '95%'} !important;
    /* width: 100%; */
    max-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &::-webkit-scrollbar {
            display: none;
    }
    flex-direction: column;
  @media screen and (max-width: 500px) {
    justify-content: space-between;
    /* background-color: yellowgreen; */
    height: 50px;
    /* margin-top: 5px; */
    /* position: relative; */
    width: 100%;
    margin: 0 auto;
    flex-direction: row;
    overflow-x: auto;


  }
    
  
`;

export const LinkMenuRequest = styled(Link)`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* background-color: yellow; */
    text-decoration: none;
    &:hover{
      background-color: var(--background-color);
    }
    border-bottom: 1px solid var(--background-color);
    img {
      display: none;
    }
    h3 {
      font-size: 12px;
      padding: 5px 0;
      color: var(--text);
    }
  @media screen and (max-width: 500px) {

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
      display: block;
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
  }
`;