// app/application/documents/page.tsx
"use client";

import { MasterData } from "@/lib/schemas/formSchema";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";

export default function DocumentsStep() {
  const router = useRouter();
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<MasterData>();

  const handleNext = async () => {
    const isValid = await trigger(["files"]);
    if (isValid) router.push("/application/review");
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 6: Documents</h2>
        <p className="text-sm text-gray-500">
          Upload your supporting documents.
        </p>{" "}
        [cite: 85]
      </div>

      <FileUpload
        label="Supporting Documents"
        multiple
        accept=".pdf,.jpg,.png"
        {...register("files")}
        error={errors.files?.message as string}
      />

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
        <Button type="button" onClick={handleNext}>
          Next Step
        </Button>
      </div>
    </div>
  );
}
