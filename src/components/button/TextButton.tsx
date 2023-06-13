import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type TextButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const TextButton = ({ ...buttonProps }: TextButtonProps) => {
  return (
    <button
      className="rounded-md text-sm font-semibold text-gray-900 hover:bg-gray-100 px-3 py-2"
      {...buttonProps}
    />
  );
};
