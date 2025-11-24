import { Plus, Loader2 } from "lucide-react";
import React from "react";

interface SubmitButtonProps {
  isLoading: boolean;
  title: string;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function SubmitButton({
  isLoading,
  title,
  className = "",
  disabled = false,
  variant = "default",
  size = "md",
}: SubmitButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variantStyles = {
    default:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500",
    destructive:
      "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <div className="sm:col-span-1 mt-4">
      {isLoading ? (
        <button
          disabled
          type="button"
          className={`${buttonClasses} hover:scale-100 active:scale-100`}
        >
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>
            Creating
            {title.toLowerCase().includes("account") ? " Account" : ` ${title}`}
            ...
          </span>
        </button>
      ) : (
        <button
          type="submit"
          disabled={disabled}
          className={`${buttonClasses} hover:scale-[1.02] active:scale-[0.98]`}
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>
            Create
            {title.toLowerCase().includes("account") ? " Account" : ` ${title}`}
          </span>
        </button>
      )}
    </div>
  );
}
