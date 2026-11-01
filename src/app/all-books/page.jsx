import React from 'react';
import AllBooksLibrary from '@/components/books/AllBooksLibrary';

const AllBooks = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`);
    const books = res.ok ? await res.json() : [];

    return (
        <AllBooksLibrary books={books} />
    );
};

export default AllBooks;