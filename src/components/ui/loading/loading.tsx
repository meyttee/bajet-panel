import { FC } from "react";
import type { loadingProps } from "./interface";
import clsx from "clsx";

const Loading: FC<loadingProps> = ({ size = "md", theme = "dark" }) => {
  const parentClasses = clsx("flex", {
    "gap-[3px]": size === "sm",
    "gap-1": size === "md",
    "gap-1.5": size === "lg",
  });
  const commonClasses = clsx(
    "w-1.5 animate-loading-animation rounded-[1px] duration-150",
    {
      "h-4": size === "sm",
      "h-5": size === "md",
      "h-[30px] w-2.5": size === "lg",
    },
  );

  const firstChildClasses = clsx(commonClasses, "delay-[500ms]", {
    "bg-[#2F6FB5]": theme === "dark",
    "bg-zinc-50": theme === "light",
  });

  const secondChildClasses = clsx(commonClasses, "delay-[350ms]", {
    "bg-[#2F6FB5]/50": theme === "dark",
    "bg-[#E5E7EB]": theme === "light",
  });

  const thirdChildClasses = clsx(commonClasses, "delay-200", {
    "bg-[#2F6FB5]/25": theme === "dark",
    "bg-gray-300": theme === "light",
  });

  return (
    <div className={parentClasses}>
      <div className={firstChildClasses} />
      <div className={secondChildClasses} />
      <div className={thirdChildClasses} />
    </div>
  );
};

export default Loading;
