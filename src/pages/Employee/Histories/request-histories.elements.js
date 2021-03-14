import styled from 'styled-components';

export const LeaveHistoriesContainer = styled.div`
    display: grid;
    margin-top: 15px;
    grid-template-areas:
        "lh-title lh-button"
        "lh-balance lh-balance"
    ;
    @media screen and (max-width: 500px) {
        grid-template-areas:
            "lh-title lh-button"
            "lh-balance lh-balance"
        ;
        margin-top: 0;
        padding: 15px;

    }
`;

export const LHPageTitleMobile = styled.div`
    font-size: 18px;
    font-weight: bold;
    display: none;
    @media screen and (max-width: 500px) {
        grid-area: lh-title;
        
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
    /* display: flex; */
    @media screen and (max-width: 500px) {
            /* display: none; */

        }
`;

export const LHRequestButton = styled.div`
    grid-area: lh-button;
    display: flex;
    align-items: center;
    justify-content: flex-end;

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