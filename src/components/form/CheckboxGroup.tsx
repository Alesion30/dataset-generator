import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Input = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckboxOption = {
  label: string;
  helpText?: string;
} & Omit<Input, "type" | "name">;

type CheckboxGroupProps = {
  label: string;
  helpText?: string;
  name: string;
  options: CheckboxOption[];
};

export const CheckboxGroup = ({
  label,
  helpText,
  name,
  options,
}: CheckboxGroupProps) => {
  return (
    <fieldset>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {label}
      </legend>
      {helpText && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{helpText}</p>
      )}
      <div className="mt-6 flex space-x-6">
        {options.map((option) => {
          return (
            <div key={option.id} className="elative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  name={name}
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                  {...option}
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor={option.id}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {option.label}
                </label>
                {option.helpText && (
                  <p className="text-gray-500">{option.helpText}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};
