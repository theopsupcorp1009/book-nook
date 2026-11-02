import { BookMarked, Clock, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const categoryIcons = {
  Fiction: BookMarked,
  Science: Sparkles,
  History: Clock,
  Kids: Heart,
  Others: BookMarked,
};

const TopCategories = async () => {

  const bookRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`,
  );
  const books = await bookRes.json();

  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/top-categories`,
  );
  const categories = await categoryRes.json();
  const listedCategories = categories.filter(
    (category) => category.name !== "Others",
  );
  const sortedTopCategories = listedCategories
    .map((category) => {
      const totalBookCount = books.filter(
        (book) => book.category === category.name,
      ).length;

      return {
        name: category.name,
        totalBookCount,
      };
    })
    .sort((a, b) => b.totalBookCount - a.totalBookCount);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Top Categories
          </h2>
          <p className="mt-4 text-base text-gray-500">
            Browse books by your favorite subject matter.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {sortedTopCategories.map(({ name, totalBookCount }) => {
            const Icon = categoryIcons[name];

            return (
              <Link
               href={`/all-books?category=${encodeURIComponent(name)}`}
                key={name}
                className="flex flex-col items-center rounded-2xl bg-white px-6 py-10 text-center shadow-sm ring-1 ring-gray-100 hover:border hover:border-green-400"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl bg-orange-100">
                  <Icon className="size-7 text-orange-500" strokeWidth={2} />
                </span>

                <h3 className="mt-6 text-xl font-bold text-gray-900">{name}</h3>

                <p className="mt-2 text-sm text-gray-400">
                  {totalBookCount}+ Books
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
