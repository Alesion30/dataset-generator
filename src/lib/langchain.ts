import { ChatOpenAI } from "langchain/chat_models/openai";

export const chat = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
  modelName: "gpt-3.5-turbo",
});
