import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsArrowUpRight } from "react-icons/bs";

import { brands } from "../lib/brands";

import "swiper/css";

const BrandsSection = () => {
  return (
    <div className="mt-[70px] md:mt-[120px] lg:mt-[300px] mb-10 md:mb-[150px] w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          Познакомьтесь с нашими брендами
        </div>
        <div className="hidden md:flex items-center gap-2 font-dm font-medium">
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>

      <div className="mt-[30px] lg:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2.5}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
          }}
        >
          {brands.map((b) => (
            <SwiperSlide key={b.text}>
              <div className="border border-headerBorder rounded-2xl h-[135px] flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer">
                <img
                  src={b.img}
                  alt="car"
                  className={`${
                    b.text === "Audi" ? "mt-4" : ""
                  } max-h-[45px] md:max-h-[65px] max-w-[60px] md:max-w-[99px]`}
                />
                <div className="text-base md:text-lg text-center font-dm font-medium mt-auto">
                  {b.text}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ul className="hidden lg:flex items-center justify-between mt-[95px] gap-7">
        {brands.map((b) => {
          return (
            <li
              key={b.text}
              className="border border-headerBorder rounded-2xl flex-1 h-[135px] flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
            >
              <img
                src={b.img}
                alt="car"
                className={`${
                  b.text === "Audi" ? "mt-4" : ""
                } max-h-[55px] lg:max-h-[65px] max-w-20 lg:max-w-[99px]`}
              />
              <div className="text-lg font-dm font-medium mt-auto">
                {b.text}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BrandsSection;
