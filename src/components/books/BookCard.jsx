import React from "react";
import { CircleUserRound, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
   <Card className="h-full gap-0 rounded-2xl border border-gray-100 bg-white p-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10">
    
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute top-4 left-4 h-7 rounded-full bg-gray-900/85 px-3 text-[12px] font-extrabold text-white backdrop-blur-sm">
          {category}
        </Badge>

        <Badge className="absolute top-4 right-4 h-7 rounded-full bg-emerald-500 px-3 text-[12px] font-extrabold text-white shadow-sm">
          {copiesLeft} {copiesLeft === 1 ? "Copy" : "Copies"} Left
        </Badge>
      </div>

      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="truncate text-xl font-extrabold text-gray-900">
          {title}
        </h3>
        <p className="mt-1 text-[12px] font-bold text-gray-500">By {author}</p>

        <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-gray-500">
          {description}
        </p>

  
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 pb-0.5">
          <span className="flex min-w-0 items-center gap-2 text-[12px] text-gray-500">
            <CircleUserRound className="size-4 shrink-0 text-gray-400" />
            <span className="truncate">{uploaderName || "BookNook Curator"}</span>
          </span>

          <Button
            variant="outline"
            className="h-9 cursor-pointer rounded-full border-orange-200 bg-orange-50/60 px-4 text-[12px] font-bold text-orange-600 hover:bg-orange-100 hover:text-orange-700"
          >
            <Eye data-icon="inline-start" className="size-4" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
