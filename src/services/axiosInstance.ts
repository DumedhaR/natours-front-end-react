import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:8000',
    timeout: 15000,
    withCredentials: true,
})

export default axiosInstance;