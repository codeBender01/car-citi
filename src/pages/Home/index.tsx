import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SearchForm from "./ui/SearchForm";
import CarsCarousel from "./ui/CarsCarousel";
import BrandsSection from "./ui/BrandsSection";
import PartnersSection from "./ui/PartnersSection";
import CarCard from "@/components/CarCard";
// import { Button } from "@/components/ui/button";
import NewsBlock from "./ui/NewsBlock";
import { types } from "./lib/types";
import { getWhyUs } from "./lib/whyUs";

import "swiper/css";

import hero from "@/assets/home/hero.png";
import aspect from "@/assets/home/aspect.png";
// import logoMed from "@assets/home/logoMedium.png";
// import check1 from "@assets/home/check1.png";
// import check2 from "@assets/home/check2.png";
// import check3 from "@assets/home/check3.png";
import DealersBanner from "@/components/DealersBanner";

import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
// import LogoSection from "@/svgs/LogoSection";
// import GreenCheck from "@/svgs/GreenCheck";

import StatsSection from "./ui/StatSection";

import { useGetHomeClient } from "@/api/home/useGetHomeClient";
import { useGetBanners } from "@/api/banners/useGetAllBanners";
import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { useGetSubcategoriesClient } from "@/api/carSpecsClient/useGetSubcategoriesClient";
import { useGetUsers } from "@/api/auth/useGetUsers";
import { BASE_URL } from "@/api";
import i18n from "@/i18n";

