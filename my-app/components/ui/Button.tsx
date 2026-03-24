import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

export const Button = ({
  variant = "primary",
  size = "medium",
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2 rounded-md font-medium transition-colors     hover:scale-102 hover:cursor-pointer     focus:outline-none focus:ring-2     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  };
  const sizes = {
    small: "px-3 py-1 text-xs",
    medium: "px-6 py-2 text-base",
    large: "px-8 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
};
