
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AddedBorrowsCard from "./AddedBorrowsCard";

const MyBorrowsSearch = ({ myBorrows }) => {
  const [search, setSearch] = useState("");

  const filteredBorrows = myBorrows.filter((borrow) =>
    borrow.book?.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (!myBorrows.length) {
    return (
      <div className="mt-8">
        <AddedBorrowsCard myBorrows={myBorrows} />
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
          placeholder="Search by title..."
          className="h-12 rounded-xl border-gray-100 bg-white pr-4 pl-12 font-normal text-gray-900 shadow-sm placeholder:text-[12px] placeholder:text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
        />
      </div>

      {filteredBorrows.length > 0 ? (
        <div className="mt-8">
          <AddedBorrowsCard myBorrows={filteredBorrows} />
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">
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

export default MyBorrowsSearch;
