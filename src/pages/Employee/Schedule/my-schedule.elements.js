import styled from 'styled-components';

export const MyScheduleWrapper = styled.div`
    background-color: #fff;
    display: flex;  
    flex-direction: column;       
    border: 1px solid #eee;         
    border-radius: 8px;
    font-weight: bold;
    text-align: center;
    font-size: 14px;
    width: auto;
    max-width: 100%;
    /* overflow-x: hidden; */

    .my-schedule-header {
        background-color: var(--primary-color);
        color: white; 
        
    }

    .my-schedule-body {


        
       
        
    }
    .ket {
        /* color: var(--green); */
        font-weight: bold;
    }
    .row {
        /* display: table-row; */
        display: flex;
        flex-direction: row;
        /* width: 100%; */
        /* max-width: 100%; */
        /* clear: both; */
    }
    .col {
        /* float: left; // fix for  buggy browsers */
        /* display: table-column;          */
        display: flex;
        flex-direction: column;
        
        justify-content: center;
        align-items: center;
        border-right: 1px solid white;
        min-width: 13.8%;
        padding: 8px 15px;

        span {

        }
        span.show-desktop{
            display: block;
        }
        .show-mobile {
            display: none;
        }
        
    }
    .schedule-not-found {
        display: flex;
        align-items: center;
        margin: 0 auto;
        span {
            background-color: var(--green);
            color: #fff;
            padding: 6px 10px;
            font-size: 12px;
            margin-left: 10px;
        }   
    }

    @media screen and (max-width: 960px){}
    
    @media screen and (max-width: 516px){
        font-size: 11.8px;    

        margin-bottom: 75px;
        .col {
            min-width: 12.5%;
            max-width: 20px;
            
       
        }
        .ket {
            display: none;
        }
        span.show-desktop{
            display: none !important;
        }
        span.show-mobile {
            display: block !important;
        }
    }
    
    @media screen and (max-width: 320px){
       
    }
`;