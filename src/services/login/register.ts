import { Axios } from "@/config/axios";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  id: string;
  name: string;
  email: string;
};

export async function registerRequest(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const response = await Axios.post<RegisterResponse>("/auth/register", payload);

  const data = (response as any).data ?? response;

  return data as RegisterResponse;
}
