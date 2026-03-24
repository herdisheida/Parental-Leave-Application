// app/application/leave/page.tsx

"use client";

import { MasterData } from "@/lib/schemas/formSchema";
import { useFormContext, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { CustomDatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";

export default function LeaveStep() {
  const router = useRouter();
  const {
    control,
    trigger,
    formState: { errors },
  } = useFormContext<MasterData>();

  const onNext = async () => {
    const fieldsToValidate: (keyof MasterData)[] = [
      "startDate",
      "endDate",
      "leaveRatio",
    ];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) router.push("/application/payment");
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 4: Leave Period</h2>
        <p className="text-sm text-gray-500">
          Select your preferred dates and leave ratio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              label="Start Date"
              selected={field.value}
              onChange={field.onChange}
              error={errors.startDate?.message}
            />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              label="End Date"
              selected={field.value}
              onChange={field.onChange}
              error={errors.endDate?.message}
            />
          )}
        />
      </div>

      <Controller
        name="leaveRatio"
        control={control}
        render={({ field }) => (
          <Select
            label="Leave Ratio"
            options={[
              { label: "25%", value: "25%" },
              { label: "50%", value: "50%" },
              { label: "75%", value: "75%" },
              { label: "100%", value: "100%" },
            ]}
            error={errors.leaveRatio?.message}
            {...field}
          />
        )}
      />

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
