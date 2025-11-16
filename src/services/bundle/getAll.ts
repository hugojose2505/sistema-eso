import { Axios } from "@/config/axios";
import type { TBundle } from "@/types/TBundle";

export async function getAllBundles(): Promise<TBundle[]> {
  const { data } = await Axios.get<TBundle[]>("/bundles");
  return data;
}