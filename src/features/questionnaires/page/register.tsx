import { useRouter } from "next/router";
import { QuestionnaireForm } from "../components/QuestionnaireForm";
import { Questionnaire } from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { questionnaireApi } from "../api";
import { questionnaireQueries } from "../queries";
import toast from "react-hot-toast";
import { pagePaths } from "@/constants/pagePaths";

export const RegisterQuestionnairePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Questionnaire) => questionnaireApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(questionnaireQueries.fetchAll().queryKey);
      router.push(pagePaths.questionnaires.$url());
    },
  });

  const onSubmit = (data: Questionnaire) => {
    const processing = mutation.mutateAsync(data);
    toast.promise(processing, {
      loading: "Waiting...",
      success: () => "Successfully",
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  return (
    <QuestionnaireForm onSubmit={onSubmit} disabled={mutation.isLoading} />
  );
};
