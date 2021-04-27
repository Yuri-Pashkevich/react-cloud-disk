import React from 'react'
import styled from 'styled-components'
import { Input, StyledInput } from './Input'
import { NavLink } from 'react-router-dom'

export const Form = ({type, onSubmit, name, email, password, tel, setName, setEmail, setPassword, setTel, height}) => {
    return (
        <FormStyles height={height}>
            <form className="form" onSubmit={onSubmit}>
                <span>{type}</span>
                {setName && <Input value={name} set={setName} placeholder="Name" type="text" required pattern="[a-zA-Zа-яёА-Яё]{3,15}" title="Name must contain Russian or Latin letters at least 3 characters long"/>}
                {setEmail && <Input value={email} set={setEmail} placeholder="Email" type="email" required pattern="/.+@.+\..+/i"/>}
                {setPassword && <Input value={password} set={setPassword} placeholder="Password" type="password" required pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/"/>}
                {setTel && <Input value={tel} set={setTel} placeholder="Phone (not required)" type="tel"/>}
                <StyledInput className="submit" type="submit" value="Send"/>
                {type === 'Authorization' && <NavLink to="/registration">Haven't an account?</NavLink>}
            </form>
        </FormStyles>
    )
}

const FormStyles = styled.div`
    padding: 50px 0px;
    height: 84vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        border: 1.5px solid ${props => props.theme.bordercolor};
        width: 450px;
        height: ${props => props.height};
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme.formbgc};
        @media(max-width: 545px) {
            width: 450px;
        }
        @media(max-width: 490px) {
            width: 400px;
        }
        @media(max-width: 450px) {
            width: 100%;
            
        }
        span {
            margin-bottom: 20px;
            font-size: 25px;
            font-family: 'Roboto Regular';
            color: ${props => props.theme.textcolor};
        }
        a {
            margin-top: 20px;
            color: ${props => props.theme.linkcolor};
        }   
    }
    .submit {
        color: white;
        background-color: #7f88ff;
        border: 1px solid transparent;
        cursor: pointer;
        transition: ease 0.2s;
        :hover {
            border: 1px solid #7f88ff;
            color: #7f88ff;
            background-color: white;
        }
    }
`