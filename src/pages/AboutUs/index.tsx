import aboutUsHero from "@assets/aboutUs/Rectangle 4178.png";
import heroMobile from "@assets/aboutUs/heroMobile.png";

import { Button } from "@/components/ui/button";
import { useState } from "react";

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

import { questions } from "./lib/questions";
import Faq from "./ui/Faq";

import LogoCar from "@/svgs/LogoCar";

const AboutUs = () => {
  const [openQuestionId, setOpenQuestionId] = useState<null | number>(null);

  const handleToggle = (id: number) => {
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
            <span className="text-greenPrimary">Автомаркетплейс №1</span>{" "}
            CarCiti— продавай легко, покупай уверенно.
          </h1>
          <p className="font-dm text-[15px] w-[85%] lg:text-left text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{" "}
          </p>
          <Button
            size="none"
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-fit"
          >
            Узнать
            <BsArrowDown />
          </Button>
        </div>
      </div>
      <StatsSection />

      <div className="mt-[75px] rounded-t-2xl lg:bg-transparent bg-primary px-[30px] lg:mt-[180px] py-6  mx-4 md:px-12 xl:px-[120px] 2xl:px-[118px] flex xl:flex-row flex-col gap-5">
        <LogoCar />
        <div className="h2 text-white">продавай легко, покупай уверенно.</div>
      </div>

      <div className="lg:bg-transparent bg-[#0C1002] lg:mt-[180px] py-6 mx-4 px-[30px] md:px-12 xl:px-[120px] 2xl:px-[118px] flex xl:flex-row flex-col gap-5">
        <div className="w-full xl:w-[60%]">
          <div className="h2 text-white lg:text-textPrimary">
            Мы дорожим каждым клиентом и стремимся сделать их опыт приятным
          </div>
          <div className="xl:block hidden">
            <GreenArrow />
          </div>
        </div>
        <div className="w-full xl:w-[40%] font-dm text-white lg:text-textPrimary flex flex-col gap-8">
          <p>
            Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget
            sit urna. Eu duis lectus amet vestibulum varius. Nibh tellus sit sit
            at lorem facilisis. Nunc vulputate ac interdum aliquet vestibulum in
            tellus.
          </p>
          <p>
            Sit convallis rhoncus dolor purus amet orci urna. Lobortis vulputate
            vestibulum consectetur donec ipsum egestas velit laoreet justo. Eu
            dignissim egestas egestas ipsum. Sit est nunc pellentesque at a
            aliquam ultrices consequat. Velit duis velit nec amet eget eu morbi.
            Libero non diam sit viverra dignissim. Aliquam tincidunt in cursus
            euismod enim.
          </p>
          <p>
            Magna odio sed ornare ultrices. Id lectus mi amet sit at sit arcu mi
            nisl. Mauris egestas arcu mauris.
          </p>
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
            Миссия и видение
          </div>
          <div className="xl:block hidden">
            <GreenArrow />
          </div>
        </div>
        <div className="w-full xl:w-[40%] font-dm text-white lg:text-textPrimary flex flex-col gap-8">
          <p>
            Lorem ipsum dolor sit amet consectetur. Convallis integer enim eget
            sit urna. Eu duis lectus amet vestibulum varius. Nibh tellus sit sit
            at lorem facilisis. Nunc vulputate ac interdum aliquet vestibulum in
            tellus.
          </p>
          <p>
            Sit convallis rhoncus dolor purus amet orci urna. Lobortis vulputate
            vestibulum consectetur donec ipsum egestas velit laoreet justo. Eu
            dignissim egestas egestas ipsum. Sit est nunc pellentesque at a
            aliquam ultrices consequat. Velit duis velit nec amet eget eu morbi.
            Libero non diam sit viverra dignissim. Aliquam tincidunt in cursus
            euismod enim.
          </p>
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
          <div className="h1 relative">
            Мы представляем лучших <br /> автодилеров страны{" "}
          </div>
          <div className="text-base md:text-[40px] font-rale font-medium">
            Для вашего качественного выбора
          </div>
          <Button
            size="none"
            className="bg-transparent border w-[300px] hover:bg-textPrimary duration-200 border-white  mt-[60px] text-white font-dm text-[15px] cursor-pointer rounded-xl hidden lg:flex items-center gap-2.5 py-4"
          >
            Узнать больше
            <BsArrowUpRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-16 mt-[75px] md:mt-[120px] lg:mt-[180px] px-4 md:px-10 lg:px-[120px] 2xl:px-[118px]">
        <div className="h2">Наша команда</div>
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
                  — продавай легко, покупай уверенно
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
          Часто задаваемые вопросы
        </div>
        <ul className="flex flex-col mt-[63px]">
          {questions.map((q, i) => {
            return (
              <Faq
                key={i}
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
