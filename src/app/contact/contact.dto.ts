// contact.dto.ts for contact

export interface CreateContactDTO {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateContactDTO extends CreateContactDTO {
  id: number;
}

export interface QueryContactDTO {
  search?: string;
  page?: number;
  per_page?: number;
}
