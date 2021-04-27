import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../actions/file'
import styled from 'styled-components'
import { FilesList } from '../components'
import { changeFileView, setCurrentDir } from '../reducers/fileReducer'
import { Uploader, Loader, CreatePopup } from '../utils'

export const Disk = () => {

    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const isLoad = useSelector(state => state.load.isLoad)

    const [sort, setSort] = useState('type')

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, dispatch, sort])

    const [showPopup, setShowPopup] = useState(false)
    const handleShowPopup = () => {
        setShowPopup(!showPopup)
    }

    const [inputValue, setInputValue] = useState('')

    const handleDirCreate = e => {
        e.preventDefault()
        if (inputValue) {
            dispatch(createDir(currentDir, inputValue))
            setShowPopup(false)
            setInputValue('')
        }
    }

    const backDirHandler = () => {
        const prevDir = dirStack.pop()
        dispatch(setCurrentDir(prevDir))
    }

    const fileUploadHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }

    const [dragEnter, setDragEnter] = useState(false)

    const onDragEnterHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }

    const onDragLeaveHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    const onDropHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        let files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    const handleChangeView = view => {
        dispatch(changeFileView(view))
    }

    if (isLoad) {
        return (
            <Loader/>
        )
    }
    
    return (
        <>
            {
                !dragEnter
                    ?
                <DiskContainer onDragEnter={onDragEnterHandler} onDragLeave={onDragLeaveHandler} onDragOver={onDragEnterHandler}>
                    <div className="disk-buttons">
                        <div className="disk-createdir-uploadfile">
                            <div className="disk-back" onClick={backDirHandler}>
                                <svg aria-hidden="true" className="disk-back-icon" focusable="false" data-prefix="fas" data-icon="level-up-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331z"></path></svg>
                            </div> 
                            <svg aria-hidden="true" focusable="false" onClick={handleShowPopup} data-prefix="fas" data-icon="folder-plus" className="folder-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464,128H272L208,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128ZM359.5,296a16,16,0,0,1-16,16h-64v64a16,16,0,0,1-16,16h-16a16,16,0,0,1-16-16V312h-64a16,16,0,0,1-16-16V280a16,16,0,0,1,16-16h64V200a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64a16,16,0,0,1,16,16Z"></path></svg>
                            <label htmlFor="disk-upload-input" className="file-upload-label">                            
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-upload-alt" className="file-upload" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path></svg>
                            </label>
                            <button className="disk-create-dir" onClick={handleShowPopup}>Create folder</button>
                            <label htmlFor="disk-upload-input" className="disk-upload-label">Upload file</label>
                            <input multiple={true} type="file" id="disk-upload-input" className="disk-upload-input" onInput={fileUploadHandler} />
                        </div>
                        <div className="disk-sort">
                            <div className="sort-title">Sort</div> 
                            <select value={sort} onChange={e => setSort(e.target.value)} className="disk-select">
                                <option value="name">name</option>
                                <option value="type">type</option>
                                <option value="date">date</option>
                            </select>
                            <div className="disk-file-view">
                                <svg aria-hidden="true" onClick={() => handleChangeView('plate')} focusable="false" data-prefix="fas" data-icon="th" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"></path></svg>
                                <svg aria-hidden="true" onClick={() => handleChangeView('list')} focusable="false" data-prefix="fas" data-icon="list" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <FilesList />
                    {showPopup && <CreatePopup onSubmit={handleDirCreate} closePopup={handleShowPopup} value={inputValue} setValue={setInputValue} />}
                    <Uploader />
                </DiskContainer>
                    :
                <DropArea onDrop={onDropHandler} onDragLeave={onDragLeaveHandler} onDragOver={onDragEnterHandler} onDragEnter={onDragEnterHandler}>Drop files here</DropArea>
            }

        </>
    )
}

