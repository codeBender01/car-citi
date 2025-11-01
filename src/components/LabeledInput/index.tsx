import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface LabeledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-within:border-[#7B3FF2] focus-within:ring-1 focus-within:ring-[#7B3FF2]/20 transition-all">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
            {label}
          </span>
          <Input
            ref={ref}
            className="border-none shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:border-none text-base font-rale"
            {...props}
          />
        </div>
      </div>
    );
  }
);

LabeledInput.displayName = "LabeledInput";

export default LabeledInput;