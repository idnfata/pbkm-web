import styled from 'styled-components'
import {colors} from '../../../../utils/colors'

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${ ({buttonColor}) => (buttonColor ? buttonColor : 'transparent') };
    white-space: nowrap;
    /* width: ${ ({big}) => (big ? '50%' : '25%') }; */
    width: ${({width}) => (width ? {width} : '150px')};
    padding: ${ ({big}) => (big ? '20px 24px' : '5px 25px') };
    color: ${ ({buttonFull, buttonColor}) => (buttonFull ? '#fff' : buttonColor) };
    font-family: 'Nunito Sans', sans-serif;
    font-size: ${ ({fontBig}) => (fontBig ? '20px' : '16px') };
    outline: none;
    border: 2px solid ${ ({buttonFull, buttonColor}) => (buttonFull ? 'transparent' : buttonColor) };
    margin-left: ${({align}) => align == 'right' ? 'auto' : '0'};
    margin-right: ${({align}) => align == 'left' ? 'auto' : '0'};
    /* border: transparent; */
    /* border: ${ ({buttonFull, buttonColor}) => (buttonFull ? 'transparent' : '') }; */
    cursor: pointer;
    box-shadow:  ${ ({shadowSetting}) => (shadowSetting ? '0 4px 10px -2px' : '') } ${colors.default};


    &:hover {
        color: ${ ({buttonFull, buttonColor}) => (buttonFull ? buttonColor : '#fff') };
        border: 2px solid ${ ({buttonFull, buttonColor}) => (buttonFull ? buttonColor : 'transparent') };
        background-color: ${ ({buttonFull, buttonColor}) => (buttonFull ? 'transparent' : buttonColor) };
        transition: all 0.3s ease-out;
        box-shadow: none;
    }
    @media screen and (max-width: 960px){
        width: 120px;
        /* color: inherit; */
        margin-left: auto;
        border: 2px solid ${({buttonHover}) => buttonHover};
        &:hover {
            color: ${({buttonColor}) => buttonColor};
            background-color: ${({buttonHover}) => buttonHover};
        }
    }
`;