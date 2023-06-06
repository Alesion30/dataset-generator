import { Hono } from "hono";

const helloRoute = new Hono();

helloRoute.get("/", async (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export default helloRoute;
