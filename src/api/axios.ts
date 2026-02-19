import axios from "axios";
const apiBaseURL = import.meta.env.VITE_API_URL;
// Create Axios instance
const api = axios.create({
  baseURL: `${apiBaseURL}/api/v1`, // Backend base URL
});

// Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;