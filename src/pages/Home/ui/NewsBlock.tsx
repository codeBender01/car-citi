import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import { useGetNews } from "@/api/news/useGetNews";
import { BASE_URL } from "@/api";
import { formatNewsDate } from "@/lib/dateUtils";
import type { OneNews, OneNewsCategory } from "@/interfaces/news.interface";

import "swiper/css";

const NewsBlock = () => {
  const newsSwiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { data: newsResponse, isLoading } = useGetNews();
  const newsData = newsResponse?.data?.rows || [];

  const getLocalizedTitle = (news: OneNews): string => {
    return i18n.language === "tk" ? news.titleTk : news.titleRu;
  };

  const getLocalizedCategory = (category: OneNewsCategory): string => {
    return i18n.language === "tk" ? category.nameTk : category.nameRu;
  };

  const NewsCard = ({ item }: { item: OneNews }) => (
    <div
      onClick={() => navigate(`/news/${item.id}`)}
      className="font-dm cursor-pointer hover:opacity-90 transition-opacity"
    >
      <div className="relative">
        <img
          src={`${BASE_URL}/${item.image.url}`}
          alt={getLocalizedTitle(item)}
          className="rounded-2xl object-cover w-full"
        />
        {item.categories && item.categories.length > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
            {getLocalizedCategory(item.categories[0])}
          </div>
        )}
      </div>

      <div className="mt-3 font-dm text-sm">
        {formatNewsDate(item.created, i18n.language)}
      </div>
      <div className="mt-3 text-[20px]">{getLocalizedTitle(item)}</div>
    </div>
  );

  return (
    <div className="2xl:px-[200px] px-4 md:px-20 lg:px-[120px] mt-[75px] lg:mt-[140px]">
      <div className="flex items-center justify-between w-full">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          Свежие записи в блоге
        </div>
        <div
          onClick={() => navigate("/news")}
          className="hidden lg:flex items-center gap-2 font-dm font-medium cursor-pointer hover:opacity-70 transition-opacity"
        >
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-[50px] text-center py-16">
          <p className="font-dm text-textGray">Загрузка новостей...</p>
        </div>
      ) : newsData.length === 0 ? (
        <div className="mt-[50px] text-center py-16 bg-mainBg rounded-2xl">
          <p className="font-dm text-textGray text-lg">
            Нет доступных новостей
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Grid - Hidden on < lg */}
          <ul className="hidden lg:grid lg:grid-cols-3 gap-[22px] mt-[50px]">
            {newsData.slice(0, 3).map((item) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>

          {/* Mobile/Tablet Carousel - Hidden on lg+ */}
          <div className="lg:hidden mt-[50px]">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1.1}
              onSwiper={(swiper) => (newsSwiperRef.current = swiper)}
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
              {newsData.map((item) => (
                <SwiperSlide key={item.id}>
                  <NewsCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => newsSwiperRef.current?.slidePrev()}
                className="bg-white text-textPrimary py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
              >
                <MdOutlineKeyboardArrowLeft size={20} />
              </button>

              <div className="font-dm text-textPrimary font-medium text-sm">
                {currentSlide} of {newsData.length}
              </div>

              <button
                onClick={() => newsSwiperRef.current?.slideNext()}
                className="bg-white text-textPrimary py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
              >
                <MdOutlineKeyboardArrowRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsBlock;
