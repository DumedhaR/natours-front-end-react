import axios from "./axiosInstance";

export const updateUser = async (formData: FormData) => {
    const res = await axios.patch('/api/v1/users/updateMe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };