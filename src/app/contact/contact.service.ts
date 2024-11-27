// contact.service.ts for contact

import { Contact, User } from "@prisma/client";
import {
  CreateContactDTO,
  QueryContactDTO,
  UpdateContactDTO,
} from "./contact.dto";
import { ContactValidation } from "./contact.request";
import { ContactRepository } from "./contact.repository";
import { HTTPException } from "hono/http-exception";
import { MetadataDTO } from "../../interface";

export class ContactService {
  static async createContactService(
    data: CreateContactDTO,
    user: User
  ): Promise<Contact> {
    const validate = ContactValidation.CREATE.parse(data);

    const result = await ContactRepository.createContactRepository(
      validate,
      user.username
    );

    return result;
  }

  static async getContactByIdService(id: number, user: User) {
    const validate = ContactValidation.GETBYID.parse(id);
    const result = await ContactRepository.getContactByIdRepository(
      validate,
      user.username
    );

    if (!result) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }

    return result;
  }

  static async getAllContactService(
    user: User,
    data: QueryContactDTO
  ): Promise<MetadataDTO<Contact>> {
    const validate = ContactValidation.GETALL.parse(data);

    const { page, per_page } = validate;
    const [result, count] = await Promise.all([
      ContactRepository.getAllContactRepository(user.username, validate),
      ContactRepository.getCountAllContactRepository(user.username, validate),
    ]);

    return {
      data: result,
      pagination: {
        current_page: page,
        per_page: per_page,
        total: count,
        total_pages: Math.ceil(count / per_page),
      },
    };
  }

  static async updateContactService(
    user: User,
    data: UpdateContactDTO
  ): Promise<Contact> {
    const validate = ContactValidation.UPDATE.parse(data);
    const checkContact = await ContactRepository.getContactByIdRepository(
      validate.id,
      user.username
    );

    if (!checkContact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }
    const result = await ContactRepository.updateContactRepository(
      user.username,
      validate
    );
    return result;
  }

  static async deleteContactService(user: User, id: number) {
    const checkContact = await ContactRepository.getContactByIdRepository(
      id,
      user.username
    );

    if (!checkContact) {
      throw new HTTPException(404, {
        message: "Contact not found",
      });
    }
    const result = await ContactRepository.deleteContactRepository(id);
    return result;
  }
}
