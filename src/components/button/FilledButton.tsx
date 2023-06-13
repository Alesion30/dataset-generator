import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type FilledButtonProps = { isLoading?: boolean } & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const FilledButton = ({
  isLoading,
  ...buttonProps
}: FilledButtonProps) => {
  return (
    <button
      className="rounded-md bg-sky-500 disabled:bg-gray-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
      {...buttonProps}
    />
  );
};
