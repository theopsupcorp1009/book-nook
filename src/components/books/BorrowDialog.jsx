"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";

const borrowerRowClass =
  "flex items-center justify-between rounded-xl bg-slate-50 p-3";
const borrowerLabelClass = "text-[12px] font-extrabold tracking-wide text-slate-400 uppercase";
const borrowerValueClass = "text-[12px] font-extrabold text-slate-900";

const BorrowDialog = ({ book }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const cover = book?.coverUrl || book?.image;

  return (
    <Dialog>
      <div className="mt-8 md:mt-auto lg:mt-auto">
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
            <span className={borrowerValueClass}>
              {user?.name}
            </span>
          </div>

          <div className={borrowerRowClass}>
            <span className={borrowerLabelClass}>Email</span>
            <span className={borrowerValueClass}>
              {user?.email}
            </span>
          </div>

          <div className={borrowerRowClass}>
            <span className={borrowerLabelClass}>Loan Period</span>
            <span className="text-[12px] font-extrabold text-orange-500">
              14 Days
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-4">
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-10 cursor-pointer rounded-xl border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button className="h-10 cursor-pointer rounded-xl bg-[#F59E0B] text-[12px] font-extrabold text-white hover:bg-[#E38508]">
            Confirm Borrow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowDialog;
