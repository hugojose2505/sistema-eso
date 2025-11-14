// src/services/transactions/getTransactions.ts
import { Axios } from "@/config/axios";

export type TransactionCosmetic = {
  id: string;
  name: string;
  price: number;
};

export type TransactionItem = {
  id: string;
  type: "PURCHASE" | "REFUND" | string;
  itemType: "COSMETIC" | string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  createdAt: string;
  cosmetic?: TransactionCosmetic;
};

export async function getTransactions(): Promise<TransactionItem[]> {
  try {
    const data = await Axios.get<TransactionItem[] | { data: TransactionItem[] }>(
      "/me/transactions" 
    );


    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray((data as any).data)) {
      return (data as any).data;
    }

    console.warn("Formato inesperado de transações, normalizando para []:", data);
    return [];
  } catch (error) {
    console.error("Erro ao buscar histórico de transações:", error);
    throw error;
  }
}
