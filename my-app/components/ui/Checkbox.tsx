import { InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded border 
              transition-all checked:bg-blue-600 checked:border-blue-600 
              ${error ? 'border-red-500' : 'border-gray-300 hover:border-blue-400'}`}
            {...props}
          />
          {/* Checkmark Icon */}
          <svg
            className="absolute w-3.5 h-3.5 mt-0.5 hidden peer-checked:block text-white left-0.5 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </label>
      {error && <span className="text-xs text-red-500 ml-8">{error}</span>}
    </div>
  )
);

Checkbox.displayName = "Checkbox";