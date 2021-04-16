import styled from 'styled-components';

export const WrapperFormRequest = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 15px auto;
    .fr-header {
        padding: 20px 0;
        width: 100%;
        text-align: center;
        background-color: var(--black);
        color: white;

        @media screen and (max-width: 960px){}
        
        @media screen and (max-width: 516px){
            display: none;

        }
        
        @media screen and (max-width: 320px){}
    }  

    .fr-body {
        margin: 0 auto;
        padding: 20px 0;
        min-height: 500px;
        background-color: white;
        width: 100%;
        display: flex;
        justify-content: center;
        @media screen and (max-width: 960px){}
        
        @media screen and (max-width: 516px){
            background-color: transparent;
            padding: 0;
        }
        
        @media screen and (max-width: 320px){}
        form {
            display: flex;
            flex-direction: column;
            .form-control {
                margin: 10px auto;
                width: 100%;

                
            }
            .error {
                margin-top: 5px;
            }
            .request-button {
                background-color: var(--green);
                color: white;
                margin-right: auto;
                margin-top: 10px;
                padding: 11px 28px;
                font-size: 13px;
                font-weight: bold;
                border-radius: 4px;
                letter-spacing: 1px;
                @media screen and (max-width: 516px){
                    margin-bottom: 75px;
                }
                :hover {
                    background-color: var(--black);

                }
            }
            button {
                margin-top: 10px;

            }
        }
    }

`;

export const OverviewOvertimeRequest = styled.div`
    background-color: #aaa;
`;

