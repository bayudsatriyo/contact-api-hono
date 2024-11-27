// address.service.ts for address

import { HTTPException } from "hono/http-exception";
import { ContactRepository } from "../contact/contact.repository";
import { AddressDTO } from "./address.dto";
import { AddressValidation } from "./address.request";
import { AddressRepository } from "./address.repository";
import { User } from "@prisma/client";

export class AddressService {
  static async createAddressService(data: AddressDTO, user: User) {
    const validate = AddressValidation.CREATE.parse(data);

    const checkContact = await ContactRepository.getContactByIdRepository(
      data.contact_id,
      user.username
    );

    if (!checkContact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }

    const result = await AddressRepository.createAddressRepository(validate);
    return result;
  }

  static async updateAddressService(id: number, data: AddressDTO, user: User) {
    const validate = AddressValidation.UPDATE.parse(data);

    const checkContact = await ContactRepository.getContactByIdRepository(
      data.contact_id,
      user.username
    );

    if (!checkContact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }

    const result = await AddressRepository.updateAddressRepository(
      id,
      validate
    );
    return result;
  }

  static async deleteAddressService(id: number, contactId: number, user: User) {
    const checkContact = await ContactRepository.getContactByIdRepository(
      contactId,
      user.username
    );

    if (!checkContact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }
    const checkAddress = await AddressRepository.getAddressByIdRepository(id);

    if (!checkAddress) {
      throw new HTTPException(404, {
        message: "Address not found",
      });
    }
    const result = await AddressRepository.deleteAddressRepository(id);
    return result;
  }

  static async getAllAddressService(contactId: number, user: User) {
    const checkConact = await ContactRepository.getContactByIdRepository(
      contactId,
      user.username
    );

    if (!checkConact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }
    const result = await AddressRepository.getAllAddressRepository(contactId);
    return result;
  }

  static async getAddressByIdService(
    id: number,
    contactId: number,
    user: User
  ) {
    const checkConact = await ContactRepository.getContactByIdRepository(
      contactId,
      user.username
    );

    if (!checkConact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }
    const result = await AddressRepository.getAddressByIdRepository(id);
    return result;
  }
}