const DiskContainer = styled.div`
    padding: 50px 20px;
    margin: 20px 0;
    background-color: ${props => props.theme.diskbgc};
    border-radius: 10px;
    overflow-y: auto;
    overflow-y: hidden;
    color: ${props => props.theme.textcolor};
    @media(max-width: 680px) {
        overflow-x: auto;
        width: 100%;
    }

    .disk-buttons {
        display: grid;
        grid-template-columns: repeat(2, 1fr)
    }

    .disk-sort {
        display: flex;
        align-items: center;
        margin-left: 50px;
        cursor: pointer;
        justify-self: end;
        @media(max-width: 680px) {
            margin-left: 20px;
        }
        @media(max-width: 460px) {
            margin-left: 0;
        }
    }
    .sort-title {
        @media(max-width: 600px) {
            display: none;
        }
    }

    .disk-back {
        height: 30px;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        cursor: pointer;
        transition: 0.2s ease;
        ${props => props.theme.diskback}
        @media(max-width: 640px) {
            border: .5px solid  transparent;
            background-color: #7f88ff;
        }
        @media(max-width: 420px) {
            width: 25px;
            height: 25px
        }
        svg {
            transform: rotate(-90deg);
            color: ${props => props.theme.diskbacksvgcolor};
            height: 15px; 
            transition: 0.2s ease;
            @media(max-width: 640px) {
                border: .5px solid  transparent;
                color: ${props => props.theme.diskbacksvgcolormedia};
            }
            @media(max-width: 420px) {
                height: 12px
            }
        }
        :hover {
            ${props => props.theme.diskbackhover}
        }
       
    }
    .disk-select {
        ${props => props.theme.button}
        margin: 0 10px 0 20px;
        @media(max-width: 800px) {
            width: 100px
        }
        @media(max-width: 600px) {
            width: 80px
        }
        @media(max-width: 600px) {
            height: 32px;
            padding: 5px;
        }
        @media(max-width: 460px) {
            margin-left: 0;
            margin-right: 0;
            width: 70px;
            height: 28px;
            font-size: 13px
        }
    }
    .disk-createdir-uploadfile {
        display: flex;
        justify-self: start;
        align-items: center;
        .folder-add {
            color: ${props => props.theme.downloadcreateiconscolor};
            height: 32px;
            cursor: pointer;
           
            margin: 0 20px;
            display: none;
            @media(max-width: 640px) {
                display: block;
            }
            @media(max-width: 420px) {
                margin: 0 15px;
                height: 27px
            }
        }
        .file-upload {
            color: ${props => props.theme.downloadcreateiconscolor};
            cursor: pointer;
            height: 27px;
           
            display: none;
            @media(max-width: 640px) {
                display: block;
            }
            @media(max-width: 420px) {
                
                height: 22px
            }
        }
    }
    .disk-create-dir {
        ${props => props.theme.button};
        margin: 0 25px;
        @media(max-width: 800px) {
            width: 120px
        }
        @media(max-width: 640px) {
            display: none
        }
    }
    .disk-upload-input {
        display: none;
    }
    .disk-upload-label {
        ${props => props.theme.button};
        margin: 0;
        @media(max-width: 800px) {
            width: 120px
        }
        @media(max-width: 640px) {
            display: none
        }
    }
    .disk-file-view {
        display: flex;
        align-items: center;
        svg {
            height: 20px;
            color: #7f88ff;
            margin-left: 10px;
        }
    }
`
const DropArea = styled.div`
    width: 1200px;
    height: calc(100vh - 92px - 45px);
    margin-top: 20px;
    border: 3px dotted ${props => props.theme.dropborder};
    display: flex;
    color: ${props => props.theme.textcolor};
    justify-content: center;
    align-items: center;
    font-size: 40px;
    background-color: ${props => props.theme.diskbgc};
    border-radius: 10px;
    @media(max-width: 1200px) {
        width: 960px;
        margin: 20px auto;
    }
    @media(max-width: 1000px) {
        width: 760px;
    }
    @media(max-width: 800px) {
        width: 560px;
    }
    @media(max-width: 600px) {
        width: 460px;
    }
    @media(max-width: 500px) {
        width: 360px;
    }
`