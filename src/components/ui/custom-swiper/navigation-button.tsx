import { FC } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/utils";
import { NavigationButtonProps } from "./interface";

const NavigationButton: FC<NavigationButtonProps> = ({
  direction,
  onClick,
  disabled,
  ariaLabel,
}) => {
  const Icon = direction === "next" ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={cn(
        "cursor-pointer rounded-full border border-teal-500 bg-white p-2 shadow-sm",
        "transition-all duration-200",
        "hover:scale-105 hover:shadow-md",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100",
        "md:absolute md:top-1/2 md:z-10 md:-translate-y-1/2",
        direction === "prev" ? "md:right-0" : "md:left-0",
      )}
      aria-label={ariaLabel}
    >
      <Icon className="h-5 w-5 text-teal-600" />
    </button>
  );
};
export default NavigationButton;
