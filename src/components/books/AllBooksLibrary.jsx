"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/books/BookCard";
import { useSearchParams } from "next/navigation";

const AllBooksLibrary = ({ categories, books }) => {
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    selectedCategory || "All",
  );

  const filteredBooks = books.filter((book) => {
    if (activeCategory !== "All" && book.category !== activeCategory) {
      return false;
    }

    const query = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query)
    );
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            All Books Library
          </h1>
          <p className="mt-3 text-[12px] text-gray-500">
            Explore our complete collection of titles. Search by title or filter
            by category.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
              className="h-12 rounded-xl border-gray-100 bg-white pr-4 pl-12 font-normal text-gray-900 shadow-sm placeholder:text-[12px] placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-2">
            {["All", ...categories].map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={
                  activeCategory === category
                    ? "h-11 text-[12px] font-extrabold cursor-pointer rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 text-white shadow-md shadow-orange-500/25 hover:opacity-90"
                    : "h-11 text-[12px] font-extrabold cursor-pointer rounded-xl border-gray-200 bg-white px-4 text-gray-700 shadow-sm hover:bg-orange-50 hover:text-orange-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard key={book._id ?? book.title} book={book} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center">
            <Search className="size-10 text-gray-300" />
            <p className="mt-4 text-lg font-semibold text-gray-900">
              No books found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Try a different search term or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBooksLibrary;
