import { z } from "zod";

export type Questionnaire = {
  name: string;
  contents: string[];
};

export const questionnaireSchema = z.object({
  name: z.string(),
  contents: z.array(z.string()),
});
