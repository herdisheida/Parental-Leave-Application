import { forwardRef, ChangeEvent, useState } from 'react';

interface FileProps {
  label: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
}

export const FileUpload = forwardRef<HTMLInputElement, FileProps>(
  ({ label, error, ...props }, ref) => {
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFileNames(Array.from(e.target.files).map(f => f.name));
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            ref={ref}
            onChange={handleChange}
            className="hidden"
            id="file-upload"
            {...props}
          />
          <label htmlFor="file-upload" className="cursor-pointer text-blue-600 font-medium">
            Click to upload files
          </label>
          <div className="mt-2 text-xs text-gray-500">
            {fileNames.length > 0 ? fileNames.join(', ') : "No files selected"}
          </div>
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
FileUpload.displayName = "FileUpload";