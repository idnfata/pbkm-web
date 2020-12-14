import styled from 'styled-components';

import {Title} from './Title'
import {Heading} from './Heading'


const SubTitle = styled.p`
    font-size: .85em;
    color: ${props => props.color ? props.color : 'var(--secondary-color)'};
`;


export { Title, SubTitle, Heading}