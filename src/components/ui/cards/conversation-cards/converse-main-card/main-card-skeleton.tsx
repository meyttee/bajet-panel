import { FC } from "react";
import "../converse-card-style.css";
import { Skeleton } from ".";

const MainCardSkeleton: FC = () => {
  return (
    <div className="converse-card animate-pulse">
      <div className="converse-card__header">
        <div className="converse-card__user-info flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          <div className="mt-1 flex flex-wrap items-center justify-start gap-2 text-xs sm:mt-0 sm:justify-center">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:items-start">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>

      <div className="converse-card__body">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="mt-2 h-4 w-full rounded" />
      </div>

      <div className="converse-card__footer">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-12 rounded" />

          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </div>

        <Skeleton className="mt-2 h-4 w-10 rounded" />
      </div>
    </div>
  );
};

export default MainCardSkeleton;
