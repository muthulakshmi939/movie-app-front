import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: ' https://movie-app-6-8h7h.onrender.com',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance