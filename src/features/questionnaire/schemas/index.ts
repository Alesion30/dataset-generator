import { z } from "zod";

export type Questionnaire = {
  name: string;
  content: string;
};

export const questionnaireSchema = z.object({
  name: z.string(),
  content: z.string(),
});
