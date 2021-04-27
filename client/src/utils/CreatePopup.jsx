import React from 'react'
import { Input } from './Input'
import styled from 'styled-components'

export const CreatePopup = ({ onSubmit, closePopup, value, setValue }) => {

    return (
        <PopupForm onSubmit={onSubmit}>
            <div className="modal">
                <div className="button-close" onClick={closePopup}>×</div>
                <span>Create new folder</span>
                <Input placeholder='Enter folder name' value={value} set={setValue} type='text'/>
                <button className="button-create" type="submit">Create</button>
            </div>
        </PopupForm>
    )
}

const PopupForm = styled.form`
    input {
        width: 250px;
    }
    .modal {
        width: 400px;
        height: 250px;
        background-color: #eeeeee;
        display: flex;
        position: fixed;
        top: calc(50vh - 125px);
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
        border-radius: 5px;
        animation: modal 1s;
        @media(max-width: 420px) {
            width: 100%;
        }
    }
    @keyframes modal {
        0% {
            opacity: 0;
            top: calc(50vh - 700px)
        }
        100% {
            opacity: 1;
            top: calc(50vh - 125px)
        }
    }
    .button-create {
        ${props => props.theme.button}
        margin: 15px 0;
        width: 100px;
        height: 35px;
        padding: 0;
    }
    .button-close {
        font-size: 20px;
        margin-bottom: auto;
        margin-left: auto;
        background-color: transparent;
        color: #7f88ff;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.2s ease;
        :hover {
            background-color: #7f88ff;
            color: white;
        }
    }
    span {
        margin-bottom: 15px;
        font-size: 25px;
        font-family: 'Roboto Regular';
        color: black;
    }
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3)
`