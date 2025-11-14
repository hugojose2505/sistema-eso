import { Axios } from "@/config/axios";

export type InventoryCosmetic = {
  id: string;
  name: string;
  type: string;
  rarity: string;
  imageUrl: string;
  price: number;
};

export type InventoryItem = {
  id: string;
  acquiredAt: string;
  source: string;
  cosmetic: InventoryCosmetic;
};

export async function getInventory(): Promise<InventoryItem[]> {
  try {
    const data = await Axios.get<InventoryItem[]>("/me/inventory");


    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray((data as any).data)) {
      return (data as any).data;
    }

    console.warn("Formato inesperado do inventário, normalizando para []:", data);
    return [];
  } catch (error) {
    console.error("Erro ao buscar inventário:", error);
    throw error;
  }
}
