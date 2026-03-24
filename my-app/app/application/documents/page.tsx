// app/application/documents/page.tsx
"use client";

import { type MasterData } from "@/lib/schemas/formSchema";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";

export default function DocumentsStep() {
  const router = useRouter();
  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<MasterData>();

  // watch files to display file name
  const selectedFiles = watch("files");

  const onNext = async () => {
    const isValid = await trigger(["files"]);
    if (isValid) router.push("/application/review");
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 6: Documents</h2>
        <p className="text-sm text-gray-500">
          Please upload at least one supporting document (.pdf, .jpg, .png)
        </p>
      </div>

      <FileUpload
        label="Supporting Documents"
        multiple
        accept=".pdf,.jpg,.png"
        {...register("files")}
        error={errors.files?.message as string}
      />

      {/* display file names after selection  */}
      {selectedFiles && selectedFiles.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-2">
            Selected Files:
          </p>
          <ul className="text-sm text-blue-800 list-disc pl-5">
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
