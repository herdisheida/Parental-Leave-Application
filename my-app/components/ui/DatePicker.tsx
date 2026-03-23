
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  label: string;
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  placeholder?: string;
}

export const CustomDatePicker = ({ 
  label, 
  selected, 
  onChange, 
  error, 
  placeholder = "Select date" 
}: DatePickerProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <DatePicker
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          className={`w-full border rounded-md p-2 outline-none focus:ring-2 
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
          // Adding a wrapper class for Tailwind styling of the portal if needed
          portalId="root-portal"
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};