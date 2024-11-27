import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

export async function errorHandler(error: any, c: Context) {
  if (error instanceof HTTPException) {
    return c.json(
      {
        message: error.message,
        status: error.status,
      },
      error.status
    );
  } else if (error instanceof ZodError) {
    return c.json(
      {
        status: 400,
        message: JSON.parse(error.message)[0].message,
      },
      400
    );
  } else {
    return c.json(
      {
        message: "Internal Server Error",
        status: 500,
      },
      500
    );
  }
}
