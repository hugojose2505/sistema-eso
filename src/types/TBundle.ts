export type TBundleCosmetic = {
  id: string;
  name: string;
  type: string;
  rarity: string;
  imageUrl?: string;
  price: number;
};

export type TBundle = {
  id: string;
  name: string;
  description?: string;
  price: number;
  cosmetics: TBundleCosmetic[];
  createdAt: string; 
  updatedAt: string; 
};

export type CreateBundlePayload = {
  name: string;
  description?: string;
  price: number;
  cosmeticIds: string[];
};

export type BundlesListResponse = {
  data: TBundle[];
  total: number;
  page: number;
  totalPages: number;
};
