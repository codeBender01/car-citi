import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import type { OneCarMark } from "@/interfaces/carMarks.interface";
import { BASE_URL } from "@/api";

import { brands } from "../lib/brands";

import "swiper/css";

interface BrandsSectionProps {
  carMarks?: OneCarMark[];
}

const BrandsSection = ({ carMarks }: BrandsSectionProps) => {
  const navigate = useNavigate();
  const brandsToDisplay = carMarks && carMarks.length > 0 ? carMarks : null;

  const handleBrandClick = (brandId?: string) => {
    const params = new URLSearchParams();
    if (brandId) {
      params.append("carMarkId", brandId);
    }
    navigate(`/all-cars${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className="mt-[70px] md:mt-[120px] lg:mt-[300px] mb-10 md:mb-[150px] w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          Познакомьтесь с нашими партнерами
        </div>
        <div
          onClick={() => navigate("/all-cars")}
          className="hidden md:flex cursor-pointer items-center gap-2 font-dm font-medium hover:text-primary transition-colors"
        >
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
                      {item.carModels?.length || 0} моделей
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

      <ul className="hidden lg:grid grid-cols-5 mt-[95px] gap-7">
        {brandsToDisplay
          ? brandsToDisplay.map((item) => (
              <li
                key={item.id}
                onClick={() => handleBrandClick(item.id)}
                className="border border-headerBorder py-2 rounded-2xl flex-1 flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
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
                  {item.carModels?.length || 0} моделей
                </div>
              </li>
            ))
          : brands.map((b) => (
              <li
                key={b.text}
                onClick={() => handleBrandClick()}
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
            ))}
      </ul>
    </div>
  );
};

export default BrandsSection;
