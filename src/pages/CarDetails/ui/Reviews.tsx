import { ratings } from "../lib/ratings";
import { TiStarFullOutline } from "react-icons/ti";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

import { Button } from "@/components/ui/button";

import { BsArrowUpRight } from "react-icons/bs";

import benz from "@assets/images/benz2.png";

const Reviews = () => {
  return (
    <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm">
      <div className="text-[26px]"> Отзывы покупателей о дилере</div>
      <div className="flex mt-10 gap-6">
        <div className="border-10 border-paleBlue h-[200px] w-[200px] rounded-full font-dm text-primary flex flex-col items-center justify-center">
          <div className="text-base">Общая оценка</div>
          <div className="text-[40px] font-bold">4.8</div>
          <div className="text-base">Out Of 5</div>
        </div>

        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
          {ratings.map((r) => {
            return (
              <li
                key={r.id}
                className={`${
                  r.id === 5 || r.id === 6 ? "" : "border-b border-headerBorder"
                } flex item justify-between font-dm text-base font-medium`}
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
  );
};

export default Reviews;
