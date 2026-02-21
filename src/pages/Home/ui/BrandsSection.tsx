import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { BsArrowUpRight } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { OneCarMark } from "@/interfaces/carMarks.interface";
import { BASE_URL } from "@/api";

import { brands } from "../lib/brands";

import "swiper/css";

interface BrandsSectionProps {
  carMarks?: OneCarMark[];
}

const BrandsSection = ({ carMarks }: BrandsSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const desktopSwiperRef = useRef<SwiperType | null>(null);
  const brandsToDisplay = carMarks && carMarks.length > 0 ? carMarks : null;

  const handleBrandClick = (brandId?: string) => {
    const params = new URLSearchParams();
    if (brandId) {
      params.append("carMarkId", brandId);
    }
    navigate(`/all-cars${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="mt-[70px] mb-10 md:mb-[150px] w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          {t("home.brands")}
        </div>
        <div
          onClick={() => navigate("/all-brands")}
          className="hidden md:flex cursor-pointer items-center gap-2 font-dm font-medium hover:text-primary transition-colors"
        >
          {t("common.viewAll")}
          <BsArrowUpRight />
        </div>
      </div>

      <div className="mt-[30px] lg:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2.5}
          loop
          loopAdditionalSlides={2}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
          }}
        >
          {brandsToDisplay
            ? brandsToDisplay.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() => handleBrandClick(item.id)}
                    className="border border-headerBorder rounded-2xl h-[135px] flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
                  >
                    <img
                      src={`${BASE_URL}/${item.logo.url}`}
                      alt={item.name}
                      className="max-h-[45px] md:max-h-[65px] max-w-[60px] md:max-w-[99px] object-contain"
                    />
                    <div className="text-base md:text-lg text-center font-dm font-medium mt-auto">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.carModels?.length || 0} {t("home.models")}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : brands.map((b) => (
                <SwiperSlide key={b.text}>
                  <div
                    onClick={() => handleBrandClick()}
                    className="border border-headerBorder rounded-2xl h-[135px] flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
                  >
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

      <div className="hidden lg:block mt-[95px] relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={28}
          slidesPerView={5}
          loop
          loopAdditionalSlides={2}
          onSwiper={(swiper) => (desktopSwiperRef.current = swiper)}
        >
          {brandsToDisplay
            ? brandsToDisplay.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() => handleBrandClick(item.id)}
                    className="border border-headerBorder rounded-2xl h-[160px] flex flex-col items-center justify-center gap-4 py-6 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
                  >
                    <img
                      src={`${BASE_URL}/${item.logo.url}`}
                      alt={item.name}
                      className="max-h-[55px] lg:max-h-[65px] max-w-20 lg:max-w-[99px] object-contain"
                    />
                    <div className="text-lg font-dm font-medium mt-auto">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.carModels?.length || 0} {t("home.models")}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : brands.map((b) => (
                <SwiperSlide key={b.text}>
                  <div
                    onClick={() => handleBrandClick()}
                    className="border border-headerBorder rounded-2xl h-[160px] flex flex-col items-center justify-center gap-4 py-6 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
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
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
        <button
          onClick={() => desktopSwiperRef.current?.slidePrev()}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity shadow-md"
        >
          <MdOutlineKeyboardArrowLeft size={20} />
        </button>
        <button
          onClick={() => desktopSwiperRef.current?.slideNext()}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2.5 rounded-full cursor-pointer hover:opacity-80 transition-opacity shadow-md"
        >
          <MdOutlineKeyboardArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BrandsSection;
