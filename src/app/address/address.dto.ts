// address.dto.ts for address

export interface AddressDTO {
  contact_id: number;
  street?: string;
  city?: string;
  province?: string;
  postal_code: string;
  country: string;
}

export interface AddressResponseDTO extends Omit<AddressDTO, "contact_id"> {}
