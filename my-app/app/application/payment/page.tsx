// app/application/payment/page.tsx
"use client";

import { MasterData } from "@/lib/schemas/formSchema";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function PaymentStep() {
  const router = useRouter();
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<MasterData>();

  const onNext = async () => {
    const fieldsToValidate: (keyof MasterData)[] = [
      "bankNumber",
      "ledger",
      "accountNumber",
    ];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) router.push("/application/documents");
  };

  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 5: Payment Details</h2>
        <p className="text-sm text-gray-500">
          Enter your Icelandic bank account information.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Bank Account (0000-00-000000)
        </label>
        <div className="flex items-start gap-2">
          <div className="w-24">
            <Input
              label="" // hidden label
              {...register("bankNumber")}
              error={errors.bankNumber?.message}
              placeholder="0000"
              maxLength={4}
            />
          </div>
          <span className="mt-3 font-bold text-gray-400">-</span>
          <div className="w-16">
            <Input
              label="" // hidden label
              {...register("ledger")}
              error={errors.ledger?.message}
              placeholder="00"
              maxLength={2}
            />
          </div>
          <span className="mt-3 font-bold text-gray-400">-</span>
          <div className="flex-1">
            <Input
              label="" // hidden label
              {...register("accountNumber")}
              error={errors.accountNumber?.message}
              placeholder="000000"
              maxLength={6}
            />
          </div>
        </div>
      </div>

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
