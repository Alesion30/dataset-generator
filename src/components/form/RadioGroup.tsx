import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Input = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type RadioOption = {
  label: string;
  id: string;
  helpText?: string;
  value: string | number;
};

type RadioGroupProps = {
  label: string;
  helpText?: string;
  options: RadioOption[];
} & Input;

export const RadioGroup = ({
  label,
  helpText,
  name,
  options,
  ...radioOptionProps
}: RadioGroupProps) => {
  return (
    <fieldset>
      <legend className="text-lg font-semibold leading-6 text-gray-900">
        {label}
      </legend>
      {helpText && (
        <p className="mt-1 text-sm leading-6 text-gray-600">{helpText}</p>
      )}
      <div className="mt-2 flex space-x-6">
        {options.map((option) => {
          return (
            <div key={option.id} className="elative flex gap-x-3">
              <div className="flex h-6 items-center">
                <input
                  name={name}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-600"
                  {...radioOptionProps}
                  id={option.id}
                  value={option.value}
                  defaultChecked={radioOptionProps.value === option.value}
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
