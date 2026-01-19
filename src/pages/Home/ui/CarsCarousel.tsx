import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import CarCard from "@/components/CarCard";

import "swiper/css";
import type { OnePost } from "@/interfaces/posts.interface";
import type { HomeCarModel } from "@/interfaces/home.interface";

interface CarsCarouselProps {
  posts?: (OnePost | HomeCarModel)[];
  totalCount?: number;
}

const CarsCarousel = ({ posts, totalCount }: CarsCarouselProps) => {
  const carsSwiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  if (!posts || posts.length === 0) {
    return null;
  }

  const displayCount = totalCount ?? posts.length;

  return (
    <div className="mt-[50px] md:hidden">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        onSwiper={(swiper) => (carsSwiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        breakpoints={{
          480: {
            slidesPerView: 1.5,
          },
          640: {
            slidesPerView: 2,
          },
        }}
      >
        {posts.map((r, idx) => (
          <SwiperSlide key={idx}>
            <CarCard car={r} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls Below Carousel */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => carsSwiperRef.current?.slidePrev()}
          className="bg-white text-black py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>

        <div className="font-dm text-textPrimary font-medium text-sm">
          {currentSlide} of {displayCount}
        </div>

        <button
          onClick={() => carsSwiperRef.current?.slideNext()}
          className="bg-white text-black py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CarsCarousel;
