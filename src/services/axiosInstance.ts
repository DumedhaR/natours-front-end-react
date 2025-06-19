import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'',
    timeout: 15000
})

export default axiosInstance;