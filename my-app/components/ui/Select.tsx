interface SelectProps {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Select = ({ label, options, error, value, onChange }: SelectProps) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`border rounded-md p-2 bg-white ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);