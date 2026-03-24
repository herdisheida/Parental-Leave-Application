// app/application/review/page.tsx

"use client";

import { submitApplication } from "@/lib/actions/submitApplication";
import { EmploymentType, type MasterData } from "@/lib/schemas/formSchema";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ReviewStep() {
  const router = useRouter();
  const { getValues } = useFormContext<MasterData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const values = getValues();

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const result = await submitApplication(values);

    if (result.success) {
      router.push(`/application/confirmation?id=${result.confirmationId}`);
    } else {
      // display failure msg - don't lose data form
      setError(result.message || "Failed to submit.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold border-b pb-4">
        Review Your Application
      </h2>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Applicant Section */}
      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Applicant Information</h3>
          <p>
            {values.fullName} ({values.kennitala})
          </p>
          <p>
            {values.email} | {values.phone}
          </p>
          <p>{values.address}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/applicant")}
        >
          Edit
        </Button>
      </section>

      {/* Employment Section */}
      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Applicant Information</h3>
          <p className="text-sm">{values.employmentType}</p>
          {values.employmentType === EmploymentType.Employed && (
            <>
              <p className="text-sm">Employer: {values.employerName}</p>
              <p className="text-sm">
                Employment Ratio: {values.employmentRatio}%
              </p>
            </>
          )}
          {values.employmentType === EmploymentType.SelfEmployed && (
            <p className="text-sm">Company: {values.companyName}</p>
          )}
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/employment")}
        >
          Edit
        </Button>
      </section>

      {/* Partner Information Section */}
      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Partner Information</h3>
          <p className="text-sm">
            {values.hasPartner
              ? `${values.partnerFullName} (${values.partnerKennitala}) - ${values.partnerEmploymentStatus}`
              : "No partner"}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/partner")}
        >
          Edit
        </Button>
      </section>

      {/* leave Details Section  */}
      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Leave Period</h3>
          <p>
            Dates: {values.startDate?.toLocaleDateString()} to{" "}
            {values.endDate?.toLocaleDateString()}
          </p>
          <p>Ratio: {values.leaveRatio}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/leave")}
        >
          Edit
        </Button>
      </section>

      {/* Payment Information Section */}
      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Payment Information</h3>
          <p className="text-sm">
            Bank: {values.bankNumber} | Ledger: {values.ledger} | Account:{" "}
            {values.accountNumber}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/payment")}
        >
          Edit
        </Button>
      </section>

      <section className="flex justify-between items-start bg-gray-50 p-4 rounded-lg">
        <div className="text-sm space-y-1">
          <h3 className="font-bold text-gray-900">Documents</h3>
          <ul className="list-disc list-inside text-sm">
            {values.files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <Button
          variant="secondary"
          onClick={() => router.push("/application/documents")}
        >
          Edit
        </Button>
      </section>

      <div className="flex flex-col gap-4 pt-10 border-t">
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing Submission..." : "Submit Application"}
        </Button>
      </div>
    </div>
  );
}
