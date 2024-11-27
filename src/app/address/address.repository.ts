// address.repository.ts for address

import prisma from "../../applications/database";
import { AddressDTO } from "./address.dto";

export class AddressRepository {
  static async deleteAddressRepository(id: number) {
    return await prisma.address.delete({ where: { id } });
  }

  static async getAddressByIdRepository(id: number) {
    return await prisma.address.findUnique({ where: { id } });
  }

  static async getAllAddressRepository(contactId: number) {
    return await prisma.address.findMany({ where: { contact_id: contactId } });
  }

  static async createAddressRepository(data: AddressDTO) {
    return await prisma.address.create({ data });
  }

  static async updateAddressRepository(id: number, data: AddressDTO) {
    return await prisma.address.update({
      where: { id },
      data,
    });
  }
}
