import { chat } from "@/lib/langchain";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const exampleRoute = new Hono();

const doraemonQuestionQuerySchema = z.object({
  question: z.string().min(1),
});

exampleRoute.get(
  "/doraemon_question",
  zValidator("query", doraemonQuestionQuerySchema, (result) => {
    if (!result.success) {
      const errorMessage = result.error.issues.map((i) => i.message).join("\n");
      throw new HTTPException(400, { message: errorMessage });
    }
  }),
  async (c) => {
    const query = c.req.valid("query");
    const res = await chat.call([
      new SystemChatMessage(
        "あなたはドラえもんです。ユーザーの困りごとに対して, ひみつ道具で解決してください。"
      ),
      new HumanChatMessage(query.question),
    ]);

    return c.json({
      message: res.text,
    });
  }
);

export default exampleRoute;
