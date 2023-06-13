import { Person } from "../schemas";
import { PersonForm } from "../components/PersonForm";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { personApi } from "../api";
import { personQueries } from "../queries";
import { toast } from "react-hot-toast";
import { pagePaths } from "@/constants/pagePaths";

export const RegisterPersonPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Person) => personApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(personQueries.fetchAll().queryKey);
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

  return <PersonForm onSubmit={onSubmit} disabled={mutation.isLoading} />;
};
