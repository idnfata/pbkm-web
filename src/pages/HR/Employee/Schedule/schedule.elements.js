import styled from 'styled-components'

export const ScheduleContainer = styled.div`
    /* max-width: 1050px; */
    background-color: #aaa;
    /* height: 700px; */
    /* margin: 0 auto; */
    overflow: auto;

    &::-webkit-scrollbar {
        height: 8px !important;
        /* height: 1 */
    }

`;

export const CopyScheduleField = styled.div`
    /* background-color: #aaa; */
    display: flex;
    align-items: flex-start;
    
    flex-direction: column;
    margin-right: 15px;
    
    label {
        font-size: 13px;
        

    }
    input {
        padding: 5px 0;
    }
`;