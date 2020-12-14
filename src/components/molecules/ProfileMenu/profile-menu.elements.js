import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProfileMenuContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    @media screen and (max-width: 768px) {
        position: relative;
    }
 
    
`;


export const MenuTrigger = styled.button`
    /* border-radius: 90px; */
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px 6px;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
    border: none;
    /* vertical-align: middle; */
    transition: box-shadow 0.4s ease;
    width: 200px;
    height: 50px;
    &:hover{
        box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);
        color: #222831;
    }
    &:focus{
        outline: none;
        box-shadow: 0 2px 0px rgba(0, 0, 0, 0.3);        
    }
    @media screen and (max-width: 768px) {
        /* justify-content: flex-end; */
        width: auto;
        position: absolute;
        left: -100%;
        &:hover{
        box-shadow: none;
        color: #222831;
     }
        &:focus{
            outline: none;
            box-shadow: none;        
        }


    }


`;

export const ProfileName = styled.span`
    font-weight: 700;
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const ProfileImage = styled.img`
    border-radius: 90px;
    width: 35px;
    height: 35px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const Menu = styled.nav`
    background: #fff;
    border-radius: 8px;
    position: absolute;
    top: 60px;
    right: 0;
    z-index: 999;
    width: 300px;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    opacity: 0;
    /* display: none; */
    visibility: hidden;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;


    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);

    }
    &.inactive {
        /* box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3); */
        box-shadow: none;
    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100vh;
        width: 250px;
        transform: translateX(-20px);
        top: 0;
        left: -100%;
        border-radius: 0;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);



        
    }
    @media screen and (max-width: 500px) {

    }
`;

export const MenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

`;

export const MenuItem = styled.li`
    border-bottom: 1px solid #dddddd;
    &:hover {
        background: #eee;

    }
`;

export const MenuItemLink = styled(Link)`
    text-decoration: none;
    color: #333333;
    padding: 15px 20px;
    display: block;
`;

export const IconContainer = styled.div`
    margin-right: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const IconLink = styled(Link)`
    padding: 5px;
    text-align: center;
    text-decoration: none;
`;

export const IconMenu = styled.img`
    display: none;
    width: 3em;
    height: 3em;
    margin-right: .5em;
    -webkit-mask: url(${props => props.icon}) no-repeat center;
    mask: url(${props => props.icon}) no-repeat center;
    background-color: ${props => props.color ? props.color : "var(--secondary-color)"};

    &.active {
        color:#222;
        background-color:#222;
    }
    @media screen and (max-width: 768px) {
        margin-top: 5px;
        margin-right: 0;
        display: block;
      

    }
 
`;

export const Icon = styled.img`
    width: 1.7em;
    height: 1.7em;
    margin-right: .5em;
    -webkit-mask: url(${props => props.icon}) no-repeat center;
    mask: url(${props => props.icon}) no-repeat center;
    background-color: ${props => props.color ? props.color : "var(--secondary-color)"};

    @media screen and (max-width: 768px) {
        margin-top: 5px;
        margin-right: 0;
    }
    &.active {
        color:#222;
        background-color:#222;
    }

    /* &:hover{
        color:#222;
        background-color:#222;
    } */

`;