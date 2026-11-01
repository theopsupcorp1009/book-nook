import React from 'react';
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

    categories = await categoryRes.json();
    books = await bookRes.json();
    
  } catch (error) {
    console.error("Data fetch error:", error);
  }

    

    return (
        <AllBooksLibrary categories={categories} books={books} />
    );
};

export default AllBooks;