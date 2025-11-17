import car1 from "@assets/images/car1.png";
import Gearbox from "@/svgs/Gearbox";
import Fuel from "@/svgs/Fuel";
import Speedometer from "@/svgs/Speedometer";
import Calendar from "@/svgs/Calendar";

import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import type { OnePost } from "@/interfaces/posts.interface";

import dayjs from "dayjs";

export interface CarCardProps {
  car: OnePost;
}

const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/car-details");
      }}
      className="rounded-2xl flex flex-col w-full max-w-[330px] bg-white shadow-md border border-headerBorder"
    >
      <div className="h-[220px]">
        <img src={car1} alt="" className="rounded-t-2xl" />
      </div>

      <div className="px-[30px] pb-5 text-textPrimary">
        <div className="font-rale font-bold text-[20px] ">
          {car.carModel.name}
        </div>
        <p className="line-clamp-1 text-sm font-dm "></p>

        <div className="grid grid-cols-2 mt-6 gap-y-7">
          <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
            <Speedometer />
          </div>
          <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
            <Fuel />
            {car.fuelType.name}
          </div>
          <div className="flex items-center line-clamp-1 gap-2 text-sm text-textPrimary font-dm">
            <Gearbox />
            <div className="line-clamp-1">{car.transmission.name}</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
            <Calendar />
            {dayjs(car.issueYear).format("DD.MM.YYYY")}
          </div>
        </div>

        <div className="my-6 h-0.5 w-full bg-headerBorder"></div>
        <div className="flex items-center justify-between">
          <div>${car.carPrice.price}</div>
          <div className="flex items-center text-primary gap-2 font-dm font-medium">
            Подробно
            <BsArrowUpRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
