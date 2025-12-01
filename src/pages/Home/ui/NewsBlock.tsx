import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";

import news1 from "@assets/home/news1.png";

import "swiper/css";

const newsItems = [
  {
    id: 1,
    image: news1,
    category: "Новости",
    date: "Дек 11, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
  },
  {
    id: 2,
    image: news1,
    category: "Новости",
    date: "Дек 11, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
  },
  {
    id: 3,
    image: news1,
    category: "Новости",
    date: "Дек 11, 2024",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit....",
  },
];

const NewsBlock = () => {
  const newsSwiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const NewsCard = ({ item }: { item: (typeof newsItems)[0] }) => (
    <div className="font-dm">
      <div className="relative">
        <img src={item.image} alt="" className="rounded-2xl object-cover w-full" />
        <div className="absolute top-2.5 left-2.5 bg-primary text-white rounded-4xl text-sm px-2 py-1 font-dm">
          {item.category}
        </div>
      </div>

      <div className="mt-3 font-dm text-sm">{item.date}</div>
      <div className="mt-3 text-[20px]">{item.title}</div>
    </div>
  );

  return (
    <div className="2xl:px-[200px] px-4 md:px-20 lg:px-[120px] mt-[75px] lg:mt-[140px]">
      <div className="flex items-center justify-between w-full">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          Свежие записи в блоге
        </div>
        <div className="hidden lg:flex items-center gap-2 font-dm font-medium">
          Посмотреть все
          <BsArrowUpRight />
        </div>
      </div>

      {/* Desktop Grid - Hidden on < lg */}
      <ul className="hidden lg:grid lg:grid-cols-3 gap-[22px] mt-[50px]">
        {newsItems.map((item) => (
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
          {newsItems.map((item) => (
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
            {currentSlide} of {newsItems.length}
          </div>

          <button
            onClick={() => newsSwiperRef.current?.slideNext()}
            className="bg-white text-textPrimary py-2.5 px-5 rounded-[30px] cursor-pointer hover:opacity-80 transition-opacity shadow-md"
          >
            <MdOutlineKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsBlock;
