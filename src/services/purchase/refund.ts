import { Axios } from "@/config/axios";
import { useAuthStore } from "@/store/useAuthStore";

type RefundResponse = {
  success: boolean;
  message?: string;
  cosmeticId?: string;
};

export async function refundCosmetic(
  cosmeticId: string
): Promise<RefundResponse> {
  const response = await Axios.post<RefundResponse>("/store/refund", {
    cosmeticId,
  });

  const data = (response as any).data ?? response;
  console.log("Refund response data:", data);
  useAuthStore.getState().updateBalance(data.balance);

  return data as RefundResponse;
}
