import { Axios } from "@/config/axios";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    vbucksBalance: number; 
  };
};

export async function loginRequest(
  payload: LoginPayload
): Promise<LoginResponse> {
  const response = await Axios.post<LoginResponse>("/auth/login", payload);
  const data = (response as any).data ?? response;

  if (!data?.accessToken) {
    console.error("Resposta de login inesperada:", data);
    throw new Error("Resposta inválida da API de login.");
  }

  Axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
  Cookies.set("accessToken", data.accessToken, { path: "/" });

  const { setUser } = useAuthStore.getState();
  setUser(data.user); 

  return data;
}
