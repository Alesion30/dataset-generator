import { Hono } from "hono";
import { handle } from "hono/vercel";
import helloRoute from "./hello";
import exampleRoute from "./example";
import questionnaireRoute from "./questionnaire";

const app = new Hono().basePath("/api");

app.route("/hello", helloRoute);
app.route("/example", exampleRoute);
app.route("/questionnaire", questionnaireRoute);

export default handle(app);
