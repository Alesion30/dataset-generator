import { FilledButton, TextButton } from "@/components/button";
import { Input, Textarea } from "@/components/form";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { Questionnaire } from "../schemas";
import { CiCircleRemove } from "react-icons/ci";
import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import { pagePaths } from "@/constants/pagePaths";

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
    defaultValues: defaultValue ?? { name: "", contents: [] },
  });

  const { fields, append, remove } = useFieldArray({
    name: "contents" as never,
    control,
  });

  const onSubmit = handleSubmit(_onSubmit);

  return (
    <form onSubmit={onSubmit} className="container mx-auto my-10 px-4">
      <Link href={pagePaths.questionnaires.$url()}>
        <div className="hover:bg-gray-100 rounded-md p-2 inline-block">
          <MdArrowBack size={24} />
        </div>
      </Link>
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

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="block text-lg font-bold leading-6 text-gray-900">
                  アンケート内容
                </label>
                <button
                  type="button"
                  onClick={() => append("")}
                  className="text-green-500 hover:text-green-600"
                >
                  <BsPlusCircleFill size={24} />
                </button>
              </div>
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`contents.${index}`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-300 hover:text-red-500"
                      >
                        <CiCircleRemove size={24} />
                      </button>
                      <div className="w-full">
                        <Textarea
                          label={""}
                          placeholder="他人に自己紹介するのが苦手だと感じる。"
                          {...field}
                        />
                      </div>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <TextButton type="button" onClick={() => router.back()}>
          キャンセル
        </TextButton>
        <FilledButton type="submit" disabled={disabled}>
          {isUpdate ? "更新する" : "登録する"}
        </FilledButton>
      </div>
    </form>
  );
};
