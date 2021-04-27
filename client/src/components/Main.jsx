import React from 'react'
import MERN from '../assets/img/mern_logo.png'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Main = () => {
    return (
        <MainStyles>
            <div className="main-promo">
                <p>Welcome </p>
                <span>to MERN cloud disk!</span>
                <NavLink to='/login'>Start using disk</NavLink>
            </div>
            <img src={MERN} alt="mern"/>
        </MainStyles>
    )
}

const MainStyles = styled.div`
    display: flex;
    padding: 20px;
    align-items: center; 
    min-height: calc(100vh - 250px);
    @media(max-width: 960px) {
        width: 360px;
        margin: 0 auto;
        justify-content: center;
        padding: 20px 0;
        flex-direction: column;
        min-height: calc(100vh - 95px);
    }
    @media(max-width: 360px) {
        width: 300px;  
    }
    @media(max-width: 300px) {
        width: 280px;  
    }
    .main-promo {
        @media(max-width: 960px) {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }

    a {
        font-size: 30px;
        background-color: green;
        padding: 20px;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;
        width: 265px;
        height: 75px;
        transition: 0.2s ease;
        border: 1px solid transparent;
        letter-spacing: .5px;
        @media(max-width: 1150px) {
            font-size: 24px;
            width: 235px;
            height: 65px;
            margin-top: 30px;
        }
        @media(max-width: 760px) {
            font-size: 22px;
            width: 215px;
        }
        @media(max-width: 360px) {
            margin-top: 15px;
            height: 58px;
            width: 210px;
            font-size: 21px;
        }
        @media(max-width: 300px) {
            width: 200px;
            height: 56px;
        }
        :hover {
            background-color: white;
            color: green;
            border: 1px solid green;
        }
    }
    p {
        font-size: 80px;
        color: rgba(0, 0, 0, 0.75);
        letter-spacing: 3px;
        font-family: 'Roboto Regular';
        @media(max-width: 1150px) {
            font-size: 74px;
        }
        @media(max-width: 420px) {
            font-size: 65px;
        }
        @media(max-width: 360px) {
            font-size: 60px;
        }
        @media(max-width: 300px) {
            font-size: 56px; 
        }
    }
    span {
        font-size: 40px;
        font-family: 'Roboto Light';
        line-height: 50px;
        color: rgba(0, 0, 0, 0.75);  
        letter-spacing: 1px;
        @media(max-width: 1150px) {
            font-size: 38px;
        }
        @media(max-width: 420px) {
            font-size: 35px;
        }
        @media(max-width: 360px) {
            font-size: 25px;
        }
        @media(max-width: 300px) {
            font-size: 21px;
        }
    }
    img {
        height: 450px;
        margin-left: auto;
        @media(max-width: 1150px) {
            height: 370px;
        }
        @media(max-width: 960px) {
            height: 250px;
            margin-top: 50px;
            margin-left: 0px
        }
        @media(max-width: 420px) {
            margin-top: 10px;  
        }
        @media(max-width: 360px) {
            height: 200px;
        }
        @media(max-width: 300px) {
            height: 185px;
        }
    }
`