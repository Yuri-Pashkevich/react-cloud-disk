const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const DELETE_FILE = 'DELETE_FILE'
const CHANGE_VIEW = 'CHANGE_VIEW'

const initState = {
    files: [],
    currentDir: null,
    dirStack: [],
    view: 'list'
}

export default function fileReducer (state = initState, action) {
    switch(action.type) {
        case SET_FILES: 
            return {
                ...state, 
                files: action.payload
            }
        case SET_CURRENT_DIR: 
            return {
                ...state, 
                currentDir: action.payload
            }
        case ADD_FILE: 
            return {
                ...state, 
                files: [...state.files, action.payload] 
            }
        case PUSH_TO_STACK: 
            return {
                ...state, 
                dirStack: [...state.dirStack, action.payload]
            }  
        case DELETE_FILE: 
            return {
                ...state, 
                files: [...state.files.filter(file => file._id !== action.payload)]
            }    
        case CHANGE_VIEW: 
            return {
                ...state, 
                view: action.payload
            }  
        default: 
            return state
    }
}

export const setFiles = files => ({
    type: SET_FILES,
    payload: files
})

export const setCurrentDir = dir => ({
    type: SET_CURRENT_DIR,
    payload: dir
})

export const addFile = file => ({
    type: ADD_FILE,
    payload: file
})

export const pushDirToStack = dir => ({
    type: PUSH_TO_STACK,
    payload: dir
})

export const deleteFileAction = file => ({
    type: DELETE_FILE,
    payload: file
})

export const changeFileView = view => ({
    type: CHANGE_VIEW,
    payload: view
})