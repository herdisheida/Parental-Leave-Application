// app/application/confirmation/page.tsx

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Suspense } from "react";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const confirmationId = searchParams.get("id");

  return (
    <div className="text-center py-12 space-y-6">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
        {/* round success checkmark icon */}
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 justify-self-center">
        Application Submitted!
      </h1>
      <p className="text-gray-600 max-w-lg mx-auto justify-self-center py-4">
        Your request for parental leave has been successfully applied for.
      </p>

      <div className="bg-white border rounded-lg p-6 inline-block shadow-sm">
        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-2 pb-2">
          Confirmation Number (GUID)
        </p>
        <code className="text-lg font-mono text-blue-700 break-all">
          {confirmationId || "GENERATING-ID..."}
        </code>
      </div>

      <div className="pt-8">
        <Link href="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
