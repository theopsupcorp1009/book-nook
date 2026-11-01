"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/books/BookCard";

const CATEGORIES = ["Fiction", "Science", "History", "Kids"];

const AllBooksLibrary = ({ books = [] }) => {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredBooks = books.filter((book) => {
    const category = book.category || "Others";
    const matchesCategory =
      activeCategory === "All"
        ? true
        : activeCategory === "Others"
          ? !CATEGORIES.includes(category)
          : category === activeCategory;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            All Books Library
          </h1>
          <p className="mt-3 text-base text-gray-500">
            Explore our complete collection of titles. Search by title or filter
            by category.
          </p>
        </div>

        {/* Search + category filter */}
        <div className="mt-10 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or author..."
              className="h-12 rounded-full border-gray-100 bg-white pr-4 pl-12 font-normal text-gray-900 shadow-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {["All", ...CATEGORIES, "Others"].map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={
                  activeCategory === category
                    ? "h-11 cursor-pointer rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 font-semibold text-white shadow-md shadow-orange-500/25 hover:opacity-90"
                    : "h-11 cursor-pointer rounded-xl border-gray-200 bg-white px-4 font-semibold text-gray-700 shadow-sm hover:bg-orange-50 hover:text-orange-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Books grid */}
        {filteredBooks.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
