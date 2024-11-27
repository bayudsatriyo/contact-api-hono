// users.repository.ts for users

import { User } from "@prisma/client";
import prisma from "../../applications/database";
import { RegisterUserRequest, UserResponse } from "./users.dto";

export class UserRepository {
  static async checkCountUsernameRepository(username: string): Promise<number> {
    return await prisma.user.count({ where: { username } });
  }

  static async createUserRepository(
    data: RegisterUserRequest
  ): Promise<Omit<User, "password" | "token">> {
    return await prisma.user.create({
      data,
      select: { username: true, name: true },
    });
  }

  static async findUserRepository(username: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { username } });
  }

  static async createTokenUserRepository(
    username: string,
    token: string
  ): Promise<User> {
    return await prisma.user.update({
      where: { username },
      data: { token },
    });
  }

  static async getUserByTokenRepository(token: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
  }

  static async updateUserRepository(data: User): Promise<UserResponse> {
    console.log(data);
    return await prisma.user.update({
      where: { username: data.username },
      data: {
        name: data.name,
        password: data.password,
      },
      select: { username: true, name: true },
    });
  }

  static async logoutUserRepository(user: User): Promise<UserResponse> {
    return await prisma.user.update({
      where: { username: user.username },
      data: { token: null },
      select: { username: true, name: true },
    });
  }
}
