import { db } from "@/lib/firebase";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { Questionnaire, questionnaireSchema } from "../schemas";
import { QuestionnaireForm } from "../components/QuestionnaireForm";

type UpdateQuestionnairePageProps = {
  id: string;
};

export const UpdateQuestionnairePage = ({
  id,
}: UpdateQuestionnairePageProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["questionnaires", id],
    queryFn: async () => {
      const snap = await getDoc(doc(collection(db, "questionnaires"), id));
      const person = questionnaireSchema.parse(snap.data());
      return person;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Questionnaire) => {
      await setDoc(doc(collection(db, "questionnaires"), id), data);
    },
  });

  const onSubmit = (data: Questionnaire) => {
    mutation.mutate(data);
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
