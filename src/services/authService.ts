import axios from "./axiosInstance";

export const login = async (email: string, password: string) => {
        const res = await axios.post('/api/v1/users/login',  { email, password });
        return res.data;
}

export const logout = async () => {
        const res = await axios.get('/api/v1/users/logout');
        return res.data;
}