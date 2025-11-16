import { Axios } from "@/config/axios";
import type { CreateBundlePayload, TBundle } from "@/types/TBundle";

export async function createBundle(payload: CreateBundlePayload): Promise<TBundle> {
  const { data } = await Axios.post<TBundle>("/bundles", payload);
  return data;
}

