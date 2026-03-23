import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        ref={ref}
        className={`border rounded-md p-2 focus:ring-2 outline-none ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);
Input.displayName = "Input";