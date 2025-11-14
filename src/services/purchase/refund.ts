import { Axios } from "@/config/axios";

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

  return data as RefundResponse;
}
