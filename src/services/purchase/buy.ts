import { Axios } from "@/config/axios";
import { useAuthStore } from "@/store/useAuthStore";

type PurchaseResponse = {
  success: boolean;
  message?: string;
  cosmeticId?: string;
};

export async function purchaseCosmetic(
  cosmeticId: string
): Promise<PurchaseResponse> {
  const response = await Axios.post<PurchaseResponse>("/store/purchase", {
    cosmeticId,
  });
  
  const data = (response as any).data ?? response;
  useAuthStore.getState().updateBalance(data.balance);

  return data as PurchaseResponse;
}
