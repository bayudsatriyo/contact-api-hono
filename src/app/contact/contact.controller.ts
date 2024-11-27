// contact.controller.ts for contact

import { Hono } from "hono";
import { ContactService } from "./contact.service";
import { CreateContactDTO, QueryContactDTO } from "./contact.dto";
import { User } from "@prisma/client";
import { ApplicationVariables } from "../../interface";
import { authMiddleware } from "../../applications/middleware";

export const contactController = new Hono<{
  Variables: ApplicationVariables;
}>().basePath("/contact");

contactController.use(authMiddleware);

contactController
  .post("/", async (c) => {
    const request = (await c.req.json()) as CreateContactDTO;

    const user = c.get("user") as User;

    console.log(user);
    const response = await ContactService.createContactService(request, user);

    return c.json(
      {
        data: response,
      },
      201
    );
  })
  .get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const user = c.get("user") as User;

    const response = await ContactService.getContactByIdService(id, user);

    return c.json({
      data: response,
    });
  })
  .get("/", async (c) => {
    const user = c.get("user") as User;
    const request: QueryContactDTO = {
      page: Number(c.req.query("page")) || 1,
      per_page: Number(c.req.query("per_page")) || 10,
      search: c.req.query("search"),
    };

    const response = await ContactService.getAllContactService(user, request);

    return c.json({
      data: response,
    });
  })
  .patch("/:id", async (c) => {
    const request = (await c.req.json()) as CreateContactDTO;
    const id = c.req.param("id");

    const user = c.get("user") as User;

    const response = await ContactService.updateContactService(user, {
      ...request,
      id: parseInt(id),
    });

    return c.json({
      data: response,
      message: "Contact updated",
    });
  })
  .delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const user = c.get("user") as User;

    const response = await ContactService.deleteContactService(user, id);

    return c.json({
      data: response,
      message: "Contact deleted",
    });
  });
