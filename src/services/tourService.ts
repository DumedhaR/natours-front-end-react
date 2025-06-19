import axios from "./axiosInstance";

export const getAllTours = async () => {
    const res = await axios.get('/api/v1/tours');
    return res.data;
}

export const getTour = async (tourId: string) => {
    const res = await axios.get(`/api/v1/tours/${tourId}`);
    return res.data;
}