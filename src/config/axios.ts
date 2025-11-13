import axios from "axios";
import { toast } from "react-hot-toast";

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL_BACK_ESO ?? "http://localhost:3001",
  timeout: 20_000,
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const messageFromApi =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;

    if (status === 401) {
      console.warn("Usuário não autorizado - 401");
    }

    const finalMessage = Array.isArray(messageFromApi)
      ? messageFromApi[0]
      : messageFromApi;

    toast.error(finalMessage || "Erro inesperado ao chamar a API");

    return Promise.reject(error);
  }
);
