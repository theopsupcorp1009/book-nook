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
    <div className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40">
      {!isBorrows ? (
        <p className="px-6 py-16 text-center text-[15px] font-bold text-slate-400 dark:text-gray-500 dark:text-gray-500 lg:px-9">
          You haven&apos;t borrowed any books yet.
        </p>
      ) : (
        <>
          <div className={`${gridCols} border-b border-slate-100 dark:border-gray-800 py-5`}>
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
              className={`${gridCols} border-b border-slate-100 dark:border-gray-800 py-4 last:border-b-0`}
            >
              {/* Book details */}
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

              <span className="text-[12px] font-semibold text-slate-800 dark:text-gray-300">
                {formatDate(borrow?.borrowDate)}
              </span>

              <span className="text-[12px] font-semibold text-[#F59E0B]">
                {formatDate(borrow?.returnDate)}
              </span>

              <ReturnBorrows borrow={borrow} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AddedBorrowsCard;
