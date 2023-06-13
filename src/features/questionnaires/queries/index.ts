import { createQueryKeys } from "@lukemorales/query-key-factory";
import { questionnaireApi } from "../api";

export const questionnaireQueries = createQueryKeys("questionnaire", {
  fetchAll: () => ({
    queryKey: ["fetchAll"],
    queryFn: () => questionnaireApi.fetchAll(),
  }),
  fetchById: (id: string) => ({
    queryKey: ["fetchById", id],
    queryFn: () => questionnaireApi.fetchById(id),
  }),
});
