import { Link } from 'react-router-dom';
import styled from 'styled-components';


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

export const MenuListKaryawan = styled(Link)`
    grid-area: row-1-col-1;
`;

export const MenuJadwal = styled(Link)`
    grid-area: row-1-col-2;

`;

export const MenuKehadiran = styled(Link)`
    grid-area: row-1-col-3;

`;

export const MenuLembur = styled(Link)`
    grid-area: row-2-col-3;

`;

export const MenuIzin = styled(Link)`
    grid-area: row-2-col-1;

`;

export const MenuCuti = styled(Link)`
    grid-area: row-2-col-2;

`;

export const MenuPinjaman = styled(Link)`
    grid-area: row-3-col-1;

`;

export const MenuPenggantianBiaya = styled(Link)`
    grid-area: row-2-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-1;
    }

`;

export const MenuBuatPengumuman = styled(Link)`
    grid-area: row-4-col-2;
    @media screen and (max-width: 500px) {
        grid-area: row-5-col-2;
    }

`;

export const MenuTugas = styled(Link)`
    grid-area: row-1-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-3;
    }
`;

export const MenuPeringatan = styled(Link)`
    grid-area: row-4-col-1;
    @media screen and (max-width: 500px) {
        grid-area: row-5-col-1;
    }

`;

export const MenuBPJS = styled(Link)`
    grid-area: row-3-col-2;

`;
export const MenuPPh21 = styled(Link)`
    grid-area: row-3-col-3;

`;

export const MenuPayroll = styled(Link)`
    grid-area: row-3-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-2;
    }
`;