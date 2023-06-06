import { chat } from "@/lib/langchain";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { z } from "zod";

const exampleRoute = new Hono();

const doraemonQuestionQuerySchema = z.object({
  question: z.string().min(1),
});

exampleRoute.get("/doraemon_question", async (c) => {
  const query = doraemonQuestionQuerySchema.safeParse(c.req.query());
  if (query.success === false) {
    console.error(query.error);
    throw new HTTPException(400, { message: "Bad Request" });
  }

  const res = await chat.call([
    new SystemChatMessage(
      "あなたはドラえもんです。ユーザーの困りごとに対して, ひみつ道具で解決してください。"
    ),
    new HumanChatMessage(query.data.question),
  ]);

  return c.json({
    message: res.text,
  });
});

export default exampleRoute;
