import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const BurgerMenu = ({ setShowBurgerMenu, showBurgerMenu, handleOutsideBurgerMenuClick }) => {

    const onHandleMenuHide = () => {
        setShowBurgerMenu(!showBurgerMenu)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideBurgerMenuClick)
        return () => {
            document.body.removeEventListener('click', handleOutsideBurgerMenuClick)
        }
    }, [handleOutsideBurgerMenuClick])

    return (
        <BurgerMenuStyles>
            <li className="burger-login">
                <NavLink onClick={onHandleMenuHide} to='/login'>Login</NavLink>
            </li>
            <li className="burger-registration">
                <NavLink onClick={onHandleMenuHide} to='/registration'>Registration</NavLink>
            </li> 
        </BurgerMenuStyles>
    )
}

const BurgerMenuStyles = styled.ul`
    border-radius: 5px;
    height: calc(100vh - 93px);
    background-color: ${props => props.theme.burgermenubgc};
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 93px;
    width: 100%;
    right: 0px;
    animation: burger-shift 1s;
    @media(min-width: 561px) {
        display: none
    }
    @media(max-width: 360px) {
        top: 89.5px;
    }
    @media(max-width: 300px) {
        top: 87px;
    }
    @keyframes burger-shift {
        0% {
            right: -550px;
        }
        100% { 
            right: 0px;
        }
    }
    .burger-registration {
        margin-top: 20px;
    }
`