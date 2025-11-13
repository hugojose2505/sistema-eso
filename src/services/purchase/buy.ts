import { Axios } from "@/config/axios";

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

  return data as PurchaseResponse;
}
