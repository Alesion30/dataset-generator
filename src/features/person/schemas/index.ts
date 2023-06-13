import { z } from "zod";

export type Person = {
  name: string;
  sex: "0" | "1";
  personality: string;
};

export const personSchema = z.object({
  name: z.string(),
  sex: z.union([z.literal("0"), z.literal("1")]),
  personality: z.string(),
});
