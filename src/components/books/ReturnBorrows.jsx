"use client";

import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ReturnBorrows = ({ borrow }) => {
  const router = useRouter();
  const handleReturnBook = async () => {
    try {
      const token = await getTokenFromClient();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${borrow._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          }
        },
      );

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to return book.");
      }

      toast.success("Book returned successfully!");
      router.refresh();
    } catch (error) {
      console.error("Delete book error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={handleReturnBook}
        className="cursor-pointer rounded-xl bg-[#10B981] px-5 py-2.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-[#059669]"
      >
        Return Book
      </button>
    </div>
  );
};

export default ReturnBorrows;
