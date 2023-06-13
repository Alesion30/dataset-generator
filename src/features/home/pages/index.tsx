import { FilledButton } from "@/components/button";
import { Select } from "@/components/form";
import { personSchema } from "@/features/person/schemas";
import { questionnaireSchema } from "@/features/questionnaire/schemas";
import { db } from "@/lib/firebase";
import { getDocs, collection } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";

export const HomePage = () => {
  const [personId, setPersonId] = useState<string>();
  const [questionnaireId, setQuestionnaireId] = useState<string>();

  const peopleQuery = useQuery({
    queryKey: ["person"],
    queryFn: async () => {
      const snap = await getDocs(collection(db, "people"));
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...personSchema.parse(doc.data()),
      }));
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        setPersonId(data[0].id);
      }
    },
  });
  const people = peopleQuery.data ?? [];

  const questionnairesQuery = useQuery({
    queryKey: ["questionnaire"],
    queryFn: async () => {
      const snap = await getDocs(collection(db, "questionnaires"));
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...questionnaireSchema.parse(doc.data()),
      }));
    },
    onSuccess: (data) => {
      if (data.length > 0) {
        setQuestionnaireId(data[0].id);
      }
    },
  });
  const questionnaires = questionnairesQuery.data ?? [];

  const onSubmit = () => {
    alert(
      JSON.stringify({
        personId,
        questionnaireId,
      })
    );
  };

  return (
    <div className="container flex flex-col h-screen justify-center items-center space-y-10">
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
          <Link href="/questionnaire" className="text-xs hover:underline">
            アンケートを管理する
          </Link>
        </div>
      </div>
      <div>
        <FilledButton onClick={onSubmit}>作成する</FilledButton>
      </div>
    </div>
  );
};
