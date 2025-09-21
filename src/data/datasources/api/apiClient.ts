// core/utils/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err);
    //Надо будет ошибку центерилозвать
    return Promise.reject(err);
  }
);

export default apiClient;
