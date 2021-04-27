import React from 'react'
import { Search, ThemeSwitcher } from '../utils'
import styled from 'styled-components'

export const SearchMenu = ({ className, handleSwitch, checked, switcher, handleShowSearchMenu }) => {
    return (
        <SearchMenuStyle>
            <ThemeSwitcher handleSwitch={handleSwitch} checked={checked} className={switcher}/>
            <Search className={className} handleShowSearchMenu={handleShowSearchMenu}/>
        </SearchMenuStyle>
    )
}

const SearchMenuStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    height: 94px;
    padding: 20px;
    background-color: ${props => props.theme.diskmobilemenubgc};
    animation: search-show 1s;
    @media(min-width: 601px) {
        display: none;
    }
    @keyframes search-show {
        0% {
            left: -500px;
        }
        100% {
            left: 0;
        }
    }
    .mobile-search {
        position: fixed;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        input {
            margin: 0 20px;
            height: 35px;
            width: 100%;
            margin-right: 0;
            @media(min-width: 601px) {
                display: none;
            }
            @media(max-width: 420px) {
               
            }
        }
        svg:first-child {        
            @media(min-width: 200px) {
                display: none
            }
        }
        .close-search {
            height: 18px;
            color: #7f88ff;
            position: absolute;
            right: 15px;
            opacity: 75%;
            @media(min-width: 601px) {
                display: none;
            }
        }
    }
    .mobile-theme-switcher {
        @media(min-width: 601px) {
            display: none;
        }
    }
`