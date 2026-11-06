import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookCard from "../books/BookCard";

const NewArrival = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`, {
    cache: "no-store",
  });

  const data = await res.json();

  const latestBooks = data.slice(-6).reverse();

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-orange-600 dark:text-orange-400 uppercase">
              <Sparkles className="size-4" />
              Fresh Additions
            </p>

            <h2 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100">
              New Arrivals
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Explore our latest curated additions across multiple genres. Borrow
            directly in just two clicks.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/all-books">
            <Button className="h-12 cursor-pointer rounded-full bg-gray-900 px-8 text-sm font-bold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
              See All Books
              <ArrowRight data-icon="inline-end" className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
