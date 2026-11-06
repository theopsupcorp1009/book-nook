import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BorrowDialog from "@/components/books/BorrowDialog";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-books/${id}`, {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
  );
  
  const book = await res.json();

  if (!res.ok || !book?.title) {
    notFound();
  }

  const {
    title,
    author,
    category,
    description,
    coverUrl,
    image,
    totalCopies,
    uploaderName,
    uploaderEmail,
    createdAt,
  } = book;

  const cover = coverUrl || image;
  const copiesLeft = Number(totalCopies) || 0;
  const initial = uploaderName?.charAt(0)?.toUpperCase() || "B";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-20 lg:px-30 py-8">
      <Link
        href="/all-books"
        className="mb-8 inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-700 dark:text-gray-300 transition-colors hover:text-orange-600 dark:hover:text-orange-400"
      >
        <ChevronLeft className="size-5" />
        Back to All Books
      </Link>

      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-5 overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-xl shadow-gray-200 dark:shadow-black/20 sm:max-w-[500] sm:mx-auto md:max-w-full lg:max-w-full h-full md:h-[85vh] lg:h-[80vh]">
  
        <div className="relative h-[70vh] shrink-0 self-stretch sm:w-full md:w-[300px] md:my-auto md:h-full md:overflow-hidden lg:w-[400px]">
          <img
            src={cover}
            alt={title}
            className="absolute inset-0 size-full object-fit"
          />

          <Badge className="absolute top-6 left-6 h-8 rounded-full bg-gray-900/85 px-4 text-[12px] font-extrabold text-white backdrop-blur-sm">
            {category}
          </Badge>
        </div>

      
        <div className="flex min-w-0 flex-1 flex-col p-8 lg:p-12 my-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-4 text-[12px] font-extrabold text-emerald-600 dark:text-emerald-400">
              {copiesLeft} Available {copiesLeft === 1 ? "Copy" : "Copies"}
            </Badge>

            {formattedDate && (
        <span className="text-[12px] text-gray-400 dark:text-gray-500 font-bold">
          Added {formattedDate}
        </span>
      )}

          </div>

          <h1 className="mt-4 text-[24px] font-extrabold tracking-tight text-slate-900 dark:text-gray-100 lg:text-5xl">
            {title}
          </h1>

          <p className="mt-2 text-[14px] font-bold text-orange-600 dark:text-orange-400">
            By {author}
          </p>

          <h2 className="mt-8 text-[12px] font-extrabold tracking-wide text-slate-900 dark:text-gray-100 uppercase">
            Description
          </h2>

          <p className="mt-3 text-[12px] text-justify leading-relaxed text-gray-500 dark:text-gray-400">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/15 text-lg font-extrabold text-orange-600 dark:text-orange-400">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-extrabold text-slate-900 dark:text-gray-100">
                Uploaded by {uploaderName || "BookNook Curator"}
              </p>

              {uploaderEmail && (
                <p className="truncate text-[12px] text-gray-500 dark:text-gray-400">
                  {uploaderEmail}
                </p>
              )}
            </div>
          </div>

          <div>
            <BorrowDialog book={book} disabled={copiesLeft===0}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
