import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeUploadFile } from '../reducers/uploadReducer'

export const FileUpload = ({ file }) => {

    const dispatch = useDispatch()
    const uploadFileRemoveHandler = () => {
        dispatch(removeUploadFile(file.id))
    }

    return (
        <UploadFileStyles>
            <div className="upload-file-header">
                <div className="upload-file-name">{file.name}</div>
                <button className="upload-file-remove" onClick={uploadFileRemoveHandler}>×</button>
            </div>
            <div className="upload-file-progressbar">
                <div className="upload-bar" style={{width: file.progress + '%'}}></div>
                <div className="upload-progress">{file.progress}%</div>
            </div>
        </UploadFileStyles>
    )
}

const UploadFileStyles = styled.div`
    background-color: ${props => props.theme.uploadfilebgc};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 15px;
    margin-top: 20px;
    justify-content: center;
    .upload-file-header {
        display: flex; 
    }
    .upload-file-name {
        font-size: 14px;
        @media(max-width: 420px) {
            font-size: 12px;
        }
    }
    .upload-file-remove {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        margin-right: 0;
        border-radius: 5px;
        border: 1px solid transparent;
        cursor: pointer;
        ${props => props.theme.uploadbutton}; 
    }
    .upload-file-progressbar {
        height: 20px;
        border-radius: 5px;
        background-color: white;
        display: flex;
        margin-top: 10px;
    }
    .upload-bar {
        background-color: #7f88ff;
        border-radius: 5px;
    }
    .upload-progress {
        color: #c4c4c4;
        left: 50%;
        position: absolute;
    }
`