import { serviceOptions } from "./lib/serviceOptions";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsArrowUpRight } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { PiUpload } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { CgPhone } from "react-icons/cg";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import CarImages from "./ui/CarImages";
import Map from "./ui/Map";
import Reviews from "./ui/Reviews";
import LeaveReviewForm from "./ui/LeaveReviewForm";
import CarCard from "@/components/CarCard";
import CarChars from "./ui/CarCharacteristics";
import { Button } from "@/components/ui/button";

import user from "@assets/header/user.png";

import { useState } from "react";

import { specifics } from "./lib/specifics";
import { techChars } from "./lib/technicalChars";

const CarDetails = () => {
  const [expandedChars, setExpandedChars] = useState<number[]>([]);

  const toggleChar = (id: number) => {
    setExpandedChars((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-[180px] px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <span className="text-primary">Домашняя страница</span> /{" "}
        <span>Авто на продажу</span>
      </div>
      <div className="h2 mt-5">Mercedes-Benz, C Class</div>
      <p className="font-dm text-base">
        2.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate
      </p>
      <div className="mt-5 flex justify-between">
        <div className="w-[65%]">
          <ul className="flex items-center gap-4 text-[13px] 2xl:text-base font-dm">
            {serviceOptions.map((s) => {
              return (
                <li
                  key={s.id}
                  className="flex items-center gap-2.5 border border-grayBorder rounded-[100px] px-5 py-2 text-nowrap"
                >
                  {s.icon}
                  {s.text}
                </li>
              );
            })}
          </ul>
          <CarImages />
          <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm">
            <div className="text-[26px]">Описание</div>
            <p className="mt-10 text-base font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm">
            <div className="text-[26px]">Особенности</div>
            <div className="mt-10 flex justify-between">
              {specifics.map((s) => {
                return (
                  <div className="" key={s.title}>
                    <div className="text-base 2xl:text-lg">{s.title}</div>
                    <ul className="flex flex-col gap-[22px] mt-5">
                      {s.subTexts.map((t) => {
                        return (
                          <li
                            key={t}
                            className="flex text-xs 2xl:text-base gap-2.5 items-center"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#EEF1FB] flex items-center justify-center">
                              <IoIosCheckmark className="text-primary" />
                            </div>
                            {t}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm">
            <div className="text-[26px]">Технические характеристики</div>
            <div className="mt-10 flex justify-between flex-col">
              {techChars.map((c) => {
                const isExpanded = expandedChars.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className={`py-[30px] ${
                      c.id === 3 ? "" : "border-b border-grayBorder font-dm "
                    }`}
                  >
                    <div
                      className="text-lg flex items-center justify-between cursor-pointer"
                      onClick={() => toggleChar(c.id)}
                    >
                      {c.text}
                      <IoChevronDownOutline
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`grid grid-cols-2 gap-x-12 gap-y-6 overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "mt-[30px] max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Длина</div>
                        <div>4950mm</div>
                      </div>
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Ширина</div>
                        <div>2140mm</div>
                      </div>
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Высота</div>
                        <div>1776mm</div>
                      </div>
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Колесная база</div>
                        <div>2984mm</div>
                      </div>
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Передний протектор</div>
                        <div>1668mm</div>
                      </div>
                      <div className="text-base flex items-center w-full justify-between">
                        <div>Задний протектор</div>
                        <div>1671mm</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Map />
          <Reviews />
          <LeaveReviewForm />
        </div>
        <div className="flex flex-col gap-[30px] self-stretch">
          <div className="flex items-center justify-end gap-7 font-dm text-base">
            <div className="flex items-center gap-2">
              Отправить
              <div className=" bg-white border border-headerBorder p-3 rounded-full">
                <PiUpload size={14} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              Сохранить
              <div className=" bg-white border border-headerBorder p-3 rounded-full">
                <CiBookmark size={14} />
              </div>
            </div>
          </div>

          <div className="p-[30px] bg-white border border-grayBorder rounded-2xl font-dm">
            <div className="flex gap-4 text-textPrimary">
              <span>Цена</span>
              <span className="text-textGray line-through">$48,000 </span>
            </div>
            <div className="font-dm text-[30px] my-5 font-bold">$45,900</div>
            <div>Без торга</div>
            <Button
              size="none"
              className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-10 gap-2.5 py-4 px-[25px] w-fit"
            >
              <IoPricetagOutline />
              Сделайте Предложение
            </Button>
          </div>
          <CarChars />

          <div className="p-[30px] bg-white border flex flex-col gap-5 border-grayBorder rounded-2xl font-dm">
            <div className="w-20 h-20 rounded-full">
              <img
                src={user}
                className="rounded-full object-cover w-full h-full"
                alt=""
              />
            </div>
            <div className="text-[20px] font-medium">Floyd Alexander</div>
            <div className="text-base">Консультант Mercedes-Benz</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-primary rounded-full bg-paleBlue p-2 2xl:p-3">
                  <HiOutlineLocationMarker />
                </div>
                <span className="text-sm 2xl:text-base">Ашхабад</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-primary rounded-full bg-paleBlue p-2 2xl:p-3">
                  <CgPhone />
                </div>
                <span className="text-sm 2xl:text-base">+90 533 888 4706</span>
              </div>
            </div>
            <Button
              size="none"
              className="text-white bg-primary  font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
            >
              Написать дилеру
              <BsArrowUpRight />
            </Button>
            <Button
              size="none"
              className="text-whatsappGreen bg-white hover:bg-whatsappGreen hover:text-white border border-whatsappGreen font-dm text-[15px] cursor-pointer rounded-xl flex items-center  gap-2.5 py-4 px-[25px] w-full"
            >
              Связаться в Whatsapp
              <BsArrowUpRight />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-[200px] w-full">
        <div className="flex items-center justify-between">
          <div className="font-rale text-[40px] text-textPrimary font-bold">
            Похожие объявления
          </div>
          <div className="flex items-center gap-2 font-dm font-medium">
            Посмотреть все
            <BsArrowUpRight />
          </div>
        </div>

        <div className="mt-[50px] grid grid-cols-4 gap-7">
          {[...Array(4)].map((_, idx) => {
            return <CarCard key={idx} />;
          })}
        </div>

        <div className="mt-[50px] flex items-center gap-10">
          <div className="rounded-[100px] border border-textPrimary px-6 py-2.5">
            <MdOutlineKeyboardArrowLeft size={20} />
          </div>
          <div className="font-dm text-base">4 из 13</div>
          <div className="rounded-[100px] border border-textPrimary px-6 py-2.5">
            <MdOutlineKeyboardArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
