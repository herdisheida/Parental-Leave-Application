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

      {/* display info (read-only format)  */}
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
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push("/application/applicant")}
        >
          Edit Applicant Info
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Employment</h3>
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
          size="small"
          onClick={() => router.push("/application/employment")}
        >
          Edit Employment Info
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Partner</h3>
          <p className="text-sm">
            {values.hasPartner
              ? `${values.partnerFullName} (${values.partnerKennitala}) - ${values.partnerEmploymentStatus}`
              : "No partner"}
          </p>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push("/application/partner")}
        >
          Edit Partner Info
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Leave Details</h3>
          <p className="text-sm">
            {new Date(values.startDate).toLocaleDateString()} to{" "}
            {new Date(values.endDate).toLocaleDateString()} ({values.leaveRatio}
            %)
          </p>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push("/application/leave")}
        >
          Edit Leave Details
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Payment Info</h3>
          <p className="text-sm">
            Bank: {values.bankNumber} | Ledger: {values.ledger} | Account:{" "}
            {values.accountNumber}
          </p>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push("/application/payment")}
        >
          Edit Payment Info
        </Button>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700">Documents</h3>
          <ul className="list-disc list-inside text-sm">
            {values.files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => router.push("/application/documents")}
        >
          Edit Documents
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
