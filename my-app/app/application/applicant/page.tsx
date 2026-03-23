// app/application/applicant/page.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

// validation schema for applicant
const applicantSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  kennitala: z.string().regex(/^\d{10}$/, "Kennitala must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  email: z.string().min(4, "Email is required").email("Email is invalid"),
  phone: z.string().regex(/^\d{7}$/, "Phone number must be 7 digits"),
});

type ApplicantData = z.infer<typeof applicantSchema>;

export default function ApplicantStep() {
  const router = useRouter();

  // access the shared context
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useFormContext<ApplicantData>();

  // handle navigation to the next step
  const onNext = async () => {
    const isValid = await trigger([
      "fullName",
      "kennitala",
      "address",
      "email",
      "phone",
    ]);
    if (isValid) router.push("/application/employment");
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold">Step 1: Applicant Information</h2>
        <p className="text-sm text-gray-500">
          Please provide your personal details as they appear on official
          documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          {...register("fullName")}
          error={errors.fullName?.message}
          placeholder="Peter Parker"
        />
        <Input
          label="Kennitala"
          {...register("kennitala")}
          error={errors.kennitala?.message}
          placeholder="0000000000"
        />
        <div className="md:col-span-2">
          <Input
            label="Address"
            {...register("address")}
            error={errors.address?.message}
            placeholder="Laugavegur 1"
          />
        </div>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="peter@parker.is"
        />
        <Input
          label="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
          placeholder="1234567"
        />
      </div>

      <div className="flex justify-end pt-6">
        <Button type="button" onClick={onNext}>
          next
        </Button>
      </div>
    </div>
  );
}
