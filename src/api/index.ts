import { Hono } from "hono";
import { handle } from "hono/vercel";
import helloRoute from "./hello";
import exampleRoute from "./example";

const app = new Hono().basePath("/api");

app.route('/hello', helloRoute);
app.route('/example', exampleRoute);

export default handle(app);
