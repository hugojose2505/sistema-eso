import axios from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BACK_ESO ?? "http://localhost:3001",
});

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const { logout } = useAuthStore.getState();
      logout(); 

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
