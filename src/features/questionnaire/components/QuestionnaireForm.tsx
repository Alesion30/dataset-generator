import { FilledButton, TextButton } from "@/components/button";
import { Input, Textarea } from "@/components/form";
import { db } from "@/lib/firebase";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { useMutation } from "react-query";
import { addDoc, collection } from "firebase/firestore";

type Questionnaire = {
  name: string;
  content: string;
};

type QuestionnaireFormProps = {
  isUpdate?: boolean;
  defaultValue?: Questionnaire;
  disabled?: boolean;
  onSubmit: (data: Questionnaire) => void;
};

export const QuestionnaireForm = ({
  isUpdate,
  defaultValue,
  disabled,
  onSubmit: _onSubmit,
}: QuestionnaireFormProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Questionnaire>({
    defaultValues: defaultValue ?? { name: "", content: "" },
  });

  const onSubmit = handleSubmit(_onSubmit);

  return (
    <form onSubmit={onSubmit} className="container mx-auto my-10 px-4">
      <button
        type="button"
        onClick={() => router.back()}
        className="hover:bg-gray-100 rounded-md p-2"
      >
        <MdArrowBack size={24} />
      </button>
      <div className="px-4 my-10 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            アンケートプリセットの{isUpdate ? "更新" : "登録"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            アンケートのプリセットを作成します
          </p>

          <div className="mt-10 flex flex-col gap-x-6 gap-y-8">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="アンケート名"
                  placeholder="性格診断テスト"
                  {...field}
                />
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="アンケート内容"
                  placeholder="複数ある場合は, カンマ区切り（,）で入力してください"
                  id="content"
                  rows={10}
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <TextButton type="button">キャンセル</TextButton>
        <FilledButton type="submit" disabled={disabled}>
          {isUpdate ? "更新する" : "登録する"}
        </FilledButton>
      </div>
    </form>
  );
};
