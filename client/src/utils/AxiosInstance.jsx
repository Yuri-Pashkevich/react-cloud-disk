import axios from 'axios'
import { API_URL } from '../config'

export const instanceAxios = axios.create({
    baseURL: API_URL
})

