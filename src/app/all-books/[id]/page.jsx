import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BorrowDialog from "@/components/books/BorrowDialog";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-books/${id}`,
  );
  const book = await res.json();

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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link
        href="/all-books"
        className="mb-8 inline-flex items-center gap-1.5 text-[15px] font-bold text-slate-700 transition-colors hover:text-orange-600"
      >
        <ChevronLeft className="size-5" />
        Back to All Books
      </Link>

      <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-5 overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200 sm:max-w-[500] sm:mx-auto md:max-w-full lg:max-w-full">
  
        <div className="relative min-h-[100vh] shrink-0 self-stretch sm:w-full md:w-[330px] md:my-auto md:ml-[5%] md:max-h-[300px] md:rounded-3xl md:overflow-hidden lg:w-[500px]">
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
            <Badge className="h-8 rounded-full bg-emerald-50 px-4 text-[12px] font-extrabold text-emerald-600">
              {copiesLeft} Available {copiesLeft === 1 ? "Copy" : "Copies"}
            </Badge>

            {formattedDate && (
        <span className="text-[12px] text-gray-400 font-bold">
          Added {formattedDate}
        </span>
      )}

          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
            {title}
          </h1>

          <p className="mt-2 text-[16px] font-bold text-orange-600">
            By {author}
          </p>

          <h2 className="mt-8 text-[14px] font-extrabold tracking-wide text-slate-900 uppercase">
            Description
          </h2>

          <p className="mt-3 text-[13px] text-justify leading-relaxed text-gray-500">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-extrabold text-orange-600">
              {initial}
            </div>

            <div className="min-w-0">
              <p className="text-[12px] font-bold text-slate-900">
                Uploaded by {uploaderName || "BookNook Curator"}
              </p>

              {uploaderEmail && (
                <p className="truncate text-[12px] text-gray-500">
                  {uploaderEmail}
                </p>
              )}
            </div>
          </div>

          <div className="">
            <BorrowDialog book={book} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
