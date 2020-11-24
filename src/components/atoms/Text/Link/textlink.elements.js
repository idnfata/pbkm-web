import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const TextLink = styled(Link)`
    text-align: center;
    font-size: 14px;
    color: ${props => props.color ? props.color : '#ababab'};
    text-decoration: none;
    display: inline-block;
    padding-top: 5px;
    padding-right: 15px;
    &:hover {
        cursor: pointer;
        color: #222;
        transition: all .5s;
        &:after{
            display: block;
            content: '';
            width: 100%;
            height: 2px;
            background-color: black;
        }
    }

    &.active {
        &:after{
            display: block;
            content: '';
            width: 100%;
            height: 2px;
            background-color: black;
        }
        color: #222;
    }
`;