import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type TextButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const TextButton = ({ ...buttonProps }: TextButtonProps) => {
  return (
    <button
      className="text-sm font-semibold leading-6 text-gray-900"
      {...buttonProps}
    />
  );
};
