interface RadioProps {
  label: string;
  options: { label: string; value: string }[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}

export const RadioButton = ({
  label,
  options,
  value,
  onChange,
  error,
}: RadioProps) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="flex gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);
