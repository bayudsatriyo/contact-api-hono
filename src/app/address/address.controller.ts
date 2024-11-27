// address.controller.ts for address

import { Hono } from "hono";
import { ApplicationVariables } from "../../interface";
import { authMiddleware } from "../../applications/middleware";
import { AddressDTO } from "./address.dto";
import { User } from "@prisma/client";
import { AddressService } from "./address.service";

export const addressController = new Hono<{
  Variables: ApplicationVariables;
}>().basePath("/address");

addressController.use(authMiddleware);

addressController
  .post("/", async (c) => {
    const request = (await c.req.json()) as AddressDTO;

    const user = c.get("user") as User;

    const response = await AddressService.createAddressService(request, user);

    return c.json({
      data: response,
    });
  })
  .patch("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const request = (await c.req.json()) as AddressDTO;

    const user = c.get("user") as User;

    const response = await AddressService.updateAddressService(
      id,
      request,
      user
    );

    return c.json({
      data: response,
    });
  })
  .delete("/:contactId/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const user = c.get("user") as User;
    const contactId = Number(c.req.param("contactId"));

    const response = await AddressService.deleteAddressService(
      id,
      contactId,
      user
    );

    return c.json({
      data: response,
    });
  })
  .get("/contactId", async (c) => {
    const user = c.get("user") as User;
    const contactId = Number(c.req.param("contactId"));

    const result = await AddressService.getAllAddressService(contactId, user);
  })
  .get("/:contactId/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const user = c.get("user") as User;
    const contactId = Number(c.req.param("contactId"));

    const result = await AddressService.getAddressByIdService(
      id,
      contactId,
      user
    );

    return c.json({
      data: result,
    });
  });
