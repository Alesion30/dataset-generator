import { LikertResponse } from "@/api/questionnaire";
import { TextButton } from "@/components/button";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiInfoCircle } from "react-icons/bi";

export type Result = {
  personName: string;
  questionnaireName: string;
  data: LikertResponse["data"];
};

type ResultModalProps = {
  isOpen: boolean;
  result: Result | null;
  onClose: () => void;
};

export const ResultModal = ({ result, isOpen, onClose }: ResultModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  AIによるアンケート回答結果
                </Dialog.Title>

                {result && (
                  <div className="mt-4 mx-4">
                    <div className="my-6 p-2 border border-slate-300 rounded-md">
                      <p>人物: {result.personName}</p>
                      <p>アンケート: {result.questionnaireName}</p>
                    </div>

                    <table className="table-auto border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-2 whitespace-nowrap">
                            質問
                          </th>
                          <th className="border border-slate-300 p-2 whitespace-nowrap">
                            回答
                          </th>
                          <th className="border border-slate-300 p-2 whitespace-nowrap">
                            考察
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.data.map((v, i) => (
                          <tr key={`result_${i}`}>
                            <td className="border border-slate-300 p-1">
                              {v.question}
                            </td>
                            <td className="border border-slate-300 p-1 text-center">
                              {v.answer}
                            </td>
                            <td className="border border-slate-300 p-1 text-center">
                              {v.consideration && (
                                <button
                                  onClick={() => alert(v.consideration)}
                                  className="hover:bg-slate-200 p-1 rounded-md"
                                >
                                  <BiInfoCircle size={18} />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-4 flex space-x-2">
                  <TextButton type="button" onClick={onClose}>
                    閉じる
                  </TextButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
