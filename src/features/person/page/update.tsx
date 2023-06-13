import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { personQueries } from "../queries";
import { personApi } from "../api";
import toast from "react-hot-toast";
import { pagePaths } from "@/constants/pagePaths";

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
      queryClient.invalidateQueries(personQueries.fetchAll().queryKey);
      queryClient.invalidateQueries(personQueries.fetchById(id).queryKey);
      router.push(pagePaths.person.$url());
    },
  });

  const onSubmit = (data: Person) => {
    const processing = mutation.mutateAsync(data);
    toast.promise(processing, {
      loading: "Waiting...",
      success: () => "Successfully",
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  const deleteMutation = useMutation({
    mutationFn: async () => personApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(personQueries.fetchAll().queryKey);
      router.push(pagePaths.questionnaires.$url());
    },
  });

  const onDelete = () => {
    const processing = deleteMutation.mutateAsync();
    toast.promise(processing, {
      loading: "Waiting...",
      success: () => "Successfully",
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <PersonForm
      isUpdate={true}
      defaultValue={data}
      onSubmit={onSubmit}
      onDelete={onDelete}
      disabled={mutation.isLoading}
    />
  );
};
