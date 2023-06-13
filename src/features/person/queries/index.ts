import { createQueryKeys } from "@lukemorales/query-key-factory";
import { personApi } from "../api";

export const personQueries = createQueryKeys("person", {
  fetchAll: () => ({
    queryKey: ["fetchAll"],
    queryFn: () => personApi.fetchAll(),
  }),
  fetchById: (id: string) => ({
    queryKey: ["fetchById", id],
    queryFn: () => personApi.fetchById(id),
  }),
});
