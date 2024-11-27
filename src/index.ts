import { Hono } from "hono";
import { errorHandler } from "./applications/error.handler";
import { usersController } from "./app/users/users.controller";
import { contactController } from "./app/contact/contact.controller";
import { addressController } from "./app/address/address.controller";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", usersController);
app.route("/", contactController);
app.route("/", addressController);

app.onError(errorHandler);

export default app;
