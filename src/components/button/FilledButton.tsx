import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type FilledButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const FilledButton = ({ ...buttonProps }: FilledButtonProps) => {
  return (
    <button
      className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      {...buttonProps}
    />
  );
};
