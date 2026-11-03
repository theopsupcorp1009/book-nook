import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Skeleton className="mb-8 h-5 w-40 rounded-lg bg-gray-200" />

      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-5 overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200 sm:max-w-[500] sm:mx-auto md:max-w-full lg:max-w-full">
        <div className="relative min-h-[100vh] shrink-0 self-stretch sm:w-full md:w-[330px] md:my-auto md:ml-[5%] md:max-h-[300px] md:rounded-3xl md:overflow-hidden lg:w-[500px]">
          <Skeleton className="absolute inset-0 size-full rounded-none bg-gray-200" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-8 lg:p-12 my-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Skeleton className="h-8 w-36 rounded-full bg-emerald-50" />
            <Skeleton className="h-4 w-28 rounded-lg bg-gray-100" />
          </div>

          <Skeleton className="mt-4 h-12 w-3/4 rounded-xl bg-gray-200" />
          <Skeleton className="mt-2 h-5 w-1/3 rounded-lg bg-orange-50" />

          <Skeleton className="mt-8 h-4 w-32 rounded-lg bg-gray-200" />
          <Skeleton className="mt-3 h-4 w-full rounded-lg bg-gray-100" />
          <Skeleton className="mt-2 h-4 w-full rounded-lg bg-gray-100" />
          <Skeleton className="mt-2 h-4 w-5/6 rounded-lg bg-gray-100" />

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
            <Skeleton className="size-10 shrink-0 rounded-full bg-orange-100" />

            <div className="min-w-0 flex-1">
              <Skeleton className="h-4 w-40 rounded-lg bg-gray-200" />
              <Skeleton className="mt-2 h-3 w-56 rounded-lg bg-gray-100" />
            </div>
          </div>

          <Skeleton className="mt-4 h-11 w-full rounded-2xl bg-orange-100" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
