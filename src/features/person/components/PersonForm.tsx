import { FilledButton, TextButton } from "@/components/button";
import { Input, RadioGroup, Textarea } from "@/components/form";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { Person } from "../schemas";
import Link from "next/link";
import { pagePaths } from "@/constants/pagePaths";

type PersonFormProps = {
  isUpdate?: boolean;
  defaultValue?: Person;
  disabled?: boolean;
  onSubmit: (data: Person) => void;
};

export const PersonForm = ({
  isUpdate = false,
  defaultValue,
  disabled,
  onSubmit: _onSubmit,
}: PersonFormProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Person>({
    defaultValues: defaultValue ?? { name: "", sex: "0", personality: "" },
  });

  const onSubmit = handleSubmit(_onSubmit);

  return (
    <form onSubmit={onSubmit} className="container mx-auto my-10 px-4">
      <Link href={pagePaths.person.$url()}>
        <div className="hover:bg-gray-100 rounded-md p-2 inline-block">
          <MdArrowBack size={24} />
        </div>
      </Link>
      <div className="px-4 my-10 space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            人物プリセットの{isUpdate ? "更新" : "登録"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            アンケート入力のための人物のプリセットを作成します
          </p>

          <div className="mt-10 flex flex-col gap-x-6 gap-y-8">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input label="プリセット名" placeholder="男性A" {...field} />
              )}
            />

            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  id="sex"
                  label="性別"
                  {...field}
                  options={[
                    {
                      id: "male",
                      label: "男性",
                      value: "0",
                    },
                    {
                      id: "female",
                      label: "女性",
                      value: "1",
                    },
                  ]}
                />
              )}
            />

            <Controller
              name="personality"
              control={control}
              render={({ field }) => (
                <Textarea label="性格" id="personality" rows={3} {...field} />
              )}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-4">
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
