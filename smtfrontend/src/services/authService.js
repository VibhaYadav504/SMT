import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const register = (data) => API.post("/auth/register", data);

export const login = (data) => API.post("/auth/login", data);

export const logout = () => API.post("/auth/logout");

export const profile = () => API.get("/auth/profile");

export const forgotPassword = (data) =>
  API.post("/auth/forgot-password", data);

export const verifyResetOtp = (data) =>
  API.post("/auth/verify-reset-otp", data);

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

export const updateProfile = (data) =>
  API.put("/auth/profile", data);

export const changePassword = (data) =>
  API.put("/auth/change-password", data);

export default API;