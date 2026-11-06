import React from "react";
import { CircleUserRound, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const BookCard = ({ book }) => {
  const {
    title,
    author,
    category,
    description,
    coverUrl,
    image,
    totalCopies,
    uploaderName,
  } = book;

  const cover = coverUrl || image;
  const copiesLeft = Number(totalCopies) || 0;

  return (
    <div className="flex h-full w-full flex-col gap-0 overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10">
      <div className="group relative h-64 w-full shrink-0 overflow-hidden">
        <Image
          src={cover}
          alt={title || "Book cover"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute top-4 left-4 h-7 rounded-full bg-gray-900/85 px-3 text-[12px] font-extrabold text-white backdrop-blur-sm">
          {category}
        </Badge>

        <Badge
          className={`absolute top-4 right-4 h-7 rounded-full px-3 text-[12px] font-extrabold text-white shadow-sm ${
            copiesLeft > 0 ? "bg-emerald-500" : "bg-rose-600"
          }`}
        >
          {copiesLeft > 0
            ? `${copiesLeft} ${copiesLeft === 1 ? "Copy" : "Copies"} Left`
            : "Not Available"}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate text-xl font-extrabold text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <p className="mt-1 text-[12px] font-bold text-gray-500 dark:text-gray-400">By {author}</p>

        <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4 pb-0.5">
          <span className="flex min-w-0 items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400">
            <CircleUserRound className="size-4 shrink-0 text-gray-400 dark:text-gray-500" />
            <span className="truncate">
              {uploaderName || "BookNook Curator"}
            </span>
          </span>

          <Link href={`/all-books/${book?._id}`}>
            <Button
              variant="outline"
              className="h-9 cursor-pointer rounded-full border-orange-200 dark:border-orange-900/60 bg-orange-50/60 dark:bg-orange-950/40 px-4 text-[12px] font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 hover:text-orange-700 dark:hover:text-orange-300"
            >
              <Eye data-icon="inline-start" className="size-4" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
