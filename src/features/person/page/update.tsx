import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { personQueries } from "../queries";
import { personApi } from "../api";

type UpdatePersonPageProps = {
  id: string;
};

export const UpdatePersonPage = ({ id }: UpdatePersonPageProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(personQueries.fetchById(id));

  const mutation = useMutation({
    mutationFn: async (data: Person) => personApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(personQueries.fetchById(id).queryKey);
      router.push("/person");
    },
  });

  const onSubmit = (data: Person) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <PersonForm
      isUpdate={true}
      defaultValue={data}
      onSubmit={onSubmit}
      disabled={mutation.isLoading}
    />
  );
};
