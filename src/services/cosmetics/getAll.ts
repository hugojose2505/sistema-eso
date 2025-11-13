import { Axios } from "@/config/axios";
import type {
  ListCosmeticsQuery,
  PaginatedCosmeticsResponse,
  TCosmetic,
} from "@/types/TCosmetics";

function formatQuery<T extends Record<string, unknown>>(obj: T) {
  const format: Record<string, unknown> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      format[key] = value;
    }
  });

  return format;
}

export async function getAllCosmetics(
  params: ListCosmeticsQuery = {}
): Promise<PaginatedCosmeticsResponse> {
  try {
    const {
      onlyNew,
      onlyOnSale,
      onlyPromo,
      page = 1,
      limit = 20,
      ...rest
    } = params;

    const query = formatQuery({
      ...rest,
      page,
      limit,
      onlyNew: onlyNew ? "true" : undefined,
      onlyOnSale: onlyOnSale ? "true" : undefined,
      onlyPromo: onlyPromo ? "true" : undefined,
    });

    const response = await Axios.get("/cosmetics", {
      params: query,
    });

    const raw = response.data;

    if (Array.isArray(raw)) {
      const items = raw as TCosmetic[];
      return {
        data: items,
        total: items.length,
        page,
        limit,
        totalPages: 1,
      };
    }
    return raw as PaginatedCosmeticsResponse;
  } catch (error) {
    console.error("Erro ao buscar cosméticos:", error);
    throw error;
  }
}
