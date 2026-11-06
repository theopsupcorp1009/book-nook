import AddBookForm from "@/components/books/AddBookForm";
import { CirclePlus } from "lucide-react";

const AddBookPage = async () => {
  let categories = [];

  try {
    const categoryRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`,
      { cache: "no-store" },
    );

    if (!categoryRes.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categoryData = await categoryRes.json();
    categories = categoryData.map((category) => category.name);
  } catch (error) {
    console.error("Category fetch error:", error);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-10 shadow-xl sm:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FEF5E6] dark:bg-amber-500/15">
            <CirclePlus className="size-6 text-amber-500" strokeWidth={2.5} />
          </span>
          <div className='-space-y-2 -mt-3'>
            <h1 className="mt-5 text-[26px] font-extrabold text-gray-900 dark:text-gray-100">
              Add New Book
            </h1>
            <p className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
              Contribute to BookNook library by sharing a book title.
            </p>
          </div>
        </div>

        <AddBookForm categories={categories} />
      </div>
    </div>
  );
};

export default AddBookPage;
