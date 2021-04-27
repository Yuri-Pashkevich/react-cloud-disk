import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import logo from '../assets/img/Cloud disk.png'
import title from '../assets/img/Cloud disk title.png'
import avatarLogo from '../assets/svg/user-circle-solid.svg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BurgerMenu, Search, SearchMenu, ThemeSwitcher } from '../utils'
import { Profile } from '../components'
import { STATIC_URL } from '../config'

export const Navbar = ({ handleThemeSwitch, checked }) => {

    const isAuth = useSelector(state => state.user.isAuth)
    const userName = useSelector(state => state.user.currentUser.name)
    const currentUser = useSelector(state => state.user.currentUser)
    const avatar = currentUser.avatar ? `${STATIC_URL}${currentUser.avatar}` : avatarLogo
    
    // Profile menu ==============================================>

    const [ showProfile, setShowProfile ] = useState(false)
    const handleShowProfile = () => {
        setShowProfile(!showProfile)
    }

    const profileRef = useRef();

    const handleOutsideProfileClick = event => {
        if (!event.path.includes(profileRef.current)) {
            setShowProfile(false)
        }
    }

    const onScrollProfileHide = () => {
        if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
            setShowProfile(false)
        }
    }
    
    // Burger menu ================================================>

    const [ showBurgerMenu, setShowBurgerMenu ] = useState(false)
    const handleShowBurgerMenu = () => {
        setShowBurgerMenu(!showBurgerMenu)
    }

    const burgerRef = useRef();

    const handleOutsideBurgerMenuClick = event => {
        if (!event.path.includes(burgerRef.current)) {
            setShowBurgerMenu(false)
        }
    }

    // Mobile search menu ================================================>

    const [ showMobileSearchMenu, setShowMobileSearchMenu ] = useState(false)
    const handleShowSearchMenu = () => {
        setShowMobileSearchMenu(!showMobileSearchMenu)
    }

    return (
        <div>
            <NavbarContainer>
                <NavLink to='/' className="logo">
                    <img src={logo} alt="logo"/>
                    <img src={title} alt="logo-title"/>
                </NavLink>
                <ul className="navbar-menu">
                    {
                        !isAuth 
                            ? 
                        <>
                            <ThemeSwitcher handleSwitch={handleThemeSwitch} checked={checked}/>
                            <li className="navbar-login">
                                <NavLink to='/login'>Login</NavLink>
                            </li>
                            <li className="navbar-registration">
                                <NavLink to='/registration'>Registration</NavLink>
                            </li>
                            <svg aria-hidden="true" onClick={handleShowBurgerMenu} ref={burgerRef} focusable="false" data-prefix="fas" data-icon="hamburger" className="burger-menu" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 256H48a48 48 0 0 0 0 96h416a48 48 0 0 0 0-96zm16 128H32a16 16 0 0 0-16 16v16a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64v-16a16 16 0 0 0-16-16zM58.64 224h394.72c34.57 0 54.62-43.9 34.82-75.88C448 83.2 359.55 32.1 256 32c-103.54.1-192 51.2-232.18 116.11C4 180.09 24.07 224 58.64 224zM384 112a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM256 80a16 16 0 1 1-16 16 16 16 0 0 1 16-16zm-128 32a16 16 0 1 1-16 16 16 16 0 0 1 16-16z"></path></svg>
                            {showBurgerMenu && <BurgerMenu setShowBurgerMenu={handleShowBurgerMenu} showBurgerMenu={showBurgerMenu} handleOutsideBurgerMenuClick={handleOutsideBurgerMenuClick}/>}
                        </>
                            :
                        <ul className="navbar-user">
                            <ThemeSwitcher className="desktop-theme-switcher" handleSwitch={handleThemeSwitch} checked={checked}/>
                            <Search className="navbar-search"/>
                            <svg onClick={handleShowSearchMenu} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="disk-mobile-menu" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>                            
                            {showMobileSearchMenu && <SearchMenu className="mobile-search" handleSwitch={handleThemeSwitch} checked={checked} switcher="mobile-theme-switcher" handleShowSearchMenu={handleShowSearchMenu}/>}
                            <li className="navbar-name">
                                <div/>
                                    Welcome,<span>{userName}!</span>
                                <div/>
                            </li>
                            <li className="navbar-avatar">
                                <img src={avatar} alt="avatar" className="navbar-avatar-img" onClick={handleShowProfile}/>
                                {showProfile && <div ref={profileRef}><Profile avatar={avatar} username={userName} set={setShowProfile} handleOutsideProfileClick={handleOutsideProfileClick} onScrollProfileHide={onScrollProfileHide}/></div>}
                            </li>
                        </ul>
                    }
                </ul>
            </NavbarContainer>
            <NavbarSeparator/>
        </div>
    )
}
const NavbarSeparator = styled.div`
    height: 2px;
    background-color: #c4c4c4;
`
const NavbarContainer = styled.div`
    font-size: 18px;
    letter-spacing: 0.1px;
    padding: 22px 20px 20px;
    background-color: ${props => props.theme.headerbgc};
    display: flex;
    align-items: center;
    .navbar-menu {
        display: flex;
        margin-left: auto;
        align-items: center;
        a {
            color: ${props => props.theme.linkcolor};
            transition: 0.2s ease;
            :hover {
                color: #7f88ff
            }
        }
    }
    .desktop-theme-switcher {
        @media(max-width: 600px) {
            display: none;
        }
    }
    .navbar-login {
        margin: 0 20px;
        @media(max-width: 560px) {
            display: none;
        }
    }
    .navbar-registration {
        @media(max-width: 560px) {
            display: none;
        }
    }
    .burger-menu {
        color: ${props => props.theme.burgercolor};
        margin-left: 20px;
        height: 35px;
        display: none;
        @media(max-width: 560px) {
            display: block;
        }
    }
    .navbar-user {
        display: flex;
        align-items: center;
    }
    .navbar-search {
        position: relative;
        display: flex;
        align-items: center;
        input {
            margin: 0 20px;
            height: 35px;
            @media(max-width: 800px) {
                margin-right: 0;
            }
            @media(max-width: 600px) {
                display: none
            }
        }
        svg:first-child {
            height: 18px;
            color: #7f88ff;
            position: absolute;
            right: 35px;
            opacity: 75%;
            @media(max-width: 800px) {
                right: 15px;
            }
            @media(max-width: 600px) {
                display: none
            }
        }
        .close-search {
            display: none
        }
    }
    .disk-mobile-menu {
        height: 27px;
        color: ${props => props.theme.diskmenuicon};
        @media(min-width: 601px) {
            display: none
        }
    }
    .navbar-avatar {
        margin-left: 20px;
        height: 50px;
        width: 50px;
        position: relative;
        @media(max-width: 600px) {
            margin-left: 15px;
        }
        .navbar-avatar-img {
            cursor: pointer;
            width: 100%;
            height: 100%;
            object-fit: cover;
            fill: #7f88ff;
            border-radius: 50%;
        }
    }
    .navbar-name {
        display: flex;
        align-items: center;
        color: ${props => props.theme.textcolor};
        span {
            font-family: 'Roboto Regular';
            color: #7f88ff;
            margin-left: 10px;
        }
        div {
            height: 25px;
        }

        div:first-child {
            margin-right: 22px;
            border-left: 1.5px solid #b6bbff
        }
        div:last-child {
            margin-left: 22px;
            border-right: 1.5px solid #b6bbff
        }
        @media(max-width: 800px) {
            display: none
        }
    }
    .navbar-logout {
        cursor: pointer;
    }
    .logo {
        img:first-child {
            width: 80px;
            @media(max-width: 360px) {
                width: 75px;
            }
            @media(max-width: 300px) {
                width: 70px;
            }
        }
        img:last-child {
            width: 150px;
            margin-left: 20px;
            margin-bottom: 5px;
            @media(max-width: 960px) {
                display: none
            }
        }
        display: flex;
        align-items: center;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`