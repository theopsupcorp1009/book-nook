import react from 'react';
import UpdateBookDialog from "./UpdateBookDialog";
import DeleteBooksDialog from "./DeleteBooksDialog";
import Link from "next/link";
import Image from "next/image";

const AddedBooksCard = ({ myBooks, categories }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  const gridCols =
  "grid grid-cols-[minmax(0,2.4fr)_1fr_1.1fr_1.1fr_minmax(90px,auto)] items-center gap-4 px-6 lg:px-9";

return (
  <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 dark:bg-gray-900 dark:shadow-black/40">
    {!myBooks.length > 0 ? (
      <p className="px-6 py-16 text-center text-[15px] font-bold text-slate-400 dark:text-gray-500 lg:px-9">
        You haven&apos;t added any books yet.
      </p>
    ) : (
      <>
        <div className={`${gridCols} hidden border-b border-slate-100 py-5 dark:border-gray-800 lg:grid`}>
          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">Book Details</span>
          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">Category</span>
          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">Available Copies</span>
          <span className="text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">Date Added</span>
          <span className="text-right text-[12px] font-extrabold tracking-wide text-slate-400 uppercase dark:text-gray-500">Actions</span>
        </div>

        {myBooks.map((book) => (
          <div
            key={book?._id}
            className="border-b border-slate-100 px-4 py-4 last:border-b-0 dark:border-gray-800 sm:px-6 lg:p-0"
          >
            <div className="space-y-4 lg:hidden">
  
              <div className="flex min-w-0 items-center gap-3">
                <Link
                  href={`/all-books/${book._id}`}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <Image
                    src={book?.coverUrl || book?.image}
                    alt={book?.title || "Book cover"}
                    width={56}
                    height={56}
                    className="size-14 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] leading-relaxed font-extrabold break-words text-slate-900 dark:text-gray-100">
                      {book?.title}
                    </p>
                    <p className="mt-1 text-[12px] text-slate-400 dark:text-gray-500">
                      By {book?.author}
                    </p>
                  </div>
                </Link>

                <div className="flex shrink-0 items-center gap-1">
                  <UpdateBookDialog book={book} categories={categories} />
                  <DeleteBooksDialog book={book} />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-100 pt-3 dark:border-gray-800">
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold text-slate-700 dark:bg-gray-800 dark:text-gray-300">
                  {book?.category}
                </span>

                <span className="text-[12px] font-semibold text-slate-600 dark:text-gray-400">
                  {Number(book?.totalCopies) || 0} copies
                </span>

                <span className="text-[12px] text-slate-400 dark:text-gray-500">
                  {formatDate(book?.createdAt)}
                </span>
              </div>
            </div>

            <div className={`${gridCols} hidden py-4 lg:grid`}>
              <Link
                href={`/all-books/${book._id}`}
                className="flex min-w-0 items-center gap-4"
              >
                <Image
                  src={book?.coverUrl || book?.image}
                  alt={book?.title || "Book cover"}
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="text-[14px] font-extrabold break-words text-slate-900 dark:text-gray-100">
                    {book?.title}
                  </p>
                  <p className="text-[12px] text-slate-400 dark:text-gray-500">
                    By {book?.author}
                  </p>
                </div>
              </Link>

              <div>
                <span className="inline-block rounded-full bg-slate-100 px-4 py-2 text-[12px] font-extrabold text-slate-700 dark:bg-gray-800 dark:text-gray-300">
                  {book?.category}
                </span>
              </div>

              <span className="text-[14px] font-semibold text-slate-800 dark:text-gray-300">
                {Number(book?.totalCopies) || 0} copies
              </span>

              <span className="text-[12px] text-slate-400 dark:text-gray-500">
                {formatDate(book?.createdAt)}
              </span>

              <div className="flex items-center justify-end">
                <UpdateBookDialog book={book} categories={categories} />
                <DeleteBooksDialog book={book} />
              </div>
            </div>
          </div>
        ))}
      </>
    )}
  </div>
);
};

export default AddedBooksCard;
