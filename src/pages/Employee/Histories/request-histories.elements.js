import styled from 'styled-components';

export const LeaveHistoriesContainer = styled.div`
    display: grid;
    margin-top: 15px;
    grid-template-areas:
        "lh-title lh-button"
        "lh-balance lh-balance"
        "lh-list lh-list"
    ;

    @media screen and (max-width: 500px) {
        /* grid-template-areas:
            "lh-title lh-button"
            "lh-balance lh-balance"
        ; */
        margin-bottom: 75px;

        margin-top: 0;
    


    }
`;

export const LHPageTitleMobile = styled.div`
    font-size: 18px;
    font-weight: bold;
    display: none;
    @media screen and (max-width: 500px) {
        grid-area: lh-title;
        margin: 15px 0 10px 10px;
        display: flex;
        align-items: center;
        
    }
`;

export const LHPageTitleDesktop = styled.div`
    grid-area: lh-title;
    /* display: flex; */
    @media screen and (max-width: 500px) {
            display: none;

        }
`;

export const LHBalance = styled.div`
    grid-area: lh-balance;
    overflow: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    /* background-color: var(--yellow); */
    padding-bottom: 25px;
    padding-left: 30px;
    /* display: flex; */
    span {
        margin-bottom: 5px;
        font-style: italic;
        font-size: 10pt;
    }
    .leave-type-slide-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        /* border-radius: 7px; */
        background-color: var(--black);
        color: white;
        height: 115px !important;
        /* width: 225px !important; */

        border: 2px solid var(--black) !important;
        h3 {
            margin-top: 10px;
        }
        :hover {
            cursor: pointer;
            background-color: white;
            color: var(--black);
            border: 2px solid var(--black);
        }
        
    }
    @media screen and (max-width: 500px) {
        
        padding: 0;
        /* width: 100vw; */
        margin-left: 6.7px;
        margin-bottom: 20px;
        .leave-type-slide-item {
            background-color: var(--yellow);
            height: 95px !important;
            border: 2px solid var(--yellow) !important;
            
         

        }

            
    }
`;

export const LHFilter = styled.div`
    grid-area: lh-button;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
        margin-right: 15px;
        font-size: 14px;
    }
    @media screen and (max-width: 500px) {
        margin-right: 10px;
        margin-top: 5px; 
        p {
            margin-right: 5px;
        }

    }
`;

export const LHList = styled.div`
    grid-area: lh-list;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* grid-template-rows:  minmax(100px, auto); */
    gap: 10px;
    box-sizing: border-box;
    /* padding: 10px 0; */
    background-color: transparent;
    
    .lh-list-wrapper {
        min-height: 300px;
        max-height: 300px;
        background: white;
        padding: 15px 20px;
        border-radius: 2px;
        border: 1px solid transparent;
        position: relative;
      
        :hover {
            cursor: pointer;
            background-color: transparent;
            border: 1px solid white;
          .rh-hover {
                display: flex;
                transition: 1s;
          }
        }
        
        h3 {
            color: #000;
            font-size: 18px;
        }
        .lh-total-days {
            font-size: 14px;
            color: var(--secondary-color);
            margin-bottom: 10px;
        }
        .lh-desc {
            min-height: 180px;
        }
        .lh-created-at {
            font-size: 13px;
            font-weight: normal;
            font-style: italic;
            span {
                font-weight: bold;
            }
        }
        .lh-status {
            margin: 10px 0;
            
            p {
                border-radius: 5px;
                color: white;
                font-size: 12px;
                display: inline-block;
                padding: 8px 15px;
            }
        }

    }
    
    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;

        .lh-list-wrapper {
            min-height: 150px;
            max-height: 150px;

            h3 {
                font-size: 18px;
                margin-bottom: 0;
            }
            .lh-desc {
                min-height: 50px;
            }
            .lh-status {
                margin: 0;
                margin-bottom: 5px;
            }
        }
    }
`;




export const OHTopButton = styled.div`
    grid-area: oh-top-button;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
        text-align: center;
        margin-right: 5px;
    }
    select {
        /* margin: 0 auto; */
        margin-right: 10px;
    }
    .filter-year-wrapper {
        display: flex !important;
        align-items: center;
    }

    @media screen and (max-width: 500px) {
        .add-button {
            display: none;
        }
    }
    
`;


export const OHRequestButtonMobile = styled.div`
    display: none;

    @media screen and (max-width: 500px) {
        display: block;
        position: fixed;
        bottom: 95px;
        right: 20px;
        z-index: 2;
        padding: 15px;
        border-radius: 50%;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        background-color: #48c774;
        cursor: pointer;
        text-decoration: none;
        box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.54);




        
    }
`;


export const OHList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    box-sizing: border-box;
    background-color: transparent;



    
    .oh-list-wrapper {
        min-height: 300px;
        max-height: 300px;
        background: white;
        padding: 15px 20px;
        border-radius: 2px;
        border: 1px solid transparent;
        position: relative;
        
        :hover {
            cursor: pointer;
            background-color: transparent;
            border: 1px solid white;
            .rh-hover {
                display: flex;
                transition: 1s;
            }
        }
    }

    .oh-list-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        p {
            font-size: 14px;
            color: var(--secondary-color);
            margin-bottom: 10px;
        }
    }

    .oh-list-body {
        max-height: 180px;
        min-height: 180px;
        display: flex;
        align-items: center;
        .oh-time-total-hours{
            font-size: 27px;
            /* max-width: 75px; */
            font-weight: bold;
            color: #000;
            span {
                font-style: italic;

                font-size: 14px;
            }
        }

        .oh-time-start-end {
            font-size: 14px;
            color: var(--secondary-color);
        }

        .oh-desc {
            margin-top: 5px;
            font-size: 14px;
            color: var(--secondary-color);
            font-weight: bold;
        }

    }



    .oh-status {
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
        p {
            border-radius: 5px;
            color: white;
            font-size: 11px;
            display: inline-block;
            text-align: center;
            padding: 8px 15px;
        }
        span {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 32px;

        }
    }
    
    .oh-created-at {
        font-size: 13px;
        font-weight: normal;
        font-style: italic;
        span {
            font-weight: bold;
        }
    }


    @media screen and (max-width: 500px) {
        grid-template-columns: 1fr;
        margin-bottom: 75px;
        .oh-list-wrapper {
            min-height: 200px;
        }

        .oh-list-body {
            max-height: 100px;
            min-height: 100px;
        }
        .oh-status {
            margin: 5px 0;
        }
    }
`;


export const RHHover = styled.div`
    /* .rh-hover { */
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        background-color: ${props => props.status == 0 ? "var(--yellow)" : "var(--black)"};
        color: ${props => props.status == 0 ? "var(--black)" : "var(--white)"};
        font-size: 12px;
        width: 120px;
        height: 120px;
        top: 45%;
        left: 25%;
        border-radius: 50%;
        text-align: center;
        box-shadow: 1px 1px 20px 1px rgba(0,0,0,0.54);
    /* } */


`;