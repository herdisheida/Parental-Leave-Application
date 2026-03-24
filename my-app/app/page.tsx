// redirects to /application/applicant

"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const startApplication = () => {
    router.push("/application/applicant"); // first step of the application process
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center my-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 pb-2">
          Parental Leave Application
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Apply for parental leave quickly and easily.
        </p>
      </div>

      <div className="p-6 bg-blue-50 border border-blue-100 rounded-xl max-w-md">
        <h3 className="font-bold text-blue-900 mb-2">Required Documents:</h3>
        <ul className="text-sm text-blue-800 text-left list-disc list-inside space-y-1">
          <li>Personal identification (Kennitala)</li>
          <li>Employment ratio</li>
          <li>Bank account details (0000-00-000000)</li>
          <li>Supporting documents (.pdf, .jpg, .png)</li>
        </ul>
      </div>

      <Button
        size="large"
        onClick={startApplication}
        className="px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all"
      >
        Start New Application
      </Button>

      <p className="text-xs text-gray-400">
        Stafrænt Ísland &copy; 2026. All rights reserved.
      </p>
      <p className="text-xs text-gray-400">
        This is a demo application for educational purposes.
      </p>
    </div>
  );
}
