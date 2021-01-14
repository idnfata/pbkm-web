import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const HeaderDetailEmployee = styled.nav`
    background-color: var(--black);
    border-radius: var(--main-radius);
    padding-top: var(--main-padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
    text-align: center;
    font-size: 14px;
    .profile-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: var(--white);
        border: 3px solid var(--background-color);
        position: relative;
        top: -50px;
        margin-bottom: -40px;
    
    }

    .employee-photo {
        width: 75%;
        height: 75%;
    }

    .employee-name {
        /* margin-top: -50px; */
        font-size: 16px;
        color: var(--white);
    }

    .employee-division-group {
        font-size: 11px;
        font-style: italic;
        color: var(--yellow);
        margin-bottom: 50px;
    }

`;


export const DetailEmployeeMenu = styled.div`
    background-color: var(--secondary-color);
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .menu-item  {
        color: var(--white);
        height: 100%;
        line-height: 40px;
        /* margin: 0 5px; */
        cursor: pointer;
        width: 150px;
        
        p {
            /* padding-top: 15px; */
        }
        &.active {
            background-color: var(--black);
            color: var(--white);
            font-weight: bold;
        }
        &:hover {
            background-color: var(--black);
            font-weight: bold;
            color: var(--white);
            cursor: pointer;    
        }
   
    }
    .sub-menu {
        position: relative;
        /* top: 50px; */
        display: flex;
        color: black;
        width: 100%;
        
    }
`;

export const DetailEmployeeOverview = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
        color: white;
        font-size: 8px;
        vertical-align: text-top;
    }
`;



export const WrapperBasicInformation = styled.div`
    background-color: var(--white);
    /* margin-top: 15px; */
    /* border-radius: 5px; */
    width: 100%;
    height: 800px;
    display: grid;
    grid-template-columns: 1fr 1.8fr 1fr;
    grid-template-rows: 1.5fr 2fr 1.5fr 1.8fr;
    grid-template-areas:
    'data-basic data-contact data-addresses'
    'data-basic data-family-members data-addresses'
    'data-basic data-education-background data-education-background'
    'data-login data-work-experience data-work-experience'

    ;
    gap: 1.2rem;
    font-family: 'Inter', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 12px;
    color: var(--primary-color);
    /* text-align: center; */
    /* box-shadow: 1px 1px 3px 1px rgba(0,0,0,.1); */
    padding: 20px;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .data-list {
        display: flex;
        align-items: center;
    
        /* max-width: 100%; */
        height: 40px;
        /* border-top: 1px solid var(--background-color); */
        padding-left: 10px;
        font-size: 12.5px;
        text-transform: capitalize;
        p {

            margin-top: 5px;
            color: black;
            width: 100%;
        }
        p:last-child{
            width: 125%;
            color: var(--black);
            font-weight: normal;
            margin-right: auto;
        }
    }


    .header-data {
        background-color: var(--secondary-color);
        color: white;
        padding: 10px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            background-color: white;
            padding: 1.5px 10px;
            font-size: 12px;
            color: var(--black);
        }
    }

    .content-data {
        margin-top: 10px;
    }

    .data-basic {
        grid-area: data-basic;
        display: flex;
        flex-direction: column;
        /* background-color: var(--background-color); */
        border: 1px solid var(--background-color);
    

    }
    .data-contact {
        grid-area: data-contact;
        border-left: 2px solid var(--background-color);


    }
    .data-addresses {
        grid-area: data-addresses;

        border-left: 2px solid var(--background-color);

    }
    .data-login {
        margin-bottom: 50px;
        grid-area: data-login;
        /* height: 50px !important; */
        /* background-color: var(--primary-color); */
        color: var(--primary-color);
        display: flex;
        /* align-items: center; */
        /* justify-content: space-between; */
        flex-direction: column;

        div:first-child {
            border-left: 3px solid var(--primary-color);
            padding: 10px 5px;
            margin: 10px 0;
            color: var(--black);
            font-weight: bold;
            text-transform: capitalize;
        }
        p {
            margin-top: 5px;
            padding-left: 10px;
            font-size: 16px;
            /* text-align: center; */
        }
        p.tidak-punya-akun {
            color: var(--secondary-color);
            font-weight: normal;
            text-transform: capitalize;
            font-size: 14px;
        }
        button {
            margin-left: 10px;
        }


    }
    .data-education-background {
        grid-area: data-education-background;
        border-left: 2px solid var(--background-color);

    }
    .data-work-experience {
        grid-area: data-work-experience;
        border-left: 2px solid var(--background-color);

    }
    .data-family-members {
        grid-area: data-family-members;
        border-left: 2px solid var(--background-color);

    }
    @media only screen and (max-width: 550px){
        grid-template-columns: 1fr;
        grid-template-rows: 0.4fr 0.4fr 2.2fr 1.2fr 1.2fr 1.2fr 1fr;
        /* grid-template-areas: 
            'sidebar'
            'main'
            'content1'
            'content2'
            'content3'
            'footer'
        ; */
        margin-bottom: 50px;
        
    }
`;

