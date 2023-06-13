import { chat } from "@/lib/langchain";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { questionnairePrompt } from "./prompt";
import { csv2object } from "./utils";

const questionnaireRoute = new Hono();
const personalitySchema = z.object({
  openness: z.number(),
});

const userSchema = z.object({
  age: z.number(),
  height: z.number(),
  gender: z.string(),
  occupation: z.string(),
  education: z.string(),
  personality: personalitySchema,
});

const questionnaireQuerySchema = z.object({
  parameters: userSchema,
  questions: z.array(z.string()),
});

const optionQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
});

const optionQuestionQuerySchema = z.object({
  parameters: userSchema,
  questions: z.array(optionQuestionSchema),
});

const likertQuestionQuerySchema = z.object({
  personality: z.string(),
  questions: z.array(z.string()),
});

questionnaireRoute.post(
  "/",
  zValidator("json", questionnaireQuerySchema, (result) => {
    if (!result.success) {
      const errorMessage = result.error.issues.map((i) => i.message).join("\n");
      throw new HTTPException(400, { message: errorMessage });
    }
  }),
  async (c) => {
    const json = c.req.valid("json");
    const message = JSON.stringify(json);
    const res = await chat.call([
      new SystemChatMessage(questionnairePrompt.short),
      new HumanChatMessage(message),
    ]);

    return c.json({
      message: res.text,
    });
  }
);

questionnaireRoute.post(
  "/option",
  zValidator("json", optionQuestionQuerySchema, (result) => {
    if (!result.success) {
      const errorMessage = result.error.issues.map((i) => i.message).join("\n");
      throw new HTTPException(400, { message: errorMessage });
    }
  }),
  async (c) => {
    const json = c.req.valid("json");
    const message = JSON.stringify(json);
    const res = await chat.call([
      new SystemChatMessage(questionnairePrompt.option),
      new HumanChatMessage(message),
    ]);

    return c.json({
      message: res.text,
    });
  }
);

questionnaireRoute.post(
  "/likert",
  zValidator("json", likertQuestionQuerySchema, (result) => {
    if (!result.success) {
      const errorMessage = result.error.issues.map((i) => i.message).join("\n");
      throw new HTTPException(400, { message: errorMessage });
    }
  }),
  async (c) => {
    const json = c.req.valid("json");
    const message = JSON.stringify(json);
    const res = await chat.call([
      new SystemChatMessage(questionnairePrompt.likert),
      new HumanChatMessage(message),
    ]);

    const result = csv2object(res.text);
    return c.json({
      message: result,
    });
  }
);

export default questionnaireRoute;
