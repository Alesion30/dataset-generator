import { FilledButton } from "@/components/button";
import { Select } from "@/components/form";
import { personQueries } from "@/features/person/queries";
import { questionnaireQueries } from "@/features/questionnaires/queries";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { gptApi } from "../api";
import toast from "react-hot-toast";

export const HomePage = () => {
  const [personId, setPersonId] = useState<string>();
  const [questionnaireId, setQuestionnaireId] = useState<string>();

  const peopleQuery = useQuery({
    ...personQueries.fetchAll(),
    onSuccess: (data) => {
      if (data.length > 0) {
        setPersonId(data[0].id);
      }
    },
  });
  const people = peopleQuery.data ?? [];

  const questionnairesQuery = useQuery({
    ...questionnaireQueries.fetchAll(),
    onSuccess: (data) => {
      if (data.length > 0) {
        setQuestionnaireId(data[0].id);
      }
    },
  });
  const questionnaires = questionnairesQuery.data ?? [];

  const mutation = useMutation({
    mutationFn: async () => {
      const person = people.find((v) => v.id === personId)!;
      const questionnaire = questionnaires.find(
        (v) => v.id === questionnaireId
      )!;

      const result = await gptApi.likert(person, questionnaire);
      alert(JSON.stringify(result));
    },
  });

  const onSubmit = () => {
    const processing = mutation.mutateAsync();
    toast.promise(processing, {
      loading: "Waiting...",
      success: () => "Successfully",
      error: (err) => `This just happened: ${err.toString()}`,
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center space-y-10 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          アンケートの回答を作成
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          人物とアンケートをそれぞれ選択すると、AIが適切な回答を出力してくれます
        </p>
      </div>
      <div className="space-y-6" style={{ width: 400 }}>
        <div>
          {people && (
            <Select
              label="人物"
              options={people.map((v) => ({
                id: v.id,
                label: v.name,
                value: v.id,
              }))}
              onChange={(v) => setPersonId(v.target.value)}
            />
          )}
          <Link href="/person" className="text-xs hover:underline">
            人物を管理する
          </Link>
        </div>
        <div>
          {questionnaires && (
            <Select
              label="アンケート"
              options={questionnaires.map((v) => ({
                id: v.id,
                label: v.name,
                value: v.id,
              }))}
              onChange={(v) => setQuestionnaireId(v.target.value)}
            />
          )}
          <Link href="/questionnaires" className="text-xs hover:underline">
            アンケートを管理する
          </Link>
        </div>
      </div>
      <div>
        <FilledButton disabled={mutation.isLoading} onClick={onSubmit}>
          作成する
        </FilledButton>
      </div>
    </div>
  );
};
