import { PenLine, Trash2 } from "lucide-react";

const AddedBooksCard = ({ myBooks }) => {
  const isBooks = Array.isArray(myBooks) && myBooks.length > 0;

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
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50">
      {!isBooks ? (
        <p className="px-6 py-16 text-center text-[15px] font-bold text-slate-400 lg:px-9">
          You haven&apos;t added any books yet.
        </p>
      ) : (
        <>
  
          <div className={`${gridCols} border-b border-slate-100 py-5`}>
            <span className="text-[13px] font-extrabold tracking-wide text-slate-400 uppercase">
              Book Details
            </span>
            <span className="text-[13px] font-extrabold tracking-wide text-slate-400 uppercase">
              Category
            </span>
            <span className="text-[13px] font-extrabold tracking-wide text-slate-400 uppercase">
              Available Copies
            </span>
            <span className="text-[13px] font-extrabold tracking-wide text-slate-400 uppercase">
              Date Added
            </span>
            <span className="text-right text-[13px] font-extrabold tracking-wide text-slate-400 uppercase">
              Actions
            </span>
          </div>

      
          {myBooks.map((book) => (
            <div
              key={book?._id}
              className={`${gridCols} border-b border-slate-100 py-4 last:border-b-0`}
            >
              {/* Book details */}
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={book?.coverUrl || book?.image}
                  alt={book?.title}
                  className="size-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-extrabold text-slate-900">
                    {book?.title}
                  </p>
                  <p className="truncate text-[13px] text-slate-400">
                    By {book?.author}
                  </p>
                </div>
              </div>

              <div>
                <span className="inline-block rounded-full bg-slate-100 px-4 py-2 text-[13px] font-extrabold text-slate-700">
                  {book?.category}
                </span>
              </div>

              {/* Available copies */}
              <span className="text-[15px] font-semibold text-slate-800">
                {Number(book?.totalCopies) || 0} copies
              </span>

              {/* Date added */}
              <span className="text-[15px] text-slate-400">
                {formatDate(book?.createdAt)}
              </span>

          
              <div className="flex items-center justify-end gap-5">
                <button
                  className="cursor-pointer text-blue-600 transition-colors hover:text-blue-700"
                  aria-label="Edit book"
                >
                  <PenLine className="size-5" />
                </button>
                <button
                  className="cursor-pointer text-red-500 transition-colors hover:text-red-600"
                  aria-label="Delete book"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AddedBooksCard;
