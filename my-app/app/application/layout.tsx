// FormProvider & Session Handling
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantSchema } from "@/lib/schemas/formSchema";

// step titles of the application process
const STEPS = [
  "Applicant",
  "Employment",
  "Partner",
  "Leave Period",
  "Payment",
  "Documents",
  "Review",
];

// map current path to step index
const PATH_TO_STEP: Record<string, number> = {
  "/application/applicant": 0,
  "/application/employment": 1,
  "/application/partner": 2,
  "/application/leave": 3,
  "/application/payment": 4,
  "/application/documents": 5,
  "/application/review": 6,
};

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // initialize React-Hook-Form
  const methods = useForm({
    resolver: zodResolver(applicantSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      kennitala: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  const { watch } = methods;
  const currentFullName = watch("fullName");

  // Session Handling: Detect hard refresh
  useEffect(() => {
    // If we are deep in the form but the state (fullName) is empty,
    // it implies a hard refresh occurred
    if (
      !currentFullName &&
      pathname !== "/application/applicant" &&
      pathname !== "/application/confirmation"
    ) {
      // redirect back to start
      router.replace("/application/applicant");
    }
  }, [currentFullName, pathname, router]);

  const currentStepIndex = PATH_TO_STEP[pathname] ?? 0;

  return (
    <div className="container mx-auto py-10 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Parental Leave Application
        </h1>
        <p className="text-gray-600">Modernized digital process for Iceland</p>
      </header>

      {/* Step Indicator: Visual guide for the user */}
      {pathname !== "/application/confirmation" && (
        <StepIndicator steps={STEPS} currentStep={currentStepIndex} />
      )}

      {/* Form Provider: Shares state across all /application sub-pages  */}
      <FormProvider {...methods}>
        <main className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {children}
        </main>
      </FormProvider>
    </div>
  );
}
