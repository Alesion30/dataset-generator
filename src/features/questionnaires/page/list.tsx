import { FilledButton } from "@/components/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiInfoCircle } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import { questionnaireQueries } from "../queries";
import { pagePaths } from "@/constants/pagePaths";

export const QuestionnaireListPage = () => {
  const router = useRouter();

  const { data } = useQuery(questionnaireQueries.fetchAll());

  return (
    <div className="container mx-auto my-10 px-4">
      <Link href={pagePaths.$url()} className="inline-block">
        <div className="hover:bg-gray-100 rounded-md p-2 inline-block">
          <MdArrowBack size={24} />
        </div>
      </Link>
      <div className="px-4 my-10 space-y-10">
        <div className="flex justify-end md:justify-between items-center">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900 md:block hidden">
            アンケートプリセット一覧
          </h2>
          <Link href={pagePaths.questionnaires.register.$url()}>
            <FilledButton>新規作成</FilledButton>
          </Link>
        </div>
        {data && (
          <ul className="space-y-3">
            {data.map((questionnaire) => (
              <li
                key={questionnaire.id}
                className="flex items-center justify-between rounded-md border border-gray-200 px-2 py-2 text-sm"
              >
                <div className="flex w-0 flex-1 items-center">
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-lg">
                      {questionnaire.name}
                    </span>
                  </div>
                  <Link
                    href={pagePaths.questionnaires._id(questionnaire.id).$url()}
                    className="p-2 hover:bg-gray-200 rounded-md"
                  >
                    <BiInfoCircle size={24} />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
