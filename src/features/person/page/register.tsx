import { FilledButton, TextButton } from "@/components/button";
import { Input, RadioGroup, Textarea } from "@/components/form";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";

type FormData = {
  name: string;
  sex: 0 | 1;
  personality: string;
};

export const RegisterPersonPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", sex: 0, personality: "" },
  });

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

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
            人物プリセットの登録
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
                      value: 0,
                    },
                    {
                      id: "female",
                      label: "女性",
                      value: 1,
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

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <TextButton type="button">キャンセル</TextButton>
        <FilledButton type="submit">登録する</FilledButton>
      </div>
    </form>
  );
};
