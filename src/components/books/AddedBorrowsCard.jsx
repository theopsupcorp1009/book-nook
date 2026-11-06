
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
    "grid grid-cols-[minmax(0,2.4fr)_1fr_1fr_minmax(120px,auto)] items-center gap-4 px-6 lg:px-9";

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 dark:bg-gray-900 dark:shadow-black/40">
      {!isBorrows ? (
        <p className="px-6 py-16 text-center text-[15px] font-bold text-slate-400 dark:text-gray-500 lg:px-9">
          You haven&apos;t borrowed any books yet.
        </p>
      ) : (
        <>
          {/* Desktop Header */}
          <div
            className={`${gridCols} hidden border-b border-slate-100 py-5 dark:border-gray-800 lg:grid`}
          >
            <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">
              Book Title
            </span>

            <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">
              Borrow Date
            </span>

            <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">
              Return Deadline
            </span>

            <span className="text-right text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">
              Action
            </span>
          </div>

          {myBorrows.map((borrow) => (
            <div
              key={borrow?._id}
              className="border-b border-slate-100 px-4 py-4 last:border-b-0 dark:border-gray-800 sm:px-6 lg:p-0"
            >
              {/* Mobile Layout */}
              <div className="space-y-4 lg:hidden">
                <div className="flex items-center gap-3">
                  {borrow.book?.image ? (
                    <Image
                      src={borrow.book.image}
                      alt={borrow.book.title || "Book cover"}
                      width={56}
                      height={56}
                      className="size-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="size-14 shrink-0 rounded-lg bg-slate-100 dark:bg-gray-800" />
                  )}

                  <p className="min-w-0 flex-1 text-sm leading-5 font-bold text-slate-900 dark:text-gray-100">
                    {borrow.book?.title || "Book no longer available"}
                  </p>
                </div>

                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-slate-400 dark:text-gray-500">
                      Borrow Date
                    </p>

                    <p className="text-xs font-semibold text-slate-700 dark:text-gray-300">
                      {formatDate(borrow?.borrowDate)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[11px] text-slate-400 dark:text-gray-500">
                      Return Deadline
                    </p>

                    <p className="text-xs font-semibold text-[#F59E0B]">
                      {formatDate(borrow?.returnDate)}
                    </p>
                  </div>
                </div>

                <div className="w-full [&_button]:w-full">
                  <ReturnBorrows borrow={borrow} />
                </div>
              </div>

              {/* Desktop Layout */}
              <div
                className={`${gridCols} hidden border-b border-slate-100 py-4 last:border-b-0 dark:border-gray-800 lg:grid`}
              >
                <div className="flex min-w-0 items-center gap-4">
                  {borrow.book?.image ? (
                    <Image
                      src={borrow.book.image}
                      alt={borrow.book.title || "Book cover"}
                      width={56}
                      height={56}
                      className="size-14 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="size-14 shrink-0 rounded-xl bg-slate-100 dark:bg-gray-800" />
                  )}

                  <div className="min-w-0">
                    <p className="text-[12px] font-extrabold break-words text-slate-900 dark:text-gray-100">
                      {borrow.book?.title || "Book no longer available"}
                    </p>
                  </div>
                </div>

                <span className="text-[12px] font-semibold text-slate-800 dark:text-gray-300">
                  {formatDate(borrow?.borrowDate)}
                </span>

                <span className="text-[12px] font-semibold text-[#F59E0B]">
                  {formatDate(borrow?.returnDate)}
                </span>

                <div className="flex justify-end">
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
