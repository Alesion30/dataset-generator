import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personApi } from "../api";
import { personQueries } from "../queries";

export const RegisterPersonPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Person) => personApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(personQueries.fetchAll().queryKey);
      router.push("/person");
    },
  });

  const onSubmit = (data: Person) => mutation.mutate(data);

  return <PersonForm onSubmit={onSubmit} disabled={mutation.isLoading} />;
};
