import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const MenuSettingBranch = styled(Link)`
    grid-area: row-1-col-1;
`;


export const MenuSettingDivision = styled(Link)`
    grid-area: row-1-col-2;

`;



export const MenuSettingPosition = styled(Link)`
    grid-area: row-1-col-3;

`;
export const MenuSettingTeamGroup = styled(Link)`
    grid-area: row-1-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-2-col-1;
    }

`;



export const MenuSettingWorkShift = styled(Link)`
    grid-area: row-2-col-2;
    @media screen and (max-width: 500px) {
        grid-area: row-2-col-3;
    }
`;

export const MenuSettingWorkLocation = styled(Link)`
    grid-area: row-2-col-1;
    @media screen and (max-width: 500px) {
        grid-area: row-2-col-2;
    }
`;
export const MenuSettingBranchHoliday = styled(Link)`
    grid-area: row-2-col-3;
    @media screen and (max-width: 500px) {
        grid-area: row-3-col-1;
    }

`;


export const MenuSettingOvertime = styled(Link)`
    grid-area: row-2-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-3-col-2;
    }

`;

export const MenuSettingLeave = styled(Link)`
    grid-area: row-3-col-1;
    @media screen and (max-width: 500px) {
        grid-area: row-3-col-3;
    }

`;

export const MenuSettingPayroll = styled(Link)`
    grid-area: row-4-col-2;
    @media screen and (max-width: 500px) {
        grid-area: row-5-col-2;
    }

`;


export const MenuSettingPPh21 = styled(Link)`
    grid-area: row-4-col-1;
    @media screen and (max-width: 500px) {
        grid-area: row-5-col-1;
    }

`;

export const MenuSettingPermit = styled(Link)`
    grid-area: row-3-col-2;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-1;
    }

`;
export const MenuSettingLoan = styled(Link)`
    grid-area: row-3-col-3;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-2;
    }

`;

export const MenuSettingBPJS = styled(Link)`
    grid-area: row-3-col-4;
    @media screen and (max-width: 500px) {
        grid-area: row-4-col-3;
    }
`;