// users.service.ts for users

import { User } from "@prisma/client";
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from "./users.dto";
import { UserRepository } from "./users.repository";
import { UserValidation } from "./users.request";
import { HTTPException } from "hono/http-exception";

export class UsersService {
  static async registerUser(
    request: RegisterUserRequest
  ): Promise<UserResponse> {
    // validation request
    request = UserValidation.REGISTER.parse(request);

    const checkUser = await UserRepository.checkCountUsernameRepository(
      request.username
    );

    if (checkUser > 0) {
      throw new HTTPException(400, {
        message: "Username already exists",
      });
    }

    request.password = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = await UserRepository.createUserRepository(request);

    return user;
  }

  static async loginUser(request: LoginUserRequest): Promise<UserResponse> {
    // validation request
    request = UserValidation.LOGIN.parse(request);

    const user = await UserRepository.findUserRepository(request.username);
    console.log(user);
    if (!user) {
      throw new HTTPException(401, {
        message: "Username or Password is wrong",
      });
    }

    const checkPassword = await Bun.password.verify(
      request.password,
      user.password,
      "bcrypt"
    );

    console.log("password", checkPassword);

    if (!checkPassword) {
      throw new HTTPException(401, {
        message: "Username or Password is wrong",
      });
    }

    const response = await UserRepository.createTokenUserRepository(
      user.username,
      crypto.randomUUID()
    );

    return {
      name: response.name,
      username: response.username,
      token: response.token ?? undefined,
    };
  }

  static async getUserByToken(token?: string): Promise<User> {
    // validation request
    const result = UserValidation.TOKEN.safeParse(token);

    if (result.error) {
      throw new HTTPException(401, {
        message: JSON.parse(result.error.message)[0].message,
      });
    }

    if (!token) {
      throw new HTTPException(401, {
        message: "UNAUTHORIZED",
      });
    }

    const user = await UserRepository.getUserByTokenRepository(token);

    if (!user) {
      throw new HTTPException(401, {
        message: "UNAUTHORIZED",
      });
    }

    return {
      name: user.name,
      username: user.username,
      token: user.token,
      password: user.password,
    };
  }

  static async updateUserService(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    request = UserValidation.UPDATE.parse(request);
    console.log("requesr ==>", request);

    if (request.name) {
      user.name = request.name;
    }

    if (request.password) {
      console.log(request.password);
      user.password = await Bun.password.hash(request.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
    }

    const result = await UserRepository.updateUserRepository(user);
    console.log(result);
    return result;
  }

  static async logoutUserService(user: User): Promise<UserResponse> {
    return await UserRepository.logoutUserRepository(user);
  }
}
