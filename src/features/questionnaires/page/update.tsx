import { Questionnaire } from "../schemas";
import { QuestionnaireForm } from "../components/QuestionnaireForm";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { questionnaireQueries } from "../queries";
import { questionnaireApi } from "../api";
import { toast } from "react-hot-toast";

type UpdateQuestionnairePageProps = {
  id: string;
};

export const UpdateQuestionnairePage = ({
  id,
}: UpdateQuestionnairePageProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(questionnaireQueries.fetchById(id));

  const mutation = useMutation({
    mutationFn: async (data: Questionnaire) =>
      questionnaireApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(
        questionnaireQueries.fetchById(id).queryKey
      );
      router.push("/questionnaires");
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

  if (isLoading) {
    return <></>;
  }

  return (
    <QuestionnaireForm
      isUpdate={true}
      defaultValue={data}
      onSubmit={onSubmit}
      disabled={mutation.isLoading}
    />
  );
};
