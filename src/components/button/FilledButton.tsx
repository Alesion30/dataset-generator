import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type FilledButtonProps = {
  isLoading?: boolean;
  customType?: "primary" | "error";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const FilledButton = ({
  isLoading,
  customType = "primary",
  ...buttonProps
}: FilledButtonProps) => {
  return (
    <button
      className={clsx(
        "rounded-md  disabled:bg-gray-300 px-3 py-2 text-sm font-semibold shadow-sm",
        customType === "primary"
          ? "bg-sky-500 hover:bg-sky-600 text-white"
          : "bg-red-500 hover:bg-red-600 text-white"
      )}
      {...buttonProps}
    />
  );
};
