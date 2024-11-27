// contact.repository.ts for contact

import prisma from "../../applications/database";
import {
  CreateContactDTO,
  QueryContactDTO,
  UpdateContactDTO,
} from "./contact.dto";

export class ContactRepository {
  static async createContactRepository(
    data: CreateContactDTO,
    username: string
  ) {
    return await prisma.contact.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        username,
      },
    });
  }

  static async getContactByIdRepository(id: number, username: string) {
    return await prisma.contact.findUnique({ where: { id, username } });
  }

  static async getAllContactRepository(
    username: string,
    data: QueryContactDTO
  ) {
    const { page = 1, per_page = 10, search } = data;
    const where = {
      username,
    };
    if (search) {
      Object.assign(where, {
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
        ],
      });
    }
    return await prisma.contact.findMany({
      where: where,
      take: per_page,
      skip: (page - 1) * per_page,
    });
  }

  static async getCountAllContactRepository(
    username: string,
    data: QueryContactDTO
  ) {
    const { search } = data;
    const where = {
      username,
    };
    if (search) {
      Object.assign(where, {
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
              contains: search,
            },
          },
        ],
      });
    }
    return await prisma.contact.count({
      where: where,
    });
  }

  static async updateContactRepository(
    username: string,
    data: UpdateContactDTO
  ) {
    return await prisma.contact.update({
      where: { id: data.id, username },
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  static async deleteContactRepository(id: number) {
    return await prisma.contact.delete({ where: { id } });
  }
}
