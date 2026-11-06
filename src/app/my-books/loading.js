import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="bg-slate-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <Skeleton className="h-9 w-56 rounded-xl bg-slate-200 dark:bg-gray-800" />
            <Skeleton className="mt-2 h-5 w-96 max-w-full rounded-lg bg-slate-100 dark:bg-gray-800/60" />
          </div>
          <Skeleton className="h-11 w-40 rounded-full bg-orange-100 dark:bg-orange-500/15" />
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40">
          <div className="grid grid-cols-[minmax(0,2.4fr)_1fr_1.1fr_1.1fr_minmax(90px,auto)] items-center gap-4 px-6 py-5 border-b border-slate-100 dark:border-gray-800 lg:px-9">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-4 w-full rounded-lg bg-slate-100 dark:bg-gray-800/60 first:w-28"
              />
            ))}
          </div>

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[minmax(0,2.4fr)_1fr_1.1fr_1.1fr_minmax(90px,auto)] items-center gap-4 px-6 py-4 border-b border-slate-100 dark:border-gray-800 last:border-b-0 lg:px-9"
            >
              <div className="flex min-w-0 items-center gap-4">
                <Skeleton className="size-14 shrink-0 rounded-xl bg-slate-200 dark:bg-gray-800" />
                <div className="min-w-0 flex-1">
                  <Skeleton className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-gray-800" />
                </div>
              </div>

              {Array.from({ length: 3 }).map((__, cellIndex) => (
                <Skeleton
                  key={cellIndex}
                  className="h-4 w-20 rounded-lg bg-slate-100 dark:bg-gray-800/60"
                />
              ))}

              <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-gray-800/60" />
                <Skeleton className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-gray-800/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
