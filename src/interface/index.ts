import { User } from "@prisma/client";

export type ApplicationVariables = {
  user: User;
};

export interface PaginationDTO {
  total: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}

export interface MetadataDTO<T> {
  pagination: PaginationDTO;
  data: T[];
}
