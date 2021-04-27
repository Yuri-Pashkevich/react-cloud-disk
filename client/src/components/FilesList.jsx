import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { File } from '../components'
import { CSSTransition, TransitionGroup } from "react-transition-group"

export const FilesList = () => {

    const files = useSelector(state => state.file.files)
    const fileView = useSelector(state => state.file.view)

    if(!files.length) {
        return <OutOfFiles>Files not found, add it or drag them directly here</OutOfFiles>    
    }
    if (fileView === 'list') {
        return (
            <FileListContainer>
                <div className="filelist-header">
                    <div className="filelist-name">Name</div>
                    <div className="filelist-date">Date</div>
                    <div className="filelist-size">Size</div>
                </div>
                <TransitionGroup>
                    {      
                        files.map(file => 
                            <CSSTransition 
                                key={file._id}
                                timeout={500}
                                classNames={'file'}  
                                exit={false} 
                            >
                                <File file={file}/> 
                            </CSSTransition>
                        )
                    }
                </TransitionGroup>  
            </FileListContainer>
        )
    }
    if(fileView === 'plate') {
        return (
            <FileListContainer>
                <div className="plate">
                    {      
                        files.map(file => 
                            <File file={file} key={file._id}/> 
                        )
                    }
                </div> 
            </FileListContainer>
        )
    }
}

const OutOfFiles = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 270px);
    @media(max-width: 420px) {
        font-size: 14px
    }
    @media(max-width: 360px) {
        font-size: 13px
    }
`

const FileListContainer = styled.div`
    @media(max-width: 420px) {
        font-size: 14px;
    }    
    .plate {
        margin-top: 50px;
        display: grid;
        align-items: start;
        grid-template-columns: repeat(6, 1fr);
        @media(max-width: 840px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media(max-width: 650px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media(max-width: 470px) {
            padding: 10px  
        }
        @media(max-width: 380px) {
            margin-top: 40px;
        }
        .list {
            height: 160px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            @media(max-width: 380px) {
                height: 130px;
                padding: 10px
            }
            .file-name {
                margin: 10px 0;
                text-align: center;
            }
            .file-date, .file-date-right, .file-size {
               display: none; 
            }
            .dir-img {
                width: 50px; 
                margin: 0;
            }
            .file-img {
                height: 48px;
                margin: 0px;
            }
            .button-delete, .button-download, .button-download-right {
                margin-top: 10px;
                @media(max-width: 470px) {
                    margin-top: 5px
                }
                @media(max-width: 380px) {
                    margin-top: 0px    
                }
            }
            :hover {
                border-radius: 5px;
            }
        }
    }
 
    .filelist-header {
        display: grid;
        grid-template-columns: 200px repeat(5, 1fr);
        justify-items: center;
        margin: 20px 0;
        border-bottom: 1px solid ${props => props.theme.tablebordercolor};
        padding: 20px 0;
        @media(max-width: 800px) {
            grid-template-columns: 1fr 1fr 0 1fr 1fr 1fr
        }
        @media(max-width: 680px) {
            grid-template-columns: 0.6fr 1fr 1fr 1fr
        }
        @media(max-width: 420px) {
            grid-template-columns: 0.6fr 0.8fr 1fr 1fr;
            margin: 20px 0;
            padding: 10px 0;
        }   
     
    }
    .filelist-name {
        grid-column-start: 2;
        @media(max-width: 680px) {
            grid-column-start: 2;
        }
    }
    .filelist-date {
        grid-column-start: 5;
        @media(max-width: 680px) {
            grid-column-start: 4;
        }
    }
    .filelist-size {
        @media(max-width: 680px) {
            display: none
        }
    }

    .filelist-name, .filelist-date, .filelist-size {
        font-family: 'Roboto Regular'
    }

    .file-enter-active {
        transition: ease 0.2s;
        animation: file-enter 500ms forwards;
    }
    @keyframes file-enter {
        0% {
            opacity: 0;
            transform: translateY(-50%);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`