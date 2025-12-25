import { ratings } from "../lib/ratings";
import { TiStarFullOutline } from "react-icons/ti";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { BsArrowUpRight } from "react-icons/bs";

import benz from "@assets/images/benz2.png";

const Reviews = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="bg-white border border-grayBorder mx-6 lg:mx-0 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
      <div
        className="text-[22px] md:text-[26px] p-6 lg:p-10 flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={toggleExpanded}
      >
        Отзывы покупателей о дилере
        <IoChevronDownOutline
          className={`md:hidden transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 md:max-h-none! md:opacity-100! ${
          isExpanded
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 lg:px-10 pb-6 lg:pb-10">
      <div className="flex lg:flex-row flex-col mt-6 md:mt-10 gap-6">
        <div className="border-10 border-paleBlue h-[120px] md:h-[200px] w-[120px] md:w-[200px] rounded-full font-dm text-primary flex flex-col items-center justify-center">
          <div className="text-center text-[9px] md:text-base">
            Общая оценка
          </div>
          <div className="text-2xl md:text-[40px] font-bold">4.8</div>
          <div className="text-center text-[9px] md:text-base">Out Of 5</div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-1">
          {ratings.map((r) => {
            return (
              <li
                key={r.id}
                className={`${
                  r.id === 5 || r.id === 6
                    ? "md:border-0 border-b"
                    : "border-b "
                } flex item justify-between border-headerBorder font-dm text-base font-medium`}
              >
                <div>
                  <div>{r.text}</div>
                  <div>Отлично</div>
                </div>

                <div className="flex items-center gap-2.5">
                  <TiStarFullOutline size={20} className="text-primary" />
                  5.0
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className=" flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-textPrimary uppercase flex items-center justify-center text-white text-sm">
            a.t
          </div>
          <div className="text-lg font-dm">Murad</div>
          <div className="text-base font-dm font-light">Дек 11, 2024</div>
        </div>
        <div className="flex items-center gap-3 text-textPrimary">
          <div className="text-primary flex gap-1 items-center">
            {[...Array(5)].map((_, i) => {
              return <TiStarFullOutline key={i} />;
            })}
          </div>
          <div className="font-dm text-base font-medium">
            Прошел тест драйв! - это фантастика!
          </div>
        </div>
        <p className="text-base text-textPrimary font-dm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <div className="flex items-center gap-3">
          {[...Array(3)].map((_, i) => {
            return (
              <img
                src={benz}
                key={i}
                className="h-[136px] w-[138px] rounded-2xl object-cover"
                alt=""
              />
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-primary text-base font-dm">
            <BiSolidLike /> Полезно
          </div>
          <div className="flex items-center gap-2.5 text-textPrimary text-base font-dm">
            <BiSolidDislike /> Не полезно
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className=" flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-textPrimary uppercase flex items-center justify-center text-white text-sm">
            a.t
          </div>
          <div className="text-lg font-dm">Murad</div>
          <div className="text-base font-dm font-light">Дек 11, 2024</div>
        </div>
        <div className="flex items-center gap-3 text-textPrimary">
          <div className="text-primary flex gap-1 items-center">
            {[...Array(5)].map((_, i) => {
              return <TiStarFullOutline key={i} />;
            })}
          </div>
          <div className="font-dm text-base font-medium">Хорошее авто</div>
        </div>
        <p className="text-base text-textPrimary font-dm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident.
        </p>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 text-primary text-base font-dm">
            <BiSolidLike /> Полезно
          </div>
          <div className="flex items-center gap-2.5 text-textPrimary text-base font-dm">
            <BiSolidDislike /> Не полезно
          </div>
        </div>
      </div>

      <Button
        size="none"
        className="text-primary bg-transparent hover:bg-primary hover:text-white border border-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-10 gap-2.5 py-4 px-[25px] w-fit"
      >
        Смотреть больше отзывов
        <BsArrowUpRight />
      </Button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
