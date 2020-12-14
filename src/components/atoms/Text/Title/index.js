import styled from 'styled-components'

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.color ? props.color : "#222"};
    text-transform: capitalize;

    @media screen and (max-width: 768px) {
        font-size: 1.2rem;
        /* letter-spacing: 1px; */
    }
`;
