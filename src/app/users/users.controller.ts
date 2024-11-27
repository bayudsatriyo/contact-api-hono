// users.controller.ts for users

import { Hono } from "hono";
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./users.dto";
import { UsersService } from "./users.service";
import { ApplicationVariables } from "../../interface";
import { User } from "@prisma/client";
import { authMiddleware } from "../../applications/middleware";

export const usersController = new Hono<{
  Variables: ApplicationVariables;
}>().basePath("/users");

usersController.post("/", async (c) => {
  const request = (await c.req.json()) as RegisterUserRequest;

  const response = await UsersService.registerUser(request);

  return c.json({
    data: response,
  });
});

usersController.post("/login", async (c) => {
  const request = (await c.req.json()) as LoginUserRequest;

  const response = await UsersService.loginUser(request);

  return c.json({
    data: response,
  });
});

usersController.use(authMiddleware);

usersController.get("/", async (c) => {
  const user = c.get("user") as User;
  return c.json({
    data: {
      username: user.username,
      name: user.name,
    },
  });
});

usersController.patch("/", async (c) => {
  const user = c.get("user") as User;
  const request = (await c.req.json()) as UpdateUserRequest;

  console.log(request);

  const response = await UsersService.updateUserService(user, request);

  return c.json({
    data: response,
  });
});

usersController.delete("/", async (c) => {
  const user = c.get("user") as User;

  const response = await UsersService.logoutUserService(user);

  return c.json({
    data: null,
    message: "Logout Success",
  });
});
