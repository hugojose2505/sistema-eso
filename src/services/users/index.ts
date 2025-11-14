import { Axios } from "@/config/axios";
import type { PaginatedPublicUsersResponse } from "@/types/TUsers";

type GetPublicUsersParams = {
  page?: number;
  limit?: number;
};

export async function getPublicUsers(
  params: GetPublicUsersParams = {}
): Promise<PaginatedPublicUsersResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 20;

  const { data } = await Axios.get<PaginatedPublicUsersResponse>(
    "/public/users",
    {
      params: { page, limit },
    }
  );

  return data;
}
