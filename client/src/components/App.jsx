import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Navbar, Disk, Main, Login, Registration } from '../components'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../actions/user'
import GlobalStyle from '../globalStyles'
import cloud from '../assets/img/cloud.jpg'
import { DarkTheme, LightTheme } from '../Theme'

export const App = () => {
    
    const [theme, setTheme] = useState('light')
    const [checked, setChecked] = useState('unchecked')

    const handleThemeSwitch = () => {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            setTheme('dark')
            localStorage.setItem('check', 'checked')
            setChecked('checked')
       
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light')
            localStorage.setItem('check', 'unchecked')
            setChecked('unchecked')
        }
    }

    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        token && dispatch(auth())
        const localTheme = localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
        const checked = localStorage.getItem('check')
        localTheme && setChecked(checked);
    }, [dispatch, token])

    return (
        <BrowserRouter>
                <AppWrapper>
                    <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
                    <GlobalStyle/>
                        <Navbar checked={checked} handleThemeSwitch={handleThemeSwitch}/>
                        <AppContainer>
                            {
                                !isAuth 
                                    ? 
                                <Switch>
                                    <Route path='/login' component={Login}/>
                                    <Route path='/registration' component={Registration}/>
                                    <Route path='/' component={Main}/>
                                    <Redirect to='/'/>
                                </Switch>
                                    :
                                <Switch>
                                    <Route path='/' exact component={Disk}/>
                                    <Redirect to='/'/>
                                </Switch>
                            }
                        </AppContainer>
                    </ThemeProvider>
                </AppWrapper>
        </BrowserRouter>
    )
}

const AppContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    max-height: 100%;
    @media(max-width: 1200px) {
        width: 100%;
        padding: 0 20px;
        
    }
    @media(max-width: 450px) {
        padding: 0;
    }
`
const AppWrapper = styled.div`
    background-image: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4)), url(${cloud});
    background-position: left;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto minmax(200px, 1fr) auto;
`