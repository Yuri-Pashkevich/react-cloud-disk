import { instanceAxios } from '../utils/AxiosInstance'
import { setUser } from '../reducers/userReducer'

export const registration = async (name, email, password, tel) => {
    try {
        const response = await instanceAxios.post('/auth/registration', {
            name,
            email,
            password,
            tel
        }) 
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await instanceAxios.post('/auth/login', {
                email,
                password
            }) 
            localStorage.setItem('token', response.data.token)
            dispatch(setUser(response.data.user))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await instanceAxios.get(`/auth/auth`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar = file => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await instanceAxios.post(`/files/avatar`, formData,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await instanceAxios.delete(`/files/avatar`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}