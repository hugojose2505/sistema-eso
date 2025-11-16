import { Axios } from "@/config/axios";
import type { TBundle } from "@/types/TBundle";

export async function getBundleById(id: string): Promise<TBundle> {
  const { data } = await Axios.get<TBundle>(`/bundles/${id}`);
  return data;
}