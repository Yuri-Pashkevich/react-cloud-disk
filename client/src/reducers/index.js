import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import fileReducer from './fileReducer'
import loadReducer from './loadReducer'
import uploadReducer from './uploadReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    file: fileReducer,
    upload: uploadReducer,
    load: loadReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))