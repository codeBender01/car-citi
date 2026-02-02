import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import user from "@/assets/header/user.png";
import Parentheses from "@/svgs/Parentheses";
import { BsArrowUpRight } from "react-icons/bs";
import { reviews } from "../lib/reviews";

import "swiper/css";

const Reviews = ({
  variant,
  headingClassName,
}: {
  variant: string;
  headingClassName?: string;
}) => {
  const reviewsSwiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => (
    <div
      className={`${
        variant === "white"
          ? "bg-white text-textPrimary"
          : "bg-transparent text-white"
      } p-10 rounded-2xl h-full`}
    >
      <div className="flex items-center justify-between">
        <div className="font-rale text-xl md:text-2xl font-bold">
          {review.message}
        </div>
        <Parentheses />
      </div>
      <p className="mt-12 md:text-base text-xs font-dm">{review.text}</p>

      <div className="mt-12 flex items-center gap-3">
        <div className="h-12 md:h-16 w-12 md:w-16 rounded-full">
          <img
            src={user}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <div className="font-dm md:text-base text-sm font-medium">
            {review.user}
          </div>
          <div className="text-xs md:text-sm font-dm">{review.car}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`flex items-center justify-between ${
          headingClassName ||
          (variant === "white" ? "text-white" : "text-textPrimary")
        }`}
      >
        <div className="font-rale text-[26px] md:text-[40px] font-bold">
          Что говорят наши клиенты
        </div>
        <div className="hidden lg:flex items-center gap-2 font-dm font-medium">
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>

      <ul className="hidden lg:grid lg:grid-cols-3 gap-7 mt-[50px]">
        {reviews.map((r) => (
          <li key={r.id}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      {/* Mobile/Tablet Carousel - Hidden on lg+ */}
      <div className="lg:hidden mt-[50px]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.1}
          onSwiper={(swiper) => (reviewsSwiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
            },
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2,
            },
          }}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.id}>
              <ReviewCard review={r} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => reviewsSwiperRef.current?.slidePrev()}
            className={`${
              variant === "white"
                ? "bg-white text-textPrimary"
                : "bg-textPrimary text-white"
            } py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md`}
          >
            <MdOutlineKeyboardArrowLeft size={20} />
          </button>

          <div
            className={`font-dm font-medium text-sm ${
              headingClassName ||
              (variant === "white" ? "text-white" : "text-textPrimary")
            }`}
          >
            {currentSlide} of {reviews.length}
          </div>

          <button
            onClick={() => reviewsSwiperRef.current?.slideNext()}
            className={`${
              variant === "white"
                ? "bg-white text-textPrimary"
                : "bg-textPrimary text-white"
            } py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md`}
          >
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Reviews;
