export type TCosmetic = {
  id: string;
  name: string;
  type: string;
  rarity: string;
  description?: string;
  imageUrl?: string;
  isNew: boolean;
  isOnSale: boolean;
  isPromo: boolean;
  price: number;
  releaseDate?: string; 
};

export type PaginatedCosmeticsResponse = {
  data: TCosmetic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ListCosmeticsQuery = {
  search?: string;
  type?: string;
  rarity?: string;
  startDate?: string;
  endDate?: string;
  onlyNew?: boolean;
  onlyOnSale?: boolean;
  onlyPromo?: boolean;
  page?: number;
  limit?: number;
};
