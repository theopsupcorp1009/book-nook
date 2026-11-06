"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddedBooksCard from "./AddedBooksCard";

const MyBooksSearch = ({ myBooks, categories }) => {
  const [search, setSearch] = useState("");

  const filteredBooks = myBooks.filter((book) => {
    const query = search.toLowerCase();
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query)
    );
  });

  if (!myBooks.length) {
    return (
      <div className="mt-8">
        <AddedBooksCard myBooks={myBooks} categories={categories} />
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full max-w-md">
        <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="h-12 rounded-xl border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 pr-4 pl-12 font-normal text-gray-900 dark:text-gray-100 shadow-sm placeholder:text-[12px] placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
      </div>

      {filteredBooks.length > 0 ? (
        <div className="mt-8">
          <AddedBooksCard myBooks={filteredBooks} categories={categories} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-16 text-center">
          <Search className="size-10 text-gray-300 dark:text-gray-600" />
          <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            No books found
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBooksSearch;
