export interface TPublicUser {
  id: string;
  name: string;
  email: string;
  vbucksBalance: number;
  createdAt: string;
};

export interface PaginatedPublicUsersResponse {
  data: TPublicUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
