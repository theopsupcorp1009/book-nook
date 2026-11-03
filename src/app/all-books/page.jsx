import React from 'react';
import { notFound } from 'next/navigation';
import AllBooksLibrary from '@/components/books/AllBooksLibrary';

const AllBooks = async () => {

    let categories = [];
    let books = [];

  try {
    const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`);
    const bookRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`);
    if (!categoryRes.ok || !bookRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const categoriesData = await categoryRes.json();
    categories = categoriesData.map(category=>category.name);
    books = await bookRes.json();
    
  } catch (error) {
    console.error("Data fetch error:", error);
    notFound();
  }

    return (
        <AllBooksLibrary categories={categories} books={books} />
    );
};

export default AllBooks;