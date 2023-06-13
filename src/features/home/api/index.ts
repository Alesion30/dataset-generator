import { LikertResponse } from "@/api/questionnaire";
import { Person } from "@/features/person/schemas";
import { Questionnaire } from "@/features/questionnaires/schemas";

export const gptApi = {
  likert: async (person: Person, questionnaire: Questionnaire) => {
    const res = await fetch("/api/questionnaire/likert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personality: person.personality,
        questions: questionnaire.contents,
      }),
    });
    const data: LikertResponse = await res.json();
    return data;
  },
};
