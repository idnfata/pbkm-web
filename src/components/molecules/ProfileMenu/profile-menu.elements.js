import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MenuContainer = styled.div`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

export const MenuTrigger = styled.button`
    /* background: #ffffff; */
    background-color: transparent;
    /* border-radius: 90px; */
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px;
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */
    border: none;
    vertical-align: middle;
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

`;

export const ProfileName = styled.span`
    font-weight: 700;
    vertical-align: middle;
    font-size: 14px;
    margin: 0 10px;
`;

export const ProfileImage = styled.img`
    border-radius: 90px;
    width: 35px;
    height: 35px;
`;

export const Menu = styled.nav`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 0;
  width: 300px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
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
    text-align: center;
    text-decoration: none;
`;

export const Icon = styled.img`
    width: 1.7em;
    height: 1.7em;
    margin-right: .5em;
    -webkit-mask: url(${props => props.icon}) no-repeat center;
    mask: url(${props => props.icon}) no-repeat center;
    background-color: ${props => props.color ? props.color : "var(--secondary-color)"};

    
    &.active {
        color:#222;
        background-color:#222;
    }

    /* &:hover{
        color:#222;
        background-color:#222;
    } */

`;