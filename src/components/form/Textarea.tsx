import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

type TextareaProps = {
  label: string;
  helpText?: string;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const Textarea = ({
  label,
  helpText,
  ...textareaProps
}: TextareaProps) => {
  return (
    <div className="col-span-full">
      <label
        htmlFor={textareaProps.id}
        className="block text-lg font-bold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          {...textareaProps}
        />
      </div>
      {helpText && (
        <p className="mt-3 text-sm leading-6 text-gray-600">{helpText}</p>
      )}
    </div>
  );
};
