// redirects to /application/applicant

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/application/applicant");
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Home Page</h2>
      <p className="text-sm text-gray-500">Welcome to the Home Page</p>
    </div>
  );
}
