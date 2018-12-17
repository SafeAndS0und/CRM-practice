import axios from 'axios'
import {url} from '../../../config/constants'

const axiosInstance = axios.create({
    baseURL: url
})


export default axiosInstance