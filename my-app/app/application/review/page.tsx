// app/application/review/page.tsx

"use client";

import { type MasterData } from "@/lib/schemas/formSchema";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function ReviewStep() {
  const router = useRouter();
  const { getValues } = useFormContext<MasterData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const values = getValues();

  const onSubmit = async () => {
    setIsSubmitting(true);

    // Simulating the Server Action requirement
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Redirect to confirmation with a mock GUID
      const guid = crypto.randomUUID();
      router.push(`/application/confirmation?id=${guid}`);
    } catch (error) {
      alert("Submission failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold border-b pb-4">
        Review Your Application
      </h2>

      {/* Displaying information in read-only format  */}
      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Applicant</h3>
          <p className="text-sm">
            {values.fullName} ({values.kennitala})
          </p>
          <p className="text-sm">
            {values.email} | {values.phone}
          </p>
        </div>

        {/* Navigation back to specific steps allowed [cite: 95] */}
        <Button
          variant="secondary"
          className="text-xs py-1 px-2"
          onClick={() => router.push("/application/applicant")}
        >
          Edit Applicant Info
        </Button>
      </section>

      {/* Add similar sections for Employment, Partner, Leave, and Payment  */}

      <div className="flex flex-col gap-4 pt-10 border-t">
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing Submission..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}

// TODO
// On failure, an error message should be displayed on the review page
// without losing the form data
