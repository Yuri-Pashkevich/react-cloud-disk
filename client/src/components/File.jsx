import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { deleteFile, downloadFile } from '../actions/file'
import { pushDirToStack, setCurrentDir } from '../reducers/fileReducer'
import { filesizeFormat } from '../utils'

export const File = ({ file }) => {

    const currentDir = useSelector(state => state.file.currentDir)
    const dispatch = useDispatch()

    const openDirHandler = () => {
        dispatch(pushDirToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }
  
    const downloadHandler = e => {
        e.stopPropagation()
        downloadFile(file)
    }

    const deleteHandler = e => {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <FileContainer onClick={file.type === 'dir' ? openDirHandler : null} >
            <div className="list">
                {   
                    file.type === 'dir' 
                        ? 
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="folder" className="dir-img" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"></path></svg>
                        : 
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file" className="file-img" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>
                } 
                <div className="file-name">{file.name}</div>
                <div className={`${file.type !== 'dir' ? "file-date" : "file-date-right"}`}>{file.date.slice(0, 10)}</div>
                <div className="file-size">{filesizeFormat(file.size)}</div>
                <div className="download-delete">
                    {file.type !== 'dir' && <svg className={`${file.type !== 'dir' ? "button-download" : "button-download-file"}`} onClick={downloadHandler} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-download-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"></path></svg>}
                    <svg className="button-delete" onClick={deleteHandler} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
                </div>
            </div>
        </FileContainer>
    )
}

const FileContainer = styled.div`
    
    .list {
        padding: 10px 0;
        display: grid;
        grid-template-columns: 200px repeat(5, 1fr);
        justify-items: center;
        grid-template-rows: 40px;
        align-items: center;
        cursor: pointer;
        transition: 0.2s ease;
        @media(max-width: 800px) {
            grid-template-columns: 1fr 1fr 0 1fr 1fr 1fr
        }
        
        @media(max-width: 680px) {
            grid-template-columns: 0.6fr 1fr 1fr 1fr
        }
        @media(max-width: 420px) {
            font-size: 12px;
            grid-template-columns: 0.6fr 0.8fr 1fr 1fr
        }     
          
        :hover {
            background-color: ${props => props.theme.filehighlightcolor};
            .file-date {
                grid-column-start: 4;
                @media(max-width: 680px) {
                    grid-column-start: 3;
                }
            }
            .file-date-right {
                grid-column-start: 4;
                @media(max-width: 680px) {
                    grid-column-start: 3;
                }
            }
            .button-delete, .button-download, .button-download-file {
                display: block;
                @media(max-width: 680px) {
                    margin: 0 7px;
                }
            }
            .button-download-file {
                grid-column-start: 6
            }
        }
        svg {
            @media(max-width: 680px) {
                margin-left: 20px;
                grid-column-start: 1
            }
            @media(max-width: 420px) {
                margin-left: 10px; 
            }   
        }
    }
    
    .file-name {
        width: 150px;
        justify-self: start;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        @media(max-width: 680px) {
           
            justify-self: start;
            margin-left: 10px
        }
        @media(max-width: 470px) {
            width: 90px;
           
        }
    }
    .file-date {
        grid-column-start: 5;
        @media(max-width: 680px) {
            grid-column-start: 4
        }
        
    }

    .file-date-right {
        grid-column-start: 5;
        @media(max-width: 680px) {
            grid-column-start: 4
        }
    }

    .file-size {
        @media(max-width: 680px) {
            display: none
        }
    }

    .download-delete {
        display: flex;
    }
    .dir-img {
        width: 30px;
        justify-self: start;
        margin-left: 50px;
        color: #c4c4c4;
   
    }
    .file-img {
        justify-self: start;
        height: 30px;
        margin-left: 50px;
        color: #c4c4c4;
    }
    .button-delete, .button-download, .button-download-right {
        margin: 0 10px;
        height: 20px;
        display: none;
        color: ${props => props.theme.deletedownloadcolor};
        transition: 0.2s ease;
        @media(max-width: 420px) {
            height: 16px;
        }
    }
    .button-download, .button-download-right {
        height: 22px;
        @media(max-width: 420px) {
            height: 18px;
        }
    }
    .button-delete {
        :hover {
            color: ${props => props.theme.deletehovercolor};
        }
    }
    .button-download {
        :hover {
            color: ${props => props.theme.downloadhovercolor};
        }
    }
`   