import { Link } from 'react-router-dom';
import styled from 'styled-components';

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