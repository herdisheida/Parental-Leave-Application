// app/application/employment/page.tsx
"use client";

import { MasterData } from "@/lib/schemas/formSchema";
import { useFormContext, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RadioButton } from "@/components/ui/RadioButton";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function EmploymentStep() {
  const router = useRouter();

  // access the shared context
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<MasterData>();

  // watch the employmentType value to show/hide fields conditionally
  const employmentType = watch("employmentType");

  // handle navigation to the next step
  const onNext = async () => {
    // Define which fields to validate based on selection
    const fieldsToValidate = ["employmentType"];

    if (employmentType === "Employed") {
      fieldsToValidate.push("employerName", "employmentRatio");
    } else if (employmentType === "Self-employed") {
      fieldsToValidate.push("companyName");
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      router.push("/application/partner");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 2: Employment Details</h2>
        <p className="text-sm text-gray-500">
          Specify your current work situation.
        </p>
      </div>

      {/* Employment Type Selection */}
      <Controller
        name="employmentType"
        control={control}
        render={({ field }) => (
          <RadioButton
            label="What is your employment status?"
            options={[
              { label: "Employed", value: "Employed" },
              { label: "Self-employed", value: "Self-employed" },
              { label: "Unemployed", value: "Unemployed" },
            ]}
            error={errors.employmentType?.message as string}
            {...field}
          />
        )}
      />

      {/* if "Employed"  */}
      {employmentType === "Employed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <Input
            label="Employer Name"
            {...register("employerName")}
            error={errors.employerName?.message as string}
            placeholder="Company Ltd."
          />
          <Input
            label="Employment Ratio (%)"
            type="number"
            {...register("employmentRatio")}
            error={errors.employmentRatio?.message as string}
            placeholder="100"
          />
        </div>
      )}

      {/* if "Self-employed"  */}
      {employmentType === "Self-employed" && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <Input
            label="Company Name"
            {...register("companyName")}
            error={errors.companyName?.message as string}
            placeholder="My Own Business"
          />
        </div>
      )}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          back
        </Button>
        <Button type="button" onClick={onNext}>
          next
        </Button>
      </div>
    </div>
  );
}
