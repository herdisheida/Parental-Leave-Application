interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => (
  <nav className="flex mb-8 max-w-2xl justify-items-center mx-auto">
    {steps.map((step, index) => (
      <div key={step} className="flex flex-col items-center flex-1">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 
          ${index <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}
        >
          {index + 1}
        </div>
        <span
          className={`text-xs text-center hidden md:block 
          ${index <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"}`}
        >
          {step}
        </span>
      </div>
    ))}
  </nav>
);
