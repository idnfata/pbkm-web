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

export const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 15px 15px 15px 0;
    border-radius: 2.5em;
    background-color: #F5F5FD;
    padding: 1.2em 2.3em;
    height: 100vh;

    @media screen and (max-width: 768px) {
        margin: 0;
        padding: 0;
        border-radius: 0;
    }
`;

