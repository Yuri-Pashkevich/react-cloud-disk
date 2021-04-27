const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const initState = {
    isLoad: false
}

export default function loadReducer (state = initState, action) {
    switch(action.type) {
        case SHOW_LOADER: return {...state, isLoad: true}
        case HIDE_LOADER: return {...state, isLoad: false}
        default: return state
    }
}

export const showLoader = () => ({ type: SHOW_LOADER })
export const hideLoader = () => ({ type: HIDE_LOADER })
