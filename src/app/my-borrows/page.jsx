import MyBorrowsSearch from '@/components/books/MyBorrowsSearch';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import React from 'react';

const MyBorrowsPage = async() => {

    const session = await auth.api.getSession({ 
        headers: await headers() 
      });
      if (!session) {
        redirect("/sign-in");
      }
    
      const { user } = session;

    const token = await getTokenFromServer();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${user?.email}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    const myBorrows = await res.json();

    if (!res.ok) notFound();


    return (
        <div className="bg-slate-50 dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div className='-space-y-2'>
                    <h2 className="text-[26px] font-extrabold text-slate-900 dark:text-gray-100">My Borrowed Books</h2>
                    <p className="mt-1 text-[12px] text-slate-500 dark:text-gray-400">Track active book loans and return titles when you finish reading.</p>
                </div>
                <div className="mt-8">
                    <MyBorrowsSearch myBorrows={myBorrows} />
                </div>
            </div>
        </div>
    );
};

export default MyBorrowsPage;
