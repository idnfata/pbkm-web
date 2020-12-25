import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navbar = styled.nav`
    background-color: #fff;
    height: 100vh;
    display: flex;
    position: fixed;
    flex-direction: column;
    padding: 1em;
    font-weight: 600;
    width: 225px;
    box-sizing: border-box;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
        bottom: 0;
        width: 100%;
        height: auto;
        padding: 0.1em;
        position: fixed;
        margin: 0;
        border-top: 1px solid var(--background-color);
    }
`;


export const NavBrand = styled.a`
    padding: 0em 0em 1.3em 1em;
    text-decoration: none;
    color: #242424;
    font-family: 'Francois One', sans-serif;
    letter-spacing: 1.2px;
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBrandLogo = styled.img`
    width: 100px;
    height: 65px;
`;

export const NavBrandName = styled.span`
    padding-top: 0.5em;
    font-size: 1.5em;
`;


export const NavList = styled.ul`
    list-style: none;

    @media screen and (max-width: 768px) {
        display: flex;
        width: 100%;
        height: auto;
        justify-content: space-around;
    }

    @media screen and (max-width: 500px) {
        position: relative;
        bottom: 0;
        display: flex;
        justify-content: space-around;
    }
    
`;

export const NavItem = styled.li`
    padding: 0;
    margin: 0;
`;

export const NavLinks = styled(Link)`
    display: flex;
    color: var(--secondary-color);
    padding: 1em;
    text-decoration: none;
    align-items: center;
    cursor: pointer;
    font-size: .82em;

    &.active {
        color: var(--primary-color)

    }
    &:hover {
        background-color: var(--background-color-hover);
    }

    @media screen and (max-width: 768px) {
        float: left;
        font-size: 0.8em;
        padding: 1em 0.5em;
    }

    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
        
    }

`;

export const NavIcon = styled.img`
    width: 1.7em;
    height: 1.7em;
    margin-right: .5em;
    -webkit-mask: url(${props => props.icon}) no-repeat center;
    mask: url(${props => props.icon}) no-repeat center;
    background-color: ${props => props.color ? props.color : "var(--secondary-color)"};

    
    &.active {
        color: var(--primary-color);
        background-color: var(--primary-color);
    }

`;

export const NavFooter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const FooterImage = styled.img`
    width: 70%;
    position: relative;
    z-index: 1;
    top: -25px;
`;

export const NavFooterContent = styled.div`
    background-color: var(--background-color);
    margin: .5em;
    padding: 1.688em;
    padding-bottom: 20px;
    /* padding-top: 6em; */
    display: flex;
    flex-direction: column;
    font-weight: normal;
    border-radius: 1.3em;
    position: relative;
    bottom: 30%;
    box-sizing: border-box;
    width: 100%;
`;

export const NavFooterTitle = styled.h2`
    margin-top: 2em;
    color: var(--black);
    font-size: 1rem;
    text-align: center;
`;

export const NavFooterDesc = styled.span`
    color: var(--text);
    font-size: .8em;
`;

export const NavFooterLink = styled.a`
    color: var(--white);
    background-color: var(--primary-color);
    text-decoration: none;
    text-align: center;
    padding: 1em;
    border-radius: 1.3em;
    margin-top: 1em;
`;

export const SubMenu = styled.ul`
    display: none;
    position: absolute;
    /* width: 100%; */
    height: 30px;
    background-color: var(--white);
    left: 0;
    top: 35px;
    `;


export const SubMenuItem = styled.li`
    display: block;
    width: 150px;
    font-weight: normal;

    .sub-menu-link {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        color: var(--black);
        text-decoration: none;
        border-left: 1px solid var(--secondary-color);
        border-bottom: 1px solid var(--secondary-color);
        font-size: 12px;
        /* background-color: var(--white); */
        z-index: 2;
        &:hover {
            background-color: var(--primary-color);
            color: var(--white);
            font-weight: bold;
            cursor: pointer;    
/*  */


        }
        
        &.active {
            color: var(--white);
            border: none;
            font-weight: bold;
            background-color: var(--primary-color);
        border-bottom: 1px solid var(--secondary-color);

        }
     
    }
    &:last-child {
            border-right: 1px solid var(--secondary-color);

        }
  
`;