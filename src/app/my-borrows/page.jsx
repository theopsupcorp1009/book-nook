import AddedBorrowsCard from '@/components/books/AddedBorrowsCard';
import { auth } from '@/lib/auth';
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

    const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })

  const token = jwtToken?.token;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${user?.email}`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    const myBorrows = await res.json();

    if (!res.ok) notFound();


    return (
        <div className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-10">
                <div>
                    <h2 className="text-[34px] font-extrabold text-slate-900">My Borrowed Books</h2>
                    <p className="mt-1 text-[15px] text-slate-500">Track active book loans and return titles when you finish reading.</p>
                </div>
                <div className="mt-8">
                    <AddedBorrowsCard myBorrows={myBorrows}/>
                </div>
            </div>
        </div>
    );
};

export default MyBorrowsPage;
