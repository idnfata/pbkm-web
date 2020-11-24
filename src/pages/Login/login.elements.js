import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;

`;

export const ImageWrapper = styled.div`
    flex: 1;
    background-color: grey;
    @media screen and (max-width: 960px){
        display :none;   
    }
`;
export const FormWrapper = styled.div`
    width: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    box-sizing: border-box;
    @media screen and (max-width: 960px){
       width: 100%;
    }
`;

export const LoginLogo = styled.img`
    height: 100px;
    width: 175px;
`;

export const LoginImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export const TitlePage = styled.h1`
    font-size: 1.5rem;
    margin-top: 50px;
    margin-bottom: 20px;
`;


export const LoginFailed = styled.div`
    font-size: .9rem;
    padding: 10px;
    /* background-color: #f8d7da; */
    border-color: #f5c6cb;
    /* color: #721c24; */
    color: red;
`;