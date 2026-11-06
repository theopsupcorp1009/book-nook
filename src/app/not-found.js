import React from "react";
import Link from "next/link";
import { BookOpen, Home, LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page Not Found | BookNook",
  description: "The page you are looking for could not be found.",
};

const NotFound = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <div className="relative">
          <div className="flex size-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/25">
            <BookOpen className="size-12 text-white" />
          </div>
          <span className="absolute -top-2 -right-2 flex size-10 items-center justify-center rounded-full bg-gray-900 text-sm font-extrabold text-white shadow-md">
            404
          </span>
        </div>

        <h1 className="mt-8 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          This Page doesn&apos;t exist
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          The page you are looking for may have been moved, removed, or never
          found its way to our library. Let&apos;s guide you back to a good
          book.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/">
            <Button className="h-11 cursor-pointer rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-6 text-[12px] font-extrabold text-white shadow-md shadow-orange-500/25 hover:opacity-90">
              <Home data-icon="inline-start" className="size-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/all-books">
            <Button
              variant="outline"
              className="h-11 cursor-pointer rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 text-[12px] font-extrabold text-gray-700 dark:text-gray-300 shadow-sm hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400"
            >
              <LibraryBig data-icon="inline-start" className="size-4" />
              Browse All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
