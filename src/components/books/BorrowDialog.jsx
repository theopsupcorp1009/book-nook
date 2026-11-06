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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const borrowerRowClass =
  "flex items-center justify-between rounded-xl bg-slate-50 dark:bg-gray-800 p-3";
const borrowerLabelClass =
  "text-[12px] font-extrabold tracking-wide text-slate-400 dark:text-gray-500 uppercase";
const borrowerValueClass =
  "min-w-0 w-0 flex-1 border-0 bg-transparent p-0 text-right text-[12px] font-extrabold text-slate-900 dark:text-gray-100 shadow-none focus-visible:ring-0";
const BorrowDialog = ({ book, disabled }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const cover = book?.coverUrl || book?.image;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getTokenFromClient();

      const formData = new FormData(e.target);
      const borrowData = Object.fromEntries(formData.entries());

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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
          disabled={disabled}
          render={
            <Button
              disabled={disabled}
              className="h-12 w-full cursor-pointer rounded-xl bg-[#F59E0B] text-[14px] font-extrabold text-white shadow-lg shadow-orange-500/25 hover:bg-[#E38508]"
            />
          }
        >
          <Bookmark data-icon="inline-start" className="size-6" />
          {disabled ? "No copies available" : "Borrow This Book"}
        </DialogTrigger>
      </div>

      <DialogContent className="gap-0 rounded-3xl p-4 sm:max-w-md sm:p-5">
        <DialogTitle className="text-[16px] font-extrabold text-slate-900 dark:text-gray-100">
          Confirm Book Borrow
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="bookId" value={book?._id || ""} />
          <input type="hidden" name="bookTitle" value={book?.title || ""} />
          <input type="hidden" name="bookImage" value={cover || ""} />

          <div className="mt-3 flex min-w-0 items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-gray-800 dark:bg-gray-800 sm:p-4">
            <img
              src={cover}
              alt={book?.title}
              className="size-16 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-extrabold break-words text-slate-900 dark:text-gray-100">
                {book?.title}
              </p>
              <p className="text-[12px] break-words text-gray-400 dark:text-gray-500">
                By {book?.author}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            <div
              className={`${borrowerRowClass} flex-col items-start gap-1 sm:flex-row sm:items-center`}
            >
              <span className={`${borrowerLabelClass} shrink-0`}>Borrower</span>
              <Input
                name="borrowerName"
                value={user?.name || ""}
                readOnly
                className={`${borrowerValueClass} w-full min-w-0`}
              />
            </div>

            <div
              className={`${borrowerRowClass} flex-col items-start gap-1 sm:flex-row sm:items-center`}
            >
              <span className={`${borrowerLabelClass} shrink-0`}>Email</span>
              <Input
                name="borrowerEmail"
                value={user?.email || ""}
                readOnly
                className={`${borrowerValueClass} w-full min-w-0`}
              />
            </div>

            <div
              className={`${borrowerRowClass} flex-col items-start gap-1 sm:flex-row sm:items-center`}
            >
              <span className={`${borrowerLabelClass} shrink-0`}>
                Loan Period
              </span>
              <Input
                name="loanPeriod"
                value="14 Days"
                readOnly
                className={`${borrowerValueClass} w-full min-w-0 text-orange-500`}
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 cursor-pointer rounded-xl border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
