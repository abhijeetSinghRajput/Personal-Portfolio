import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-[14px] border border-[#383838] bg-transparent px-5 py-3.5 text-[15px] text-[#fafafa] shadow-xs transition-all outline-none placeholder:text-[#757575] focus-visible:border-[#ffdb70] focus-visible:ring-1 focus-visible:ring-[#ffdb70] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#b84c4c] aria-invalid:ring-2 aria-invalid:ring-[#b84c4c]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
