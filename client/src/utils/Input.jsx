import styled from 'styled-components'
import React from 'react'


export const Input = ({value, type, placeholder, set}) => {
    const handleInput = e => {
        set(e.target.value) 
    }
    return (
        <StyledInput 
            value={value} 
            type={type} 
            placeholder={placeholder}
            onChange={handleInput}
        />
    )
}

export const StyledInput = styled.input`
    font-family: 'Roboto Light';   
    font-size: 14px;
    color: #7f88ff;
    background-color: white;
    border: none;
    border-radius: 5px;
    height: 40px;
    padding: 10px;
    width: 265px;
    margin: 10px 0;
    @media(max-width: 450px) {
        width: 250px;
    }
    @media(max-width: 370px) {
        width: 230px;
    }
    @media(max-width: 340px) {
        width: 215px;
    }
    ::placeholder {
        font-family: 'Roboto Light';   
        font-size: 14px;
    }
    :focus {
        outline: none
    }
`