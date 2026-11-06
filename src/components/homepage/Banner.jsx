"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const banners = [
  {
    image: "/assets/banners/image1",
    title: "Discover Worlds Between the Pages",
    description:
      "Explore thousands of community-curated books ready for borrowing today.",
  },
  {
    image: "/assets/banners/image3.jpg",
    title: "Seamless 14 Day Borrowing",
    description:
      "Simple tracking system with zero hassle and instant book status updates.",
  },
  {
    image: "/assets/banners/image3.avif",
    title: "Share Your Personal Library",
    description:
      "Add your favorite reads, manage available copies, and inspire fellow readers.",
  },
];

const Banner = () => {
  return (
    <section className="bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl">

        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".banner-prev",
            nextEl: ".banner-next",
          }}
          pagination={{
            clickable: true,
          }}
          className="booknook-banner"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[75vh] md:h-[550px] lg:h-[550px] overflow-hidden rounded-3xl p-10 text-center md:text-left lg:text-left">

                
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${banner.image})` }}
                />

                <div className="absolute inset-0 bg-emerald-950/60" />

                <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-14 lg:p-30">

                  <span className="w-fit rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-white uppercase backdrop-blur-sm mx-auto md:mx-0 lg:mx-0">
                    BookNook Library Feature
                  </span>

                  <h2 className="mt-5 max-w-xl text-4xl leading-tight font-extrabold text-white sm:text-5xl">
                    {banner.title}
                  </h2>

                  <p className="mt-4 max-w-md text-base text-white/80 sm:text-lg">
                    {banner.description}
                  </p>

                  <Link
                    href="/all-books"
                    className="group mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:mx-0 lg:mx-0"
                  >
                    Browse Books
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                  </Link>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        
        <button
          type="button"
          aria-label="Previous slide"
          className="banner-prev absolute left-4 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-gray-900"
        >
          <ChevronLeft className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="banner-next absolute right-4 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-lg transition-colors hover:bg-gray-900"
        >
          <ChevronRight className="size-5" />
        </button>

      </div>
    </section>
  );
};

export default Banner;
