import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { AIBCheckboxProps } from "./interface";
import { cn } from "@/utils";

export const Checkbox = ({ className, ...props }: AIBCheckboxProps) => {
  return (
    <Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[2px] border shadow-xs transition-shadow outline-none",
        "border-zinc-700 hover:border-zinc-800",
        "focus-visible:border-[#2F6FB5] focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-[state=checked]:border-[#2F6FB5] data-[state=checked]:bg-[#2F6FB5] data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-[#2F6FB5] data-[state=indeterminate]:bg-[#2F6FB5] data-[state=indeterminate]:text-primary-foreground",
        "dark:data-[state=checked]:bg-[#2F6FB5] dark:data-[state=indeterminate]:bg-[#2F6FB5]",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-default disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {props.checked === "indeterminate" ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5 text-white" />
        )}
      </Indicator>
    </Root>
  );
};
