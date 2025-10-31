import { BsArrowUpRight } from "react-icons/bs";

import map from "@assets/images/map.png";

const Map = () => {
  return (
    <div className="bg-white border border-grayBorder p-10 mt-[30px] rounded-2xl font-dm">
      <div className="text-[26px]"> Местоположение</div>
      <p className="text-base mt-10">
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
  );
};

export default Map;
