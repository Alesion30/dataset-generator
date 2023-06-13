import { db } from "@/lib/firebase";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { QuestionnaireForm } from "../components/QuestionnaireForm";
import { Questionnaire } from "../schemas";

export const RegisterQuestionnairePage = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: Questionnaire) => {
      await addDoc(collection(db, "questionnaires"), data);
    },
  });

  const onSubmit = (data: Questionnaire) => {
    mutation.mutate(data);
  };

  return (
    <QuestionnaireForm onSubmit={onSubmit} disabled={mutation.isLoading} />
  );
};
