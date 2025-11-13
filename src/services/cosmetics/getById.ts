import { Axios } from "@/config/axios";
import type { TCosmetic } from "@/types/TCosmetics";

export async function getCosmeticById(id: string): Promise<TCosmetic> {
  try {
    const response = await Axios.get<TCosmetic | { data: TCosmetic }>(
      `/cosmetics/${id}`
    );

    const cosmetic = (response as any).data ?? response;

    return cosmetic as TCosmetic;
  } catch (error) {
    console.error("Erro ao buscar cosmético por ID:", error);
    throw error;
  }
}
