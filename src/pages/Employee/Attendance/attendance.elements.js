import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const RecordAttendanceWrapper = styled.div`
    background-color: transparent;
    margin-top: 20px;
    max-width: 100%;
    min-height: 80vh;
    height: 90vh;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    h3 {
        text-align: center;
        color: var(--secondary-color);
        margin-bottom: 20px;
    }
    a {
        text-decoration: none;
        color: var(--primary-color);
        font-size: 15px;
        font-weight: bold;
        :hover {
            color: var(--black);
        }
    }

    .attendance-info{
        background-color: #aaa;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        box-sizing: border-box;
    }

    @media screen and (max-width: 960px){}
    
    @media screen and (max-width: 516px){
        margin: 0;
        height: 90vh;

    }
    
    @media screen and (max-width: 320px){}

`

export const AttendanceOverview = styled.div`
    width: 45%;
    height: 150px;
    background-color: white;
    position: absolute;
    bottom: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    /* justify-content: space-between; */
    text-align: center;
    border-radius: 5px;
    padding: 15px 0;
    box-sizing: border-box;
    h4 {
        font-size: 16.5px;
        margin: 10px 0;
        span {
            font-size: 13px;
            color: var(--secondary-color);
        }
    }
  
    .attendance-text {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        padding: 10px 15px;
        box-sizing: border-box;
        width: 100%;
        h4 {
            margin: 5px 0;
            span {
                font-size: 12px;
                color: var(--secondary-color);
            }
        }
        
    }
    .schedule-info {
       display: flex;
       width: 100%;
       justify-content: space-between;
       padding: 5px 20px;
       box-sizing: border-box;
       max-height: 50px;
       .si-location-info {
            display: flex;
            text-align: left;
            /* background-color: #aaa; */
            align-items: center;
            p {
                font-size: 15px;

            }
            .si-location-distance {
                font-style: italic;
                font-size: 13px;
            }
            .si-location-code {
                background-color: var(--red);
                color: white;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 7px;
                font-size: 13px;
                height: 100%;
                margin-right: 5px;
            }
       }
       .si-shift-info {
           display: flex;
           flex-direction: row;
           align-items: center;


           .si-shift-code {
                background-color: var(--green);
                color: white;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 7px;
                font-size: 13px;
                height: 100%;
                margin-left: 5px;
           }

           .si-shift-detail {
               display: flex;
               
               div {
                   margin: 0 5px;
               }
               p {
                   font-size: 14px;
               }
           }
       }
       
     
     
   }
   
    @media screen and (max-width: 960px){}
    
    @media screen and (max-width: 516px){
        width: 80%;
        bottom: 50px;
    }
    
    @media screen and (max-width: 320px){}
    
`;

export const AttendanceTextInfo = styled.div`
    width: 80%;
    height: 50px;
    background-color: rgba(0,0,0, .65);
    font-size: 14px;
    position: absolute;
    top: 2%;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 999;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    
`;

export const OvertimeTextInfo = styled(Link)`
    width: 80%;
    height: 45px;
    background-color: rgba(0,0,0, .65);
    font-size: 13.5px !important;
    position: absolute;
    top: 11.5%;
    color: var(--white) !important;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 999;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;

    :hover {
        background-color: black;
    }
    
`;

export const AttendanceRecordButton = styled.div`
    cursor: pointer;
    width: 45%;
    height: 50px;
    background-color: var(--green);
    position: absolute;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 999;
    text-align: center;
    border-radius: 5px;
    padding: 15px 0;
    box-sizing: border-box;
    color: white;
`;