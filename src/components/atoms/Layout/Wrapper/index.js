import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
`;


export const MenuWrapper = styled.div`
  width: 225px;
  @media screen and (max-width: 768px) {
      width: 0;
  }
`;

export const HeaderContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 500px) {
        background-color: var(--header-page);
        height: 60px;

    } 

`;

export const TitleMobile = styled.div`
    display:none;
    @media screen and (max-width: 500px) {
        flex: 1;
        display: block;
        line-height: 60px;
        text-align: center;
        position: relative;
        left: 25%;
        
    }

`;

export const TitleDesktop = styled.div`
    flex: 1;
    @media screen and (max-width: 500px) {
        display: none;
        
    }

`;

export const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 15px 15px 15px 0;
    border-radius: 2.5em;
    background-color: #F5F5FD;
    padding: 1.2em 2.3em;
    min-height: 100vh;

    @media screen and (max-width: 768px) {
        margin: 0;
        padding: 0;
        border-radius: 0;

    }
`;

export const PageContent = styled.div`
    display: grid;
    width: 95%;
    margin: 25px auto;
    padding-bottom: 50px;
    grid-template-areas:
        'row-1-col-1 row-1-col-2 row-1-col-3 row-1-col-4'
        'row-2-col-1 row-2-col-2 row-2-col-3 row-2-col-4'
        'row-3-col-1 row-3-col-2 row-3-col-3 row-3-col-4'
        'row-4-col-1 row-4-col-2 null null'
    ;
    grid-template-columns: repeat(4, 1fr);

    grid-auto-rows: 175px;
    gap: 20px;
    align-content: center;
    /* justify-items: center; */
    /* align-items: center; */
    /* margin-top: 15px; */

    .page-content-menu {
        background-color: white;
        display: flex;
        font-size: 13.5px;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #222;
        border: 2px solid transparent;
        &:hover {
            background-color: transparent;
            font-weight: bold;
            border: 2px solid #222;
        }
    }

    @media screen and (max-width: 768px) {
    }
    @media screen and (max-width: 500px) {
        grid-template-areas:
            'row-1-col-1 row-1-col-2 row-1-col-3'
            'row-2-col-1 row-2-col-2 row-2-col-3'
            'row-3-col-1 row-3-col-2 row-3-col-3'
            'row-4-col-1 row-4-col-2 row-4-col-3'
            'row-5-col-1 row-5-col-2 row-5-col-3'
        ;
        margin: 25px auto;
        gap: 15px;

    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 105px;

    }

`;

export const PageContentMenu = styled.div`
    width: 95%;
    display: grid;
    grid-template-columns: ${ ({height}) => height ? 'repeat(4, 1fr)' : 'repeat(auto-fit, minmax(75px, 1fr))' };
    margin: ${({noGap}) => noGap ? '0' : '25px auto 20px'};
    padding-bottom: ${({noGap}) => noGap ? '0' : '15px'};
    grid-auto-rows: ${ ({height}) => height ? height : '35px'};
    gap: ${({gap}) => gap ? gap : '0'};
    align-content: center;
    position: relative;
    #menu-pengaturan-perusahaan:focus ul {
            display: flex;            

    }
    #menu-pengaturan-penggajian:focus ul {
            display: flex;            

    }
    .menu-item  {
        background-color: ${({bgColor}) => bgColor ? bgColor : 'var(--secondary-color)'};
        font-size: 13.5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: ${({color}) => color ? color : 'var(--white)'};
        border: 2px solid transparent;
        text-align: center;
        
        p {
            /* padding-top: 15px; */
        }
        &.active {
            background-color: var(--primary-color);
            color: var(--white);
            font-weight: bold;
        }
        
        &:hover {
            background-color: var(--primary-color);
            font-weight: bold;
            color: var(--white);
            cursor: pointer;    
        }
        &:hover ul {
            display: flex;            
        }
       
        
        &:first-child {
            border-top-left-radius: ${({rightLeftBorder}) => rightLeftBorder ? '10px' : '0'};

        }
        &:last-child {
            border-top-right-radius: ${({rightLeftBorder}) => rightLeftBorder ? '10px' : '0'};

        }
    }
    /* .sub-menu { */
        /* position: relative; */
        /* top: 50px; */
        /* display: flex; */
        /* color: black; */
        /* width: 100%; */
        
    /* } */
    @media screen and (max-width: 500px) {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        grid-auto-rows: 105px;
    
    }
`;