"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const controlClass =
  "h-11 w-full rounded-lg border-slate-200 bg-slate-100 px-3.5 text-sm font-normal text-gray-900 placeholder:text-gray-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const AddBookForm = ({ categories }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      category: "Fiction",
      totalCopies: "0",
      coverUrl: "",
      description: "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to add book");
      }

      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Book Title
            </label>
            <Input
              name="title"
              placeholder="e.g. To Kill a Mockingbird"
              className={controlClass}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Author Name
            </label>
            <Input
              name="author"
              placeholder="e.g. Harper Lee"
              className={controlClass}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Category
            </label>
            <Select name="category" defaultValue="Fiction">
              <SelectTrigger className="h-11 w-full rounded-lg border-slate-200 bg-slate-100 px-3.5 font-normal">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
              Total Copies
            </label>
            <Input
              name="totalCopies"
              type="number"
              min="1"
              defaultValue="3"
              className={controlClass}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
            Book Cover Image
          </label>

          <Input
            name="image"
            type="file"
            accept="image/*"
            className={`${controlClass} cursor-pointer`}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold tracking-wide text-gray-900 uppercase">
            Short Description
          </label>
          <Textarea
            name="description"
            placeholder="Provide a brief summary of the book..."
            className="min-h-32 w-full rounded-lg border-slate-200 bg-slate-100 px-3.5 py-3 text-sm placeholder:text-gray-400 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            required
          />
        </div>

        <div className="grid gap-4 rounded-xl bg-gray-100 p-4 sm:grid-cols-2 sm:p-6">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
              Uploader Name
            </label>
            <Input name="uploaderName" value={user?.name || ""} readOnly className="text-xs font-extrabold"/>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
              Uploader Email
            </label>
            <Input name="uploaderEmail" value={user?.email || ""} readOnly className="text-xs font-extrabold"/>
          </div>
        </div>

        <Button
          type="submit"
          className="cursor-pointer h-12 w-full rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-sm font-bold text-white shadow-md shadow-orange-500/25 hover:opacity-90"
        >
          Add Book to Library
        </Button>
      </form>
    </div>
  );
};

export default AddBookForm;
