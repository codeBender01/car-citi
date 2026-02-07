import aboutUsHero from "@assets/aboutUs/Rectangle 4178.png";
import heroMobile from "@assets/aboutUs/heroMobile.png";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BsArrowDown, BsArrowUpRight } from "react-icons/bs";
import GreenArrow from "@/svgs/GreenArrow";

import StatsSection from "../Home/ui/StatSection";
import UserCard from "./ui/UserCard";
import Reviews from "../Home/ui/Reviews";

import motto from "@assets/aboutUs/motto.png";
import benz from "@assets/aboutUs/benzOld.png";
import manBmw from "@assets/aboutUs/manBmw.png";
import consultant from "@assets/aboutUs/consultant.png";
import keys from "@assets/aboutUs/keys.png";
import cabin from "@assets/aboutUs/cabin.png";
import hero2 from "@assets/aboutUs/hero2.png";

import logoBlack from "@assets/images/logoBlack.png";

import Faq from "./ui/Faq";

import { useGetFaqs } from "@/api/faq/useGetFaqs";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [openQuestionId, setOpenQuestionId] = useState<null | string>(null);

  const { data: faqs } = useGetFaqs(i18n.language);

  const handleToggle = (id: string) => {
    if (openQuestionId && id === openQuestionId) {
      setOpenQuestionId(null);
      return;
    } else if (openQuestionId && id !== openQuestionId) {
      setOpenQuestionId(id);
      return;
    }
    setOpenQuestionId(id);
  };

  return (
    <div>
      <style>
        {`
          .hero-background {
            background-image: url(${heroMobile});
            background-size: contain;
            background-position: bottom;
            background-repeat: no-repeat;
          }

          @media (min-width: 1024px) {
            .hero-background {
            background-size: cover;
              background-image: url(${aboutUsHero});
            }
          }
        `}
      </style>
      <div className="hero-background bg-black h-[95vh] w-full flex items-center px-10 lg:items-start flex-col">
        <div className="lg:my-auto my-[140px] flex flex-col lg:items-start items-center justify-start w-full lg:w-[55%] lg:pl-12 2xl:pl-[180px] text-white gap-12">
          <h1 className="h1 lg:text-left text-center">
            <span className="text-greenPrimary">
              {t("about.marketplaceNumber1")}
            </span>{" "}
            {t("about.tagline")}
          </h1>
          <p className="font-dm text-[15px] w-[85%] lg:text-left text-center">
            {t("about.heroDescription")}
          </p>
          <Button
            size="none"
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-fit"
          >
            {t("about.learn")}
            <BsArrowDown />
          </Button>
        </div>
      </div>
      <StatsSection />

      <div className="lg:bg-transparent bg-[#0C1002] lg:mt-[180px] py-6 mx-4 px-[30px] md:px-12 xl:px-[120px] 2xl:px-[118px] flex xl:flex-row flex-col gap-5">
        <div className="w-full xl:w-[60%]">
          <div className="h2 text-white lg:text-textPrimary">
            {t("about.weValueClients")}
          </div>
          <div className="xl:block hidden">
            <GreenArrow />
          </div>
        </div>
        <div className="w-full xl:w-[40%] font-dm text-white lg:text-textPrimary flex flex-col gap-8">
          <p>{t("about.platformDescription1")}</p>
          <p>{t("about.platformDescription2")}</p>
        </div>
      </div>
      <div className="lg:my-12 md:px-12 pb-6 lg:pb-0 xl:px-[120px] px-[30px] 2xl:px-[118px] flex lg:flex-row flex-col lg:bg-transparent bg-[#0C1002] mx-4 lg:mx-0 gap-4 lg:h-[540px]">
        <div className="hidden lg:flex flex-col justify-between w-[210px] gap-8">
          <img src={motto} alt="motto" className="flex-1" />
          <img
            className="w-full h-[210px] rounded-2xl"
            src={benz}
            alt="mercedes"
          />
        </div>
        <div className="h-[400px] lg:h-full w-full lg:w-[45%]">
          <img
            src={manBmw}
            alt=""
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>

        <div className="flex flex-col  justify-between">
          <img
            src={consultant}
            alt="consultant"
            className="w-full h-[300px] rounded-2xl"
          />
          <div className="flex justify-between gap-4 w-full">
            <img
              src={cabin}
              alt=""
              className="w-[210px] h-[210px] lg:block hidden rounded-2xl"
            />
            <div className="w-full lg:w-auto lg:mt-0 mt-4">
              <img
                src={keys}
                alt=""
                className="flex-1 lg:w-auto w-full h-[210px] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:bg-transparent bg-[#0C1002] lg:rounded-0 rounded-b-2xl lg:mt-[180px] py-6 mx-4 px-[30px] md:px-12 xl:px-[120px] 2xl:px-[118px] flex xl:flex-row flex-col gap-5">
        <div className="w-full xl:w-[60%]">
          <div className="h2 text-white lg:text-textPrimary">
            {t("about.missionVision")}
          </div>
          <div className="xl:block hidden">
            <GreenArrow />
          </div>
        </div>
        <div className="w-full xl:w-[40%] font-dm text-white lg:text-textPrimary flex flex-col gap-8">
          <p>{t("about.missionDescription1")}</p>
          <p>{t("about.missionDescription2")}</p>
          <p>{t("about.missionDescription3")}</p>
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${hero2})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-[635px] md:h-[730px] mt-[180px] relative md:py-0 py-16 px-4 md:px-10 lg:px-[120px] 2xl:px-[118px] flex flex-col justify-end md:justify-center text-white"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(164.89% 73.75% at 47.09% 0.89%, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
            mixBlendMode: "luminosity",
          }}
        ></div>
        <div className="relative z-10">
          <div className="h1 relative">{t("about.wePresentBestDealers")}</div>
          <div className="text-base md:text-[40px] font-rale font-medium">
            {t("about.forQualityChoice")}
          </div>
          <Button
            size="none"
            className="bg-transparent border w-[300px] hover:bg-textPrimary duration-200 border-white  mt-[60px] text-white font-dm text-[15px] cursor-pointer rounded-xl hidden lg:flex items-center gap-2.5 py-4"
          >
            {t("about.learnMore")}
            <BsArrowUpRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-16 mt-[75px] md:mt-[120px] lg:mt-[180px] px-4 md:px-10 lg:px-[120px] 2xl:px-[118px]">
        <div className="h2">{t("about.ourTeam")}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 content-center lg:flex items-center gap-6">
          {[...Array(5)].map((_, i) => {
            return <UserCard key={i} />;
          })}
        </div>
      </div>

      <div className="green-gradient mt-[75px] md:mt-[120px] lg:mt-[180px] py-3.5 overflow-hidden whitespace-nowrap">
        <div className="flex animate-scroll gap-20">
          {[...Array(10)].map((_, i) => {
            return (
              <div key={i} className="flex items-center gap-2 px-8">
                <img className="h-[27px]" src={logoBlack} alt="" />
                <div className="font-rale font-bold text-[20px]">
                  — {t("about.tagline")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[75px] md:mt-[120px] lg:mt-[180px] px-10 lg:px-[120px] bg-textPrimary lg:py-[110px] py-6 2xl:px-[118px]">
        <Reviews variant="white" headingClassName="text-white" />
      </div>

      <div className="mt-[75px] lg:mt-[100px] mx-auto w-[95%] lg:w-[70%] flex flex-col items-center">
        <div className="text-[26px] md:text-[40px] font-dm font-bold">
          {t("about.faq")}
        </div>
        <ul className="flex flex-col mt-[63px]">
          {faqs?.data.rows.map((q, i) => {
            return (
              <Faq
                key={q.id}
                index={i}
                question={q}
                openId={openQuestionId}
                onToggle={() => handleToggle(q.id)}
              />
            );
          })}
        </ul>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
