import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import SearchForm from "./ui/SearchForm";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import MobileApp from "./ui/MobileApp";
import NewsBlock from "./ui/NewsBlock";

import { brands } from "./lib/brands";
import { types } from "./lib/types";
import { whyUs } from "./lib/whyUs";

import "swiper/css";

import hero from "@/assets/home/hero.png";
import land from "@assets/images/landscape.png";
import diag from "@assets/images/diagnostic.png";
import logoBig from "@/assets/home/logoBig.png";
import logoMed from "@assets/home/logoMedium.png";
import check1 from "@assets/home/check1.png";
import check2 from "@assets/home/check2.png";
import check3 from "@assets/home/check3.png";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import LogoSection from "@/svgs/LogoSection";
import GreenCheck from "@/svgs/GreenCheck";

import StatsSection from "./ui/StatSection";
import Reviews from "./ui/Reviews";

const Home = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<
    "favorites" | "recent" | "popular"
  >("favorites");

  const tabs = [
    { id: "favorites" as const, label: "Избранное" },
    { id: "recent" as const, label: "Недавние" },
    { id: "popular" as const, label: "Популярные" },
  ];

  return (
    <div className="pt-[75px]">
      <main className="mt-[75px] px-12 2xl:px-[118px]">
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide>
              <div
                className="w-full h-[660px] rounded-2xl flex items-center justify-center text-center flex-col relative"
                style={{
                  backgroundImage: `url(${hero})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                <div className="relative z-10 text-2xl text-primary font-rale">
                  Все самые новые и подержанные
                </div>
                <h1 className="relative z-10 text-[70px] text-white font-rale font-bold">
                  марки автомобилей <br /> всегда только на carciti.com
                </h1>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="w-full h-[660px] rounded-2xl flex items-center justify-center text-center flex-col relative"
                style={{
                  backgroundImage: `url(${hero})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                <div className="relative z-10 text-2xl text-primary font-rale">
                  Slide 2 - Все самые новые и подержанные
                </div>
                <h1 className="relative z-10 text-[70px] text-white font-rale font-bold">
                  марки автомобилей <br /> всегда только на carciti.com
                </h1>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div
                className="w-full h-[660px] rounded-2xl flex items-center justify-center text-center flex-col relative"
                style={{
                  backgroundImage: `url(${hero})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                <div className="relative z-10 text-2xl text-primary font-rale">
                  Slide 3 - Все самые новые и подержанные
                </div>
                <h1 className="relative z-10 text-[70px] text-white font-rale font-bold">
                  марки автомобилей <br /> всегда только на carciti.com
                </h1>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center px-8 z-10 pointer-events-none">
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

          {/* Search Form */}
        </div>
        <SearchForm />

        <div className="mt-[200px] w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-rale text-[40px] text-textPrimary font-bold">
              Изучите все автомобили
            </div>
            <div className="flex items-center gap-2 font-dm font-medium">
              Посмотреть все
              <BsArrowUpRight />
            </div>
          </div>

          <div className="mt-8 border-b border-[#E1E1E1]">
            <div className="flex gap-[30px]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative cursor-pointer font-dm font-medium text-base text-textPrimary pb-4 transition-colors hover:text-textPrimary/80"
                >
                  {tab.label}
                  {/* Animated underline */}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-bottom-1 duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-[50px] grid grid-cols-4 gap-7">
            {[...Array(8)].map((_, idx) => {
              return <CarCard key={idx} />;
            })}
          </div>
        </div>
        <div className="mt-[300px] mb-[150px] w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-rale text-[40px] text-textPrimary font-bold">
              Познакомьтесь с нашими брендами
            </div>
            <div className="flex items-center gap-2 font-dm font-medium">
              Посмотреть все
              <BsArrowUpRight />
            </div>
          </div>
          <ul className="flex items-center justify-between mt-[95px] gap-7">
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
                    } max-h-[65px] max-w-[99px]`}
                  />
                  <div className="text-lg font-dm font-medium mt-auto">
                    {b.text}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <div className="bg-textPrimary flex h-[600px]">
        <div className="w-[50%] h-full">
          <img src={land} alt="" className="object-cover h-full" />
        </div>
        <div className="w-[40%] mx-auto flex items-center flex-col justify-center gap-10 h-full text-white">
          <div className="text-[40px] font-rale font-bold">
            Локальные автодилеры и лучшие предложения
          </div>
          <p className="font-dm text-base ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. 
          </p>
          <Button
            size="none"
            className="bg-transparent self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
          >
            <div>Весь список</div>
            <BsArrowUpRight />
          </Button>
        </div>
      </div>

      <StatsSection />

      <div className="mt-[75px] px-[100px] 2xl:px-[118px]">
        <div className="flex items-center justify-between">
          <div className="font-rale text-[40px] text-textPrimary font-bold">
            Поиск по типу
          </div>
          <div className="flex items-center gap-2 font-dm font-medium">
            Посмотреть все
            <BsArrowUpRight />
          </div>
        </div>

        <ul className="flex items-center justify-between gap-[25px] mt-10">
          {types.map((t) => {
            return (
              <li
                key={t.type}
                className="h-[300px] card-gradient flex-1 rounded-2xl px-[30px] py-[38px] text-white font-dm"
                style={{
                  backgroundImage: `url(${t.img})`,
                  backgroundSize: "cover",
                }}
              >
                <div>{t.num}</div>
                <div>{t.type}</div>
              </li>
            );
          })}
        </ul>

        <div className="mt-[120px]">
          <div className="font-rale text-[40px] text-center text-textPrimary font-bold">
            Мы учитываем все аспекты <br /> при выборе нового авто:
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-4">
            <li className="flex items-center justify-center">
              <img
                src={diag}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
            </li>
            <li className="flex flex-col justify-between bg-primary text-white p-5 rounded-2xl">
              <div className="text-[32px] font-rale font-bold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
              <div className="flex items-center gap-2 font-dm font-medium">
                Подробнее
                <BsArrowUpRight />
              </div>
            </li>
            <li className="flex flex-col relative justify-between bg-black text-white p-5 rounded-2xl overflow-hidden">
              <div className="text-[32px] font-rale font-bold relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
              <div className="flex items-center gap-2 font-dm font-medium relative z-10">
                Подробнее
                <BsArrowUpRight />
              </div>

              <div className="absolute bottom-[-10%] right-0 w-[80%]">
                <img src={logoBig} alt="" />
              </div>
            </li>
          </ul>
        </div>

        <div className="mt-[300px] relative">
          <div className="font-rale text-[40px] relative z-10 text-center text-textPrimary font-bold">
            Почему выбирают нас?
          </div>

          <div className="absolute bg-[#FBFCF9] w-[60%] h-[620px] top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 "></div>

          <ul className="grid grid-cols-4 gap-7 h-[300px] mt-[50px] relative z-10">
            {whyUs.map((w) => {
              return (
                <li
                  key={w.title}
                  className="bg-white text-textPrimary h-full rounded-2xl flex flex-col px-6 py-8 gap-6"
                >
                  <div className="h-[60px] flex items-center">{w.icon}</div>
                  <div className="font-dm text-[20px] font-medium">
                    {w.title}
                  </div>
                  <p className="font-dm">{w.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-[200px] relative flex justify-between">
          <div className="flex w-[45%] gap-[45px]">
            <div className="flex flex-col gap-[58px] w-[50%]">
              <img
                src={check1}
                alt="check"
                className="w-full h-[244px] rounded-2xl"
              />
              <img
                src={check2}
                alt="check"
                className="w-[85%] h-[180px] rounded-2xl self-end"
              />
            </div>
            <div className="flex flex-col items-center w-[60%] justify-between">
              <div className="flex items-center gap-4">
                <img src={logoMed} alt="" className="h-[60px] w-[60px]" />
                <LogoSection />
              </div>
              <img
                src={check3}
                className="w-full self-stretch h-[80%] rounded-2xl"
                alt=""
              />
            </div>
          </div>

          <div className="w-[40%] flex flex-col">
            <div className="font-rale text-[40px] text-textPrimary font-bold">
              Получите реальную цену за свой автомобиль
            </div>
            <p className="font-dm font-medium text-textPrimary mt-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <ul className="mt-[66px] font-dm text-textPrimary flex flex-col gap-[34px]">
              <li className="flex items-center gap-2.5">
                <GreenCheck /> Lorem ipsum dolor sit amet, consectetur
                adipiscing elit
              </li>
              <li className="flex items-center gap-2.5">
                <GreenCheck /> Lorem ipsum
              </li>
              <li className="flex items-center gap-2.5">
                <GreenCheck /> Lorem ipsum dolor sit amet
              </li>
            </ul>
            <Button
              size="none"
              className="bg-primary self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] mt-auto border border-white"
            >
              <div>Заказать оценку авто</div>
              <BsArrowUpRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-textPrimary py-[110px] px-[120px] 2xl:px-[200px] mt-[230px]">
        <Reviews variant="white" />
      </div>
      <MobileApp />
      <NewsBlock />
    </div>
  );
};

export default Home;
