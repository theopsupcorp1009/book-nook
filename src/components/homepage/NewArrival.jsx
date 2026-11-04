import React from 'react';
import { Sparkles, Eye, CircleUserRound, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NewArrival = async() => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-books`);
    const data = await res.json();
    const latestBooks = data.slice(data.length-6, data.length).reverse();
    
    return (
        <section className="px-4 py-20 bg-gray-50 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section header */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-orange-600 uppercase">
                            <Sparkles className="size-4" />
                            Fresh Additions
                        </p>

                        <h2 className="mt-2 text-4xl font-extrabold text-gray-900">
                            New Arrivals
                        </h2>
                    </div>

                    <p className="max-w-sm text-sm leading-relaxed text-gray-500">
                        Explore our latest curated additions across multiple
                        genres. Borrow directly in just two clicks.
                    </p>
                </div>

                {/* Book cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {latestBooks.map((book) => {
                        const {
                            _id,
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
                        const isAvailable = copiesLeft > 0;

                        return (
                            <div
                                key={_id}
                                className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10"
                            >
                                {/* Cover */}
                                <div className="group relative h-56 w-full shrink-0 overflow-hidden">
                                    <img
                                        src={cover}
                                        alt={title}
                                        className="block size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <Badge className="absolute top-4 left-4 h-7 rounded-full bg-gray-900/85 px-3 text-[12px] font-extrabold text-white backdrop-blur-sm">
                                        {category}
                                    </Badge>

                                    <Badge
                                        className={`absolute top-4 right-4 h-7 rounded-full px-3 text-[12px] font-extrabold text-white shadow-sm ${
                                            isAvailable
                                                ? "bg-emerald-500"
                                                : "bg-rose-600"
                                        }`}
                                    >
                                        {isAvailable
                                            ? `${copiesLeft} ${copiesLeft === 1 ? "Copy" : "Copies"} Left`
                                            : "Not Available"}
                                    </Badge>
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="truncate text-xl font-extrabold text-gray-900">
                                        {title}
                                    </h3>

                                    <p className="mt-1 text-[12px] font-bold text-gray-500">
                                        By {author}
                                    </p>

                                    <p className="mt-4 line-clamp-2 text-[14px] leading-relaxed text-gray-500">
                                        {description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 pb-0.5">
                                        <span className="flex min-w-0 items-center gap-2 text-[12px] text-gray-500">
                                            <CircleUserRound className="size-4 shrink-0 text-gray-400" />
                                            <span className="truncate">
                                                {uploaderName || "BookNook Curator"}
                                            </span>
                                        </span>

                                        <Link href={`/all-books/${book?._id}`}>
                                            <Button
                                                variant="outline"
                                                className="h-9 cursor-pointer rounded-full border-orange-200 bg-orange-50/60 px-4 text-[12px] font-bold text-orange-600 hover:bg-orange-100 hover:text-orange-700"
                                            >
                                                <Eye data-icon="inline-start" className="size-4" />
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* See all books */}
                <div className="mt-12 text-center">
                    <Link href="/all-books">
                        <Button className="h-12 cursor-pointer rounded-full bg-gray-900 px-8 text-sm font-bold text-white hover:bg-gray-800">
                            See All Books
                            <ArrowRight data-icon="inline-end" className="size-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NewArrival;
