import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { uploadAvatar, deleteAvatar } from '../actions/user'
import { logOut } from '../reducers/userReducer'

export const Profile = ({ avatar, username, set, handleOutsideProfileClick, onScrollProfileHide }) => {

    const dispatch = useDispatch()
    const email = useSelector(state => state.user.currentUser.email)

    const changeHandler = e => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideProfileClick)
        window.addEventListener('scroll', onScrollProfileHide);
        return () => {
            document.body.removeEventListener('click', handleOutsideProfileClick)
            window.removeEventListener('scroll', onScrollProfileHide);
        }
    }, [handleOutsideProfileClick, onScrollProfileHide])

    return (
        <ProfileStyles>
            <div className="avatar-upload">
                <img src={avatar} alt="avatar" className="avatar-img"/>
                <label htmlFor="avatar-upload-input" className="avatar-upload-label">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
                </label>
                <input accept="image/*" type="file" id="avatar-upload-input" className="disk-upload-input" onChange={changeHandler}/>
            </div>
            <span className="profile-name">{username}</span>
            <span className="profile-email">{email}</span>
            <button onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>

            <span className="profile-logout"
                onClick={() => {dispatch(logOut()); set(false)}}
            >
                Log out
            </span>
        </ProfileStyles>
    )
}

const ProfileStyles = styled.div`
    font-size: 17px;
    width: 300px;
    position: fixed;
    padding: 20px;
    right: 20px;
    top: 114px;
    border-radius: 5px;
    border: 1px solid #7f88ff;
    background-color: ${props => props.theme.profilebgc};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1;
    color: ${props => props.theme.textcolor};
    animation: profile-shift 1s;
    @media(max-width: 450px) {
        width: 100%;
        right: 0;
        height: 400px;
    }
    @keyframes profile-shift {
        0% {
            top: -350px;
        }
        100% { 
            top: 114px;
        }
    }
    @keyframes profile-view {
        0% {
            opacity: 0
        }
        100% {
            opacity: 1
        }
    }
    .avatar-upload {
        animation: profile-view 2s;
        position: relative;
        .avatar-img {
            
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
        }
        label {
            position: absolute;
        }
    }
    .disk-upload-input {
        animation: profile-view 2s;
        display: none;
    }
    .avatar-upload-label {
        animation: profile-view 2s;
        width: 25px;
        height: 25px;
        cursor: pointer;
        top: 75px;
        right: 8px;
        svg { 
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            color: #c4c4c4;
            background-color: white;
        }
    }
    button {
        animation: profile-view 2s;
        margin: 0;
        height: 46px;
        font-size: 17px;
        padding: 0 15px;
        background-color: #7f88ff;
        color: white;
        border-radius: 5px;
        border: 1px solid transparent;
        transition: 0.2s ease;
        :hover{
            background-color: white;
            color: #7f88ff;
            border: 1px solid #7f88ff;
        }
    }
    .profile-name {
        animation: profile-view 2s;
        font-family: 'Roboto Regular';
        margin-top: 20px;

    }
    .profile-email {
        animation: profile-view 2s;
        margin: 2px 0 20px 0;   
    }
    .profile-logout {
        animation: profile-view 2s;
        font-size: 18px;
        margin: 20px 0 10px;
        cursor: pointer;
        transition: 0.2s ease;
        font-family: 'Roboto Regular';
        :hover {
           
            color: #7f88ff;
        }
    }
`