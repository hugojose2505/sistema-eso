import { Axios } from "@/config/axios";
import { useAuthStore } from "@/store/useAuthStore";

type PurchaseBundleResponse = {
  message: string;
  balance: number;
};

export async function purchaseBundle(bundleId: string): Promise<PurchaseBundleResponse> {
  const { data } = await Axios.post<PurchaseBundleResponse>("/store/purchase", {
    bundleId,
  });

  useAuthStore.getState().updateBalance(data.balance);


  return data;
}
