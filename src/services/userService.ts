import axios from "./axiosInstance";

export const updateUser = async (formData: FormData) => {
    const res = await axios.patch('/api/v1/users/updateMe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };

export const updatePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
  const res = await axios.patch('/api/v1/users/updateMyPassword',{
    passwordCurrent: currentPassword,
    password: newPassword,
    passwordConfirm: confirmPassword,
  });
  return res.data;
}