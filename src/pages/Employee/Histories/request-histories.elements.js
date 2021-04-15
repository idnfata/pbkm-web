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

        :hover {
            cursor: pointer;
            background-color: transparent;
            border: 1px solid white;
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
        .accepted {
            background-color: var(--green);
        }
        .declined {
            background-color: var(--red);
        }
        .waiting {
            color: var(--black) !important;
            background-color: var(--yellow);
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

// grid-template-columns: 1fr 1fr 1fr minmax(175px, 255px);
// grid-gap: 20px;
// grid-template-rows: repeat(3, 90px) 250px;
// /* grid-auto-rows: minmax(90px, 90px); */
// margin-top: 20px;

// overflow: hidden;
// @media screen and (max-width: 500px) {
//     grid-template-areas:
//         'pemberitahuan'
//         'menu-request'
//         'title-daftar-tugas'
//         'daftar-tugas'
//     ;
//     margin: 0 auto;
//     margin-bottom: 55px;
//     /* margin-top: 20px; */
    
//     /* align-content: center; */
//     justify-content: center;
//     gap: 0;
//     grid-template-columns: 1fr;
//     max-width: 100%;
//     grid-template-rows: 1fr .55fr .45fr 1.5fr;


//     /* grid-auto-rows: 1fr .5fr 1fr; */
//     /* overflow-x: hidden; */
//     /* background-color: var(--primary-color); */
//     background-color: ${({mobileBG}) => mobileBG ? mobileBG : "var(--mobile-background-color)"};



// }