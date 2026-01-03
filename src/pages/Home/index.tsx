import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";

import SearchForm from "./ui/SearchForm";
import CarsCarousel from "./ui/CarsCarousel";
import BrandsSection from "./ui/BrandsSection";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import MobileApp from "./ui/MobileApp";
import NewsBlock from "./ui/NewsBlock";
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

import { useGetHomeClient } from "@/api/home/useGetHomeClient";
import { BASE_URL } from "@/api";

const Home = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<
    "favorites" | "recent" | "popular" | "all"
  >("favorites");

  const tabs = [
    { id: "favorites" as const, label: "Избранное" },
    { id: "recent" as const, label: "Недавние" },
    { id: "popular" as const, label: "Популярные" },
    { id: "all" as const, label: "Все", showOnSmall: true },
  ];

  const { data: homeData } = useGetHomeClient();

  const navigate = useNavigate();

  const getActiveCars = () => {
    if (!homeData?.data) return [];

    switch (activeTab) {
      case "favorites":
        return homeData.data.carFavorites || [];
      case "recent":
        return homeData.data.carRecent || [];
      case "popular":
        return homeData.data.carPopular || [];

      default:
        return [];
    }
  };

  const activeCars = getActiveCars();

  return (
    <div className="pt-[75px]">
      <main className=" mt-2 lg:mt-[75px] lg:px-12 2xl:px-[118px]">
        <div className="relative ">
          <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {homeData?.data?.banners && homeData.data.banners.length > 0 ? (
              homeData.data.banners.map((banner) => (
                <SwiperSlide key={banner.id}>
                  <div
                    className="w-full h-[420px] lg:h-[660px] lg:rounded-2xl flex items-center justify-end md:justify-center text-center flex-col relative"
                    style={{
                      backgroundImage: `url(${BASE_URL}/${banner.image.url})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                    <div className="relative z-10 text-[16px] md:text-xl lg:text-2xl text-primary font-rale">
                      Все самые новые и подержанные
                    </div>
                    <h1 className="relative z-10 text-2xl md:text-[48px] mb-4 md:mb-0 lg:text-[70px] text-white font-rale font-bold">
                      марки автомобилей <br /> всегда только на carciti.com
                    </h1>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div
                  className="w-full h-[420px] lg:h-[660px] lg:rounded-2xl flex items-center justify-end md:justify-center text-center flex-col relative"
                  style={{
                    backgroundImage: `url(${hero})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                  <div className="relative z-10 text-[16px] md:text-xl lg:text-2xl text-primary font-rale">
                    Все самые новые и подержанные
                  </div>
                  <h1 className="relative z-10 text-2xl md:text-[48px] mb-4 md:mb-0 lg:text-[70px] text-white font-rale font-bold">
                    марки автомобилей <br /> всегда только на carciti.com
                  </h1>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

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
        </div>
        <SearchForm />

        <div className="mt-[72px] md:mt-[120px] xl:mt-[200px] w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
              Изучите все автомобили
            </div>
            <div
              onClick={() => {
                navigate("/all-cars");
              }}
              className="hidden md:flex items-center gap-2 font-dm font-medium"
            >
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
                  className={`relative cursor-pointer font-dm font-medium text-base text-textPrimary pb-4 transition-colors hover:text-textPrimary/80 flex items-center gap-2 ${
                    tab.showOnSmall ? "md:hidden" : ""
                  }`}
                >
                  {tab.label}
                  {tab.id === "all" && <BsArrowUpRight />}

                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-bottom-1 duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <CarsCarousel posts={activeCars} />

          <div className="mt-[50px] hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {activeCars.map((r, idx) => {
              return <CarCard car={r} key={idx} />;
            })}
          </div>
        </div>
        <BrandsSection carMarks={homeData?.data?.carMarks} />
      </main>
      <div className="bg-textPrimary flex flex-col md:flex-row md:h-[600px] mx-4 rounded-2xl md:mx-0">
        <div className="w-full md:w-[50%] h-full">
          <img
            src={land}
            alt=""
            className="object-cover md:rounded-0 rounded-2xl h-full"
          />
        </div>
        <div className="w-full md:w-[40%] mx-auto flex md:items-center flex-col px-[30px] md:px-0 md:py-0 py-[35px] justify-center gap-10 h-full text-white">
          <div className="text-[26px] md:text-[40px] font-rale font-bold">
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
            className="bg-transparent self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-full md:w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
          >
            <div>Весь список</div>
            <BsArrowUpRight />
          </Button>
        </div>
      </div>

      <StatsSection counts={homeData?.data?.counts} />

      <div className="mt-[60px] md:mt-[75px] px-4 md:px-10 lg:px-[100px] 2xl:px-[118px]">
        <div className="flex items-center justify-between">
          <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
            Поиск по типу
          </div>
          <div className="hidden lg:flex items-center gap-2 font-dm font-medium">
            Посмотреть все
            <BsArrowUpRight />
          </div>
        </div>

        <ul className="flex lg:grid grid-cols-5 flex-col items-center justify-between gap-[25px] mt-10">
          {homeData?.data?.carCategories &&
          homeData.data.carCategories.length > 0
            ? homeData.data.carCategories.map((category, idx) => (
                <li
                  key={category.mark.id}
                  className="h-[300px] bg-black! card-gradient lg:bg-none lg:w-auto w-full lg:block flex flex-row-reverse justify-between flex-1 rounded-2xl px-[30px] py-5 lg:py-[38px] text-white font-dm"
                  style={
                    {
                      "--bg-image": `url(${
                        types[idx % types.length]?.img || types[0].img
                      })`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    } as React.CSSProperties
                  }
                >
                  <div>{category.count}</div>
                  <div className="flex items-center gap-2">
                    {category.mark.name}
                  </div>
                </li>
              ))
            : types.map((t) => (
                <li
                  key={t.type}
                  className="h-[300px] bg-black! card-gradient lg:bg-none lg:w-auto w-full lg:block flex flex-row-reverse justify-between flex-1 rounded-2xl px-[30px] py-5 lg:py-[38px] text-white font-dm"
                  style={
                    {
                      "--bg-image": `url(${t.img})`,
                      backgroundSize: "cover",
                    } as React.CSSProperties
                  }
                >
                  <div>{t.num}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex lg:hidden">{t.icon}</div>
                    {t.type}
                  </div>
                </li>
              ))}
        </ul>

        <div className="mt-[75px] md:mt-[120px]">
          <div className="font-rale text-[26px] md:text-[40px] text-center text-textPrimary font-bold">
            Мы учитываем все аспекты <br /> при выборе нового авто:
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 md:gap-4 md:min-h-[400px]">
            <li className="h-[345px] md:h-full overflow-hidden md:rounded-2xl">
              <img src={diag} alt="" className="w-full h-full object-cover" />
            </li>
            <li className="flex h-[345px] md:h-auto flex-col justify-between bg-primary text-white p-5 md:rounded-2xl">
              <div className="text-[32px] font-rale font-bold">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
              <div className="flex items-center gap-2 font-dm font-medium">
                Подробнее
                <BsArrowUpRight />
              </div>
            </li>
            <li className="flex h-[345px] md:h-auto flex-col relative justify-between bg-black text-white p-5 md:rounded-2xl overflow-hidden">
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

        <div className="mt-[75px]  md:mt-[120px] lg:mt-[300px] relative">
          <div className="font-rale text-[26px] md:text-[40px] relative z-10 text-center text-textPrimary font-bold">
            Почему выбирают нас?
          </div>

          <div className="absolute bg-[#FBFCF9] w-[60%] h-[400px] md:h-[620px] top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 "></div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 h-auto lg:h-[300px] mt-[50px] relative z-10">
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

        <div className="mt-[200px] relative hidden lg:flex justify-between">
          <div className="flex w-[45%] gap-[45px]">
            <div className="hidden xl:flex flex-col gap-[58px] w-[50%]">
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

          <div className="w-[60%] xl:w-[40%] flex flex-col">
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
              className="bg-primary self-start text-white font-dm mt-4 text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
            >
              <div>Заказать оценку авто</div>
              <BsArrowUpRight />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-textPrimary py-10 md:py-20 lg:py-[110px] mt-10 px-10 lg:px-[120px] 2xl:px-[200px] lg:mt-[230px]">
        <Reviews variant="white" />
      </div>
      <MobileApp />
      <NewsBlock />
    </div>
  );
};

export default Home;
