import AddedBooksCard from "@/components/books/AddedBooksCard";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import React from "react";
import Link from "next/link";

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const { user } = session;

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  const token = jwtToken?.token;

  const categoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`);
  if (!categoryRes.ok) notFound();
  const categoryData = await categoryRes.json();
  const categories = categoryData.map((category) => category.name);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-books/${user?.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const myBooks = await res.json();
  if (!res.ok) notFound();
  console.log(myBooks);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[34px] font-extrabold text-slate-900">
              My Added Books
            </h2>
            <p className="mt-1 text-[15px] text-slate-500">
              Manage, update, or remove books you have published to BookNook.
            </p>
          </div>
          <Link href="/add-book">
            <Button className="h-11 cursor-pointer rounded-full bg-[#F59E0B] px-5 text-[14px] font-extrabold text-white shadow-md shadow-orange-500/25 hover:bg-[#E38508]">
              <CirclePlus data-icon="inline-start" className="size-5" />
              Add Another Book
            </Button>
          </Link>
        </div>

        <div className="mt-8">
          <AddedBooksCard myBooks={myBooks} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default MyBooksPage;
