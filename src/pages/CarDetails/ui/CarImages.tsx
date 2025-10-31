import { useRef } from "react";
import benz2 from "@assets/images/benz2.png";
import { FaRegCirclePlay } from "react-icons/fa6";
import { TiCameraOutline } from "react-icons/ti";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { serviceOptions } from "../lib/serviceOptions";

const CarImages = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mt-[30px] relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{ clickable: true }}
        className="h-[550px] w-full rounded-2xl"
      >
        {serviceOptions.map((s) => {
          return (
            <SwiperSlide key={s.id}>
              <div
                className="h-full w-full rounded-2xl"
                style={{
                  backgroundImage: `url(${benz2})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center px-2 z-10 pointer-events-none">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-navButton text-white py-3 px-[25px] rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
        >
          <MdOutlineKeyboardArrowLeft size={22} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-navButton text-white py-3 px-[25px] rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto"
        >
          <MdOutlineKeyboardArrowRight size={22} />
        </button>
      </div>

      <div className="bg-white text-base font-dm rounded-xl flex gap-2.5 items-center w-fit py-3.5 px-5 absolute bottom-2 left-2 z-10">
        <FaRegCirclePlay />
        Видео
      </div>
      <div className="bg-white text-base font-dm rounded-xl flex gap-2.5 items-center w-fit py-3.5 px-5 absolute bottom-2 right-2 z-10">
        <TiCameraOutline size={20} />
        Все фото
      </div>
    </div>
  );
};

export default CarImages;