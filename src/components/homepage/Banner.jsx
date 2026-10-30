import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const bannerImages = [
    "/assets/banners/image1",
    "/assets/banners/image3.jpg",
    "/assets/banners/image3.avif",
];
const activeImage = bannerImages[0]; 
const Banner = () => {
    return (
        <section className="bg-background px-4 py-6 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
               
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${activeImage})` }}
                />
                <div className="absolute inset-0 bg-emerald-950/60" />

           
                <div className="relative z-10 flex min-h-[420px] flex-col justify-center px-8 py-16 sm:px-14 lg:px-16">
                    <span className="w-fit rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-white uppercase backdrop-blur-sm">
                        BookNook Library Feature
                    </span>

                    <h2 className="mt-5 max-w-xl text-4xl leading-tight font-extrabold text-white sm:text-5xl">
                        Seamless 14-Day Borrowing
                    </h2>

                    <p className="mt-4 max-w-md text-base text-white/80 sm:text-lg">
                        Simple tracking system with zero hassle and instant book status
                        updates.
                    </p>

                    <Link
                        href="/books"
                        className="group mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
                    >
                        Browse Books
                        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </div>

           
                <button
                    type="button"
                    aria-label="Previous slide"
                    className="absolute top-1/2 left-4 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <button
                    type="button"
                    aria-label="Next slide"
                    className="absolute top-1/2 right-4 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-colors hover:bg-gray-100"
                >
                    <ChevronRight className="size-5" />
                </button>

            
                <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
                    <span className="size-2.5 rounded-full bg-white/40" />
                    <span className="size-2.5 rounded-full bg-white/40" />
                    <span className="h-2.5 w-8 rounded-full bg-white" />
                </div>
            </div>
        </section>
    );
};

export default Banner;
