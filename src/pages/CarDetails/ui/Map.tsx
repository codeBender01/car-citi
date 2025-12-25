import { BsArrowUpRight } from "react-icons/bs";
import { IoChevronDownOutline } from "react-icons/io5";
import { useState } from "react";

import map from "@assets/images/map.png";

const Map = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div className="bg-white border border-grayBorder mx-6 lg:mx-0 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
      <div
        className="text-[22px] md:text-[26px] p-6 lg:p-10 flex items-center justify-between cursor-pointer md:cursor-default"
        onClick={toggleExpanded}
      >
        Местоположение
        <IoChevronDownOutline
          className={`md:hidden transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 md:max-h-none! md:opacity-100! ${
          isExpanded
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 lg:px-10 pb-6 lg:pb-10">
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur. <br /> Lorem ipsum dolor
          </p>
          <div className="flex mt-[30px] items-center gap-2 text-primary">
            Проложить маршрут
            <BsArrowUpRight />
          </div>
          <div className="mt-[30px]">
            <img src={map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
