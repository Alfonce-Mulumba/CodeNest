import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// register
export const registerUser = async (data) => {
  return await axios.post(`${API}/auth/register`, data);
};

// verify email/code
export const verifyUser = async (data) => {
  return await axios.post(`${API}/auth/verify`, data);
};

// login
export const loginUser = async (data) => {
  return await axios.post(`${API}/auth/login`, data);
};

// forgot password
export const forgotPassword = async (data) => {
  return await axios.post(`${API}/auth/forgot-password`, data);
};

// reset password
export const resetPassword = async (data) => {
  return await axios.post(`${API}/auth/reset-password`, data);
};

// resend verification code
export const resendCode = async (data) => {
  return await axios.post(`${API}/auth/resend-code`, data);
};
