import axios from "./axiosInstance";

export const getAllTours = async () => {
    const res = await axios.get('/api/v1/tours');
    // console.log(res);
    return res.data.data.data;
}

export const getTour = async (tourId: string) => {
    const res = await axios.get(`/api/v1/tours/${tourId}`);
    return res.data.data.data;
}