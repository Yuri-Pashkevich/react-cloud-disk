import { createGlobalStyle } from 'styled-components';
import { RobotolightWoff2, RobotolightWoff, RobotolightTtf, RobotoWoff2, RobotoWoff, RobotoTtf } from './assets/fonts/fonts'

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Roboto Light';
        src: url(${RobotolightWoff2}) format('woff2'), 
        url(${RobotolightWoff}) format('woff'), 
        url(${RobotolightTtf}) format('truetype');
        font-style: normal;
    }
    @font-face {
        font-family: 'Roboto Regular';
        src: url(${RobotoWoff2}) format('woff2'), 
        url(${RobotoWoff}) format('woff'), 
        url(${RobotoTtf}) format('truetype');
        font-style: normal;
    }
    body {
        margin: 0;
        padding: 0;
        background-color: #f3f3f3;
        font-family: 'Roboto Light';
    }
    h1, h2, h3, h4, h5, p {
        margin: 0;
        padding: 0;
        font-family: 'Roboto Light'
    }
    ul, li {
        margin: 0;
        padding: 0;
        display: block; 
    }
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
    }
    .disk-upload-label {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    select {
        width: 150px;
        margin: 0
    }
`
export default GlobalStyle
