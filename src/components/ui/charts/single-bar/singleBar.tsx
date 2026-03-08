import React from "react";
import clsx from "clsx";
import { SingleBarProps } from "./interface";
import { Loading } from "../../loading";

const getColor = (percent: number, direction: "increasing" | "decreasing") => {
  if (direction === "increasing") {
    if (percent < 75) return "bg-teal-600";
    if (percent < 85) return "bg-orange-500";
    return "bg-red-600";
  } else {
    if (percent > 25) return "bg-teal-600";
    if (percent > 15) return "bg-orange-500";
    return "bg-red-600";
  }
};

export const SingleBar: React.FC<SingleBarProps> = ({
  percent,
  direction,
  maxLabel,
  unit,
  height = 10,
}) => {
  const clamped = Math.max(0, Math.min(100, percent));
  const barColor = getColor(clamped, direction);

  return (
    <div
      className={`flex w-full flex-col ${!percent && "items-center justify-center"} gap-1`}
    >
      {percent ? (
        <>
          <div
            className="relative w-full overflow-hidden rounded-full bg-gray-300"
            style={{ height }}
            dir="ltr"
          >
            <div
              className={clsx(
                "rounded-full transition-all duration-500 ease-in-out",
                barColor,
              )}
              style={{ width: `${clamped}%`, height: "100%" }}
            />
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">
              {maxLabel} {unit}
            </span>
            <span className="text-xs text-gray-500">0 {unit}</span>
          </div>
        </>
      ) : (
        <Loading size="sm" />
      )}
    </div>
  );
};
