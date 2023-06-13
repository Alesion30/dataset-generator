import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ label, ...inputProps }: InputProps) => {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={inputProps.id}
        className="block text-sm font-bold leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
          <input
            type="text"
            className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            {...inputProps}
          />
        </div>
      </div>
    </div>
  );
};
