"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const borrowerRowClass =
  "flex items-center justify-between rounded-xl bg-slate-50 p-3";
const borrowerLabelClass =
  "text-[12px] font-extrabold tracking-wide text-slate-400 uppercase";
const borrowerValueClass =
  "w-auto border-0 bg-transparent p-0 text-right text-[12px] font-extrabold text-slate-900 shadow-none focus-visible:ring-0";

const BorrowDialog = ({ book }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const cover = book?.coverUrl || book?.image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await authClient.token();
      const token = data?.token;

      const formData = new FormData(e.target);
      const borrowData = Object.fromEntries(formData.entries());

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");
      router.push("/my-borrows");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <Dialog>
      <div className="mt-8">
        <DialogTrigger
          render={
            <Button className="h-14 w-full cursor-pointer rounded-2xl bg-[#F59E0B] text-[16px] font-extrabold text-white shadow-lg shadow-orange-500/25 hover:bg-[#E38508]" />
          }
        >
          <Bookmark data-icon="inline-start" className="size-6" />
          Borrow This Book
        </DialogTrigger>
      </div>

      <DialogContent className="gap-0 rounded-3xl p-5 sm:max-w-md">
        <DialogTitle className="text-[16px] font-extrabold text-slate-900">
          Confirm Book Borrow
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="bookId" value={book?._id || ""} />
          <input type="hidden" name="bookTitle" value={book?.title || ""} />
          <input type="hidden" name="bookImage" value={cover || ""} />

          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <img
              src={cover}
              alt={book?.title}
              className="size-16 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-extrabold text-slate-900">
                {book?.title}
              </p>
              <p className="truncate text-[12px] text-gray-400">
                By {book?.author}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <div className={borrowerRowClass}>
              <span className={borrowerLabelClass}>Borrower</span>
              <Input
                name="borrowerName"
                value={user?.name || ""}
                readOnly
                className={borrowerValueClass}
              />
            </div>

            <div className={borrowerRowClass}>
              <span className={borrowerLabelClass}>Email</span>
              <Input
                name="borrowerEmail"
                value={user?.email || ""}
                readOnly
                className={borrowerValueClass}
              />
            </div>

            <div className={borrowerRowClass}>
              <span className={borrowerLabelClass}>Loan Period</span>
              <Input
                name="loanPeriod"
                value="14 Days"
                readOnly
                className={`${borrowerValueClass} text-orange-500`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-3 grid grid-cols-2 gap-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 cursor-pointer rounded-xl border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50"
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              className="h-10 cursor-pointer rounded-xl bg-[#F59E0B] text-[12px] font-extrabold text-white hover:bg-[#E38508]"
            >
              Confirm Borrow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowDialog;
