// app/application/partner/page.tsx
"use client";

import { MasterData } from "@/lib/schemas/formSchema";
import { useFormContext, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { RadioButton } from "@/components/ui/RadioButton";
import { Button } from "@/components/ui/Button";

export default function PartnerStep() {
  const router = useRouter();
  const {
    register,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<MasterData>();

  // watch the checkbox status
  const hasPartner = watch("hasPartner");

  const onNext = async () => {
    const fieldsToValidate: (keyof MasterData)[] = ["hasPartner"];

    if (hasPartner) {
      fieldsToValidate.push(
        "partnerFullName",
        "partnerKennitala",
        "partnerEmploymentStatus",
      );
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) router.push("/application/leave");
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 3: Partner Information</h2>
      </div>

      <Checkbox label="I have a partner" {...register("hasPartner")} />

      {hasPartner && (
        <div className="space-y-6 p-6 rounded-lg border border-gray-200">
          <Input
            label="Partner Full Name"
            {...register("partnerFullName")}
            error={errors.partnerFullName?.message}
            placeholder="Mima Mami"
          />

          <Input
            label="Partner Kennitala"
            {...register("partnerKennitala")}
            error={errors.partnerKennitala?.message}
            placeholder="000000000" // 10 digits
          />

          <Controller
            name="partnerEmploymentStatus"
            control={control}
            render={({ field }) => (
              <RadioButton
                label="Partner Employment Status"
                options={[
                  { label: "Employed", value: "Employed" },
                  { label: "Self-employed", value: "Self-employed" },
                  { label: "Unemployed", value: "Unemployed" },
                ]}
                error={errors.partnerEmploymentStatus?.message}
                {...field}
              />
            )}
          />
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
