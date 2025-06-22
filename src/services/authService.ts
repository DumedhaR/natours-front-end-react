import axios from "./axiosInstance";

export const login = async (email: string, password: string) => {
        const res = await axios.post('/api/v1/users/login',  { email, password });
        return res.data;
};

export const logout = async () => {
        const res = await axios.get('/api/v1/users/logout');
        return res.data;
};

export const signup = async (userData: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
}) => {
        const res = await axios.post('/api/v1/users/signup', userData);
        return res.data;
};