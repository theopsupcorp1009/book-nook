import React from "react";
import ReturnBorrows from "./ReturnBorrows";
import Image from "next/image";

const AddedBorrowsCard = ({ myBorrows }) => {
  const isBorrows = Array.isArray(myBorrows) && myBorrows.length > 0;

  const formatDate = (date) => {
    if (!date) return "—";
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime())
      ? "—"
      : parsed.toISOString().slice(0, 10);
  };

  const gridCols =
  "hidden md:grid md:grid-cols-[minmax(0,2.4fr)_1fr_1fr_minmax(120px,auto)] md:items-center md:gap-4 md:px-6 lg:px-9";

return (
  <div className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40">
    {!isBorrows ? (
      <p className="px-6 py-16 text-center text-[15px] font-bold text-slate-400 dark:text-gray-500 lg:px-9">
        You haven&apos;t borrowed any books yet.
      </p>
    ) : (
      <>
        {/* Desktop Header */}
        <div
          className={`${gridCols} border-b border-slate-100 dark:border-gray-800 py-5`}
        >
          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
            Book Title
          </span>

          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
            Borrow Date
          </span>

          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
            Return Deadline
          </span>

          <span className="text-right text-[12px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
            Action
          </span>
        </div>

        {myBorrows.map((borrow) => (
          <div
            key={borrow?._id}
            className="border-b border-slate-100 dark:border-gray-800 last:border-b-0"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col gap-4 p-4 md:hidden">
              {/* Book Details */}
              <div className="flex min-w-0 items-center gap-4">
                <Image
                  src={borrow?.bookImage}
                  alt={borrow?.bookTitle || "Book cover"}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-[12px] font-extrabold text-slate-900 dark:text-gray-100">
                    {borrow?.bookTitle}
                  </p>
                </div>
              </div>

              {/* Borrow Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
                    Borrow Date
                  </p>

                  <p className="text-[12px] font-semibold text-slate-800 dark:text-gray-300">
                    {formatDate(borrow?.borrowDate)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[11px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase">
                    Return Deadline
                  </p>

                  <p className="text-[12px] font-semibold text-[#F59E0B]">
                    {formatDate(borrow?.returnDate)}
                  </p>
                </div>
              </div>

              {/* Return Action */}
              <div className="flex items-center justify-end border-t border-slate-100 dark:border-gray-800 pt-3">
                <ReturnBorrows borrow={borrow} />
              </div>
            </div>

            {/* Desktop Layout */}
            <div className={`${gridCols} py-4`}>
              {/* Book Details */}
              <div className="flex min-w-0 items-center gap-4">
                <Image
                  src={borrow?.bookImage}
                  alt={borrow?.bookTitle || "Book cover"}
                  width={56}
                  height={56}
                  className="size-14 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate text-[12px] font-extrabold text-slate-900 dark:text-gray-100">
                    {borrow?.bookTitle}
                  </p>
                </div>
              </div>

              {/* Borrow Date */}
              <span className="text-[12px] font-semibold text-slate-800 dark:text-gray-300">
                {formatDate(borrow?.borrowDate)}
              </span>

              {/* Return Deadline */}
              <span className="text-[12px] font-semibold text-[#F59E0B]">
                {formatDate(borrow?.returnDate)}
              </span>

              {/* Action */}
              <div className="flex items-center justify-end">
                <ReturnBorrows borrow={borrow} />
              </div>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);
};

export default AddedBorrowsCard;
