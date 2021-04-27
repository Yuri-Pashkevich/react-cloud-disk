import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { hideUploader } from '../reducers/uploadReducer'
import { FileUpload } from '../utils'

export const Uploader = () => {

    const dispatch = useDispatch()
    const isVisible = useSelector(state => state.upload.isVisible)
 
    const files = useSelector(state => state.upload.files)
    const uploadHandler = () => {
        dispatch(hideUploader())
    }
    
    return ( isVisible &&
        <UploaderStyles>
            <div className="uploader-header">
                <div className="uploader-title">Загрузки</div>
                <button className="uploader-button" onClick={uploadHandler}>×</button>
            </div>
            {
                files.map(file => (
                    <FileUpload key={file.id} file={file}/>
                ))
            }
        </UploaderStyles>
    )
}

const UploaderStyles = styled.div`
    overflow-y: auto;
    width: 300px;
    height: 300px;
    position: fixed;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.uploadbgc};
    padding: 20px;
    border-radius: 5px;
    @media(max-width: 420px) {
        width: 100%;
        padding: 20px;
        height: 170px;
    }
    .uploader-header {
        display: flex;
    }
    .uploader-title {
        font-size: 20px;
        @media(max-width: 420px) {
            font-size: 16px;
        }
    }
    .uploader-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        margin-left: auto;
        margin-right: 0;
        ${props => props.theme.uploadbutton};
    }
`