import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-[14px] border border-[#383838] bg-transparent px-5 py-3.5 text-[15px] text-[#fafafa] shadow-xs transition-all outline-none placeholder:text-[#757575] focus-visible:border-[#ffdb70] focus-visible:ring-1 focus-visible:ring-[#ffdb70] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#b84c4c] aria-invalid:ring-2 aria-invalid:ring-[#b84c4c] resize-none",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
