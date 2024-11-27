import { Context, MiddlewareHandler, Next } from "hono";
import { UsersService } from "../app/users/users.service";

export const authMiddleware: MiddlewareHandler = async (
  c: Context,
  next: Next
) => {
  const token = c.req.header("Authorization");
  const user = await UsersService.getUserByToken(token);

  if (!user) {
    return c.json(
      {
        message: "UNAUTHORIZED",
        status: 401,
      },
      401
    );
  }

  c.set("user", user);

  return next();
};
