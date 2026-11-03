import AddBookForm from "@/components/books/AddBookForm";
import { CirclePlus } from "lucide-react";

const AddBookPage = async () => {
  let categories = [];



  try {
    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`);

    if (!categoryRes.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categoryData = await categoryRes.json();
    categories = categoryData.map((category)=>category.name);
  } catch (error) {
    console.error("Category fetch error:", error);
  }
  console.log(categories)


  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-xl sm:px-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-100">
            <CirclePlus className="size-7 text-amber-500" strokeWidth={2.5} />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-gray-900">
            Add New Book
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Contribute to BookNook library by sharing a book title.
          </p>
        </div>

        <AddBookForm categories={categories} />
      </div>
    </div>
  );
};

export default AddBookPage;
