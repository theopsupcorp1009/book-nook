"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const controlClass =
  "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[12px] font-normal text-slate-900 shadow-none focus-visible:border-orange-400 focus-visible:ring-2 focus-visible:ring-orange-400/20";

const labelClass =
  "mb-1.5 block text-[12px] font-extrabold tracking-wide text-slate-700 uppercase";

const UpdateBookDialog = ({ book, categories }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedData),
        },
      );

      const resData = await res.json();

      if (res.ok) {
        router.refresh();
        toast.success("Book updated successfully!");
        setOpen(false);
      } else {
        toast.error(resData.message || "Failed to update book.");
      }
    } catch (error) {
      console.error("Update book error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="cursor-pointer px-5 font-bold hover:text-orange-300 bg-transparent hover:bg-transparent text-blue-500">
            <PenLine className="size-4" />
          </Button>
        }
      />

      <DialogContent
        showCloseButton={false}
        className="max-h-[90vh] gap-0 overflow-y-auto rounded-[28px] border border-slate-100 bg-white p-6 shadow-2xl sm:max-w-[640px] sm:p-8"
      >
        <div className="mb-7 flex items-center justify-between">
          <DialogTitle className="text-[20px] font-extrabold tracking-tight text-slate-900">
            Edit Book Details
          </DialogTitle>

          <DialogClose
            render={
              <button
                type="button"
                className="cursor-pointer rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close dialog"
              >
                <X className="size-6" />
              </button>
            }
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <Input
              id="title"
              name="title"
              defaultValue={book?.title}
              required
              className={controlClass}
              placeholder="Enter book title"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="author" className={labelClass}>
                Author
              </label>
              <Input
                id="author"
                name="author"
                defaultValue={book?.author}
                required
                className={controlClass}
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label htmlFor="totalCopies" className={labelClass}>
                Copies
              </label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                min="0"
                defaultValue={book?.totalCopies}
                required
                className={controlClass}
                placeholder="Number of copies"
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>

            <select
              id="category"
              name="category"
              defaultValue={book?.category}
              required
              className={`${controlClass} cursor-pointer`}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>

            <Textarea
              id="description"
              name="description"
              defaultValue={book?.description}
              required
              rows={3}
              className="min-h-[92px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-none focus-visible:border-orange-400 focus-visible:ring-2 focus-visible:ring-orange-400/20"
              placeholder="Enter book description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 cursor-pointer rounded-2xl border-slate-200 text-[12px] font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              className="h-10 cursor-pointer rounded-2xl bg-[#F59E0B] text-[12px] font-extrabold text-white shadow-md shadow-orange-500/20 hover:bg-[#E38508]"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookDialog;