const Home = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<
    "recent" | "popular" | "verified" | "all"
  >("recent");

  const tabs = [
    { id: "recent" as const, label: t("home.new") },
    { id: "verified" as const, label: t("home.verified") },
    { id: "popular" as const, label: t("home.popular") },
    { id: "all" as const, label: t("common.all"), showOnSmall: true },
  ];

  const { data: homeData } = useGetHomeClient();
  const { data: banners } = useGetBanners(1, 100);
  const { data: carMarks } = useGetCarMarksClient(1, 10, i18n.language);
  const { data: subcategories } = useGetSubcategoriesClient(i18n.language);
  const { data: businessUsers } = useGetUsers(1, 5, "Business");

  const navigate = useNavigate();
  const whyUs = getWhyUs(t);

  const getActiveCars = () => {
    if (!homeData?.data) return [];

    switch (activeTab) {
      case "recent":
        return homeData.data.carRecent || [];
      case "verified":
        return homeData.data.verifiedCars || [];
      case "popular":
        return homeData.data.carPopular || [];

      default:
        return [];
    }
  };

  const activeCars = getActiveCars();

  console.log(subcategories);

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
            {banners?.data?.rows && banners.data.rows.length > 0 ? (
              banners.data.rows.map((banner) => (
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
                      {t("home.heroSubtitle")}
                    </div>
                    <h1 className="relative z-10 text-2xl md:text-[48px] mb-4 md:mb-0 lg:text-[70px] text-white font-rale font-bold">
                      {t("home.heroTitle")}
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
                    {t("home.heroSubtitle")}
                  </div>
                  <h1 className="relative z-10 text-2xl md:text-[48px] mb-4 md:mb-0 lg:text-[70px] text-white font-rale font-bold">
                    {t("home.heroTitle")}
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
        <BrandsSection carMarks={carMarks?.data.rows} />

        <div className="mt-[72px] md:mt-[120px] w-[90%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
              {t("home.exploreAllCars")}
            </div>
            <div
              onClick={() => {
                navigate("/all-cars");
              }}
              className="hidden md:flex items-center gap-2 font-dm font-medium cursor-pointer"
            >
              {t("common.viewAll")}
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
      </main>
      <div className="mt-20">
        <DealersBanner
          title={t("home.dealersTitle")}
          description={t("home.dealersDescription")}
          buttonText={t("home.fullList")}
        />
      </div>

      <StatsSection counts={homeData?.data?.counts} />

      <div className="mt-[60px] md:mt-[75px] px-4 md:px-10 lg:px-[100px] 2xl:px-[118px]">
        <div className="flex items-center justify-between">
          <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
            {t("home.searchByBodyType")}
          </div>
          <div
            onClick={() => navigate("/all-cars")}
            className="hidden cursor-pointer lg:flex items-center gap-2 font-dm font-medium"
          >
            {t("common.viewAll")}
            <BsArrowUpRight />
          </div>
        </div>

        <ul className="flex lg:grid grid-cols-5 flex-col items-center justify-between gap-[25px] mt-10">
          {types.map((typeItem, idx) => {
            const subcategory = subcategories?.data?.rows?.[idx];
            return (
              <li
                key={typeItem.type}
                onClick={() => {
                  if (subcategory) {
                    navigate(`/all-cars?subcategoryId=${subcategory.id}`);
                  }
                }}
                className="h-[300px] bg-black! card-gradient lg:bg-none lg:w-auto w-full lg:block flex flex-row-reverse justify-between flex-1 rounded-2xl px-[30px] py-5 lg:py-[38px] text-white font-dm cursor-pointer"
                style={
                  {
                    "--bg-image": `url(${typeItem.img})`,
                    backgroundSize: "cover",
                  } as React.CSSProperties
                }
              >
                <div>{typeItem.num}</div>
                <div className="flex items-center gap-2">
                  <div className="flex lg:hidden">{typeItem.icon}</div>
                  {subcategory?.name || typeItem.type}
                </div>
              </li>
            );
          })}
        </ul>

        <PartnersSection dealers={businessUsers?.data?.users} />

        <div className="mt-[75px] md:mt-[120px] relative rounded-2xl overflow-hidden">
          <img
            src={aspect}
            alt=""
            className="md:absolute md:inset-0 w-full h-[300px] md:h-full object-cover"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center md:py-[50px] md:px-[30px]">
            <div
              className="flex-1 p-8 md:p-12 lg:p-16 md:rounded-2xl"
              style={{ backgroundColor: "#FFFFFFE5" }}
            >
              <h2 className="font-rale font-bold text-[26px] md:text-[36px] text-textPrimary leading-tight">
                {t("home.newSecurityLevel")}
              </h2>
              <p className="mt-4 text-sm md:text-base text-textPrimary/70 font-dm max-w-lg">
                {t("home.newSecurityLevelDesc")}
              </p>
              <ul className="mt-6 space-y-3 font-dm text-sm md:text-base text-textPrimary">
                {[
                  t("home.securityPoint1"),
                  t("home.securityPoint2"),
                  t("home.securityPoint3"),
                  t("home.securityPoint4"),
                ].map((point, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs shrink-0">
                      &#10003;
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate("/car-diagnostics")}
                className="mt-8 bg-primary text-white px-6 py-3 rounded-full font-dm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                {t("home.submitCarCheck")}
                <BsArrowUpRight />
              </button>
            </div>
            <div className="hidden md:block flex-1" />
          </div>
        </div>

        <div className="mt-[75px]  md:mt-[120px]  relative">
          <div className="font-rale text-[26px] md:text-[40px] relative z-10 text-center text-textPrimary font-bold">
            {t("home.whyChooseUs")}
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

        {/* <div className="mt-[200px] relative hidden lg:flex justify-between">
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
              {t("home.getRealPrice")}
            </div>
            <p className="font-dm font-medium text-textPrimary mt-[30px]">
              {t("home.priceEvaluationDescription")}
            </p>

            <ul className="mt-[66px] font-dm text-textPrimary flex flex-col gap-[34px]">
              <li className="flex items-center gap-2.5">
                <GreenCheck /> {t("home.evaluationPoint1")}
              </li>
              <li className="flex items-center gap-2.5">
                <GreenCheck /> {t("home.evaluationPoint2")}
              </li>
              <li className="flex items-center gap-2.5">
                <GreenCheck /> {t("home.evaluationPoint3")}
              </li>
            </ul>
            <Button
              size="none"
              className="bg-primary self-start text-white font-dm mt-4 text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
            >
              <div>{t("home.orderEvaluation")}</div>
              <BsArrowUpRight />
            </Button>
          </div>
        </div> */}
      </div>

      {/* <div className="bg-textPrimary py-10 md:py-20 lg:py-[110px] mt-10 px-10 lg:px-[120px] 2xl:px-[200px] lg:mt-[230px]">
        <Reviews variant="white" />
      </div> */}
      {/* <MobileApp /> */}
      <NewsBlock />
    </div>
  );
};

export default Home;
