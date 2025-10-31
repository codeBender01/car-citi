import aboutUsHero from "@assets/aboutUs/Rectangle 4178.png";

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
      <div
        style={{
          backgroundImage: `url(${aboutUsHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[95vh] w-full flex items-start flex-col"
      >
        <div className="my-auto flex flex-col justify-start w-[55%] pl-12 2xl:pl-[180px] text-white gap-12">
          <h1 className="h1 ">
            <span className="text-greenPrimary">Автомаркетплейс №1</span>{" "}
            CarCiti— продавай легко, покупай уверенно.
          </h1>
          <p className="font-dm text-[15px] w-[85%]">
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

      <div className="mt-[180px] px-[120px] 2xl:px-[118px] flex gap-5">
        <div className="w-[60%]">
          <div className="h2">
            Мы дорожим каждым клиентом и стремимся сделать их опыт приятным
          </div>
          <GreenArrow />
        </div>
        <div className="w-[40%] font-dm text-textPrimary flex flex-col gap-8">
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
      <div className="my-12 px-[120px] 2xl:px-[118px] flex gap-4 h-[540px]">
        <div className="flex flex-col justify-between w-[210px] gap-8">
          <img src={motto} alt="motto" className="flex-1" />
          <img
            className="w-full h-[210px] rounded-2xl"
            src={benz}
            alt="mercedes"
          />
        </div>
        <div className="h-full w-[45%]">
          <img
            src={manBmw}
            alt=""
            className="object-cover h-full rounded-2xl"
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
              className="w-[210px] h-[210px] rounded-2xl"
            />
            <div>
              <img src={keys} alt="" className="flex-1 h-[210px] rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-[120px] 2xl:px-[118px] flex gap-5 items-center">
        <div className="w-[60%]">
          <div className="h2">Миссия и видение</div>
          <GreenArrow />
        </div>
        <div className="w-[40%] font-dm text-textPrimary flex flex-col gap-8">
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
        className="h-[730px] mt-[180px] relative px-[120px] 2xl:px-[118px] flex flex-col justify-center text-white"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, #00000000 0%, #000000 100%)",
          }}
        ></div>
        <div className="relative z-10">
          <div className="h1 relative">
            Мы представляем лучших <br /> автодилеров страны{" "}
          </div>
          <div className="text-[40px] font-rale font-medium">
            Для вашего качественного выбора
          </div>
          <Button
            size="none"
            className="bg-transparent border w-[300px] hover:bg-textPrimary duration-200 border-white  mt-[60px] text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4"
          >
            Узнать больше
            <BsArrowUpRight />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-16 mt-[180px] px-[120px] 2xl:px-[118px]">
        <div className="h2">Наша команда</div>
        <div className="flex items-center gap-6">
          {[...Array(5)].map((_, i) => {
            return <UserCard key={i} />;
          })}
        </div>
      </div>

      <div className="green-gradient mt-[180px] py-3.5 overflow-hidden whitespace-nowrap">
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

      <div className="my-[180px] px-[120px] 2xl:px-[118px]">
        <Reviews variant="black" />
      </div>

      <div className="mt-[100px] mx-auto w-[70%] flex flex-col items-center">
        <div className="text-[40px] font-dm font-bold">
          Часто задаваемые вопросы
        </div>
        <ul className="flex flex-col mt-[63px]">
          {questions.map((q, i) => {
            return (
              <Faq
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
