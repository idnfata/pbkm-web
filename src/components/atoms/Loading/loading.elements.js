import styled from 'styled-components';

export const Circle = styled.div`
    position: fixed;
    top: 45%;
    left: 47.5%;
    margin: 8px;
    width: 25px;
    height: 25px;
    border: 8px solid #162534;
    border-top: 8px solid #09f;
    border-radius: 50%;
    animation: rotate 2s linear infinite;
    @keyframes rotate{
        100% {transform: rotate(360deg);}
    }
`;
export const Line = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    margin: 0;
    background-color: #b3d4fc;
    display: flex;
    z-index: 999999;
    &:after {
        position: relative;
        top: 0;
        left: 0;
        z-index: 999999;
        height: 3px;
        width: 100%;
        margin: 0;
        background-color: #3f51b5;
        content: '';
        -webkit-animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        animation: running-progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @-webkit-keyframes running-progress {
        0% { margin-left: 0px; margin-right: 100%; }
        50% { margin-left: 25%; margin-right: 0%; }
        100% { margin-left: 100%; margin-right: 0; }
    }
    @keyframes running-progress {
        0% { margin-left: 0px; margin-right: 100%; }
        50% { margin-left: 25%; margin-right: 0%; }
        100% { margin-left: 100%; margin-right: 0; }
    }
`;