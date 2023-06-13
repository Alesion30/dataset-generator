import {
  DetailedHTMLProps,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from "react";

type Option = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
>;

type Select = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SelectProps = {
  label: string;
  options: Option[];
} & Select;

export const Select = ({ label, options, ...selectProps }: SelectProps) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={selectProps.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
          {...selectProps}
        >
          {options.map((option) => {
            return <option key={option.id} {...option} />;
          })}
        </select>
      </div>
    </div>
  );
};
