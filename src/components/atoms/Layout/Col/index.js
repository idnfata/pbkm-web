import styled from 'styled-components';

export const Col = styled.div`
    flex: 1;
    text-align: ${props => (props.align == 'right') ? 'right' : 'left'};
    /* background-color: #eee; */
    /* height: 100px; */

    
`;