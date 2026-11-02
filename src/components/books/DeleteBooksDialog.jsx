"use client"

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DeleteBooksDialog = ({ book }) => {
    const router = useRouter();
  const handleDeleteBook = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-books/${book._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      toast.success("Book deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            className="cursor-pointer text-red-500 transition-colors hover:text-red-600"
            aria-label="Delete book"
          >
            <Trash2 className="size-5" />
          </button>
        }
      ></DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-3xl p-8 text-center sm:max-w-md"
      >
     
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-100">
          <Trash2 className="size-7 text-red-500" />
        </div>

        <DialogTitle className="text-[26px] font-extrabold text-slate-900">
          Delete Book?
        </DialogTitle>

        <DialogDescription className="text-[15px] leading-relaxed text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-extrabold text-slate-900">
            &quot;{book?.title}&quot;
          </span>
          ? This action cannot be undone.
        </DialogDescription>

        <div className="mt-2 grid grid-cols-2 gap-4">
          <DialogClose
            render={
              <Button
                type="button"
                variant="outline"
                className="h-12 cursor-pointer rounded-xl border-slate-200 bg-white text-[15px] font-bold text-slate-700 hover:bg-slate-50"
              />
            }
          >
            Cancel
          </DialogClose>

          <DialogClose
            render={
              <Button
                type="button"
                onClick={handleDeleteBook}
                className="h-12 cursor-pointer rounded-xl bg-[#EF4444] text-[15px] font-extrabold text-white shadow-md shadow-red-500/25 hover:bg-[#DC2626]"
              />
            }
          >
            Yes, Delete
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBooksDialog;
