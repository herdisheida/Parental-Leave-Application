// loading state for review page - while submitApplication is processing

import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl pb-6"></h2>
      <LoadingSpinner />
    </div>
  );
}
