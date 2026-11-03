import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const LoadingSkeleton = () => {
  const books = Array.from({ length: 6 });

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center">
          <Skeleton className="h-10 w-72 rounded-xl bg-gray-200" />
          <Skeleton className="mt-3 h-4 w-96 rounded-lg bg-gray-100" />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <Skeleton className="h-12 w-full max-w-md rounded-xl bg-gray-200" />

          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-11 w-24 rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((_, index) => (
            <div
              key={index}
              className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-0 shadow-sm"
            >
              <Skeleton className="h-64 w-full shrink-0 rounded-none bg-gray-200" />

              <div className="flex flex-1 flex-col p-5">
                <Skeleton className="h-6 w-3/4 rounded-lg bg-gray-200" />
                <Skeleton className="mt-2 h-4 w-1/3 rounded-lg bg-gray-100" />
                <Skeleton className="mt-4 h-4 w-full rounded-lg bg-gray-100" />
                <Skeleton className="mt-2 h-4 w-5/6 rounded-lg bg-gray-100" />

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 pb-0.5">
                  <Skeleton className="h-4 w-28 rounded-lg bg-gray-100" />
                  <Skeleton className="h-9 w-32 rounded-full bg-orange-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
