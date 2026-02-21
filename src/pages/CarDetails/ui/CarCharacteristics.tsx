import type { OnePost } from "@/interfaces/posts.interface";
import type { ReactNode } from "react";
import { IoCarSportOutline } from "react-icons/io5";
import { BsSpeedometer2, BsFuelPump } from "react-icons/bs";
import { IoCalendarOutline, IoPersonOutline } from "react-icons/io5";
import { TbManualGearbox, TbEngine } from "react-icons/tb";
import { PiSteeringWheelDuotone } from "react-icons/pi";
import { BiSolidColorFill } from "react-icons/bi";
import { MdOutlineSimCard } from "react-icons/md";
import dayjs from "dayjs";

interface CarCharsProps {
  car?: OnePost;
}

const CarChars = ({ car }: CarCharsProps) => {
  const chars: { icon: ReactNode; text: string; value: string }[] = [];

  if (car?.subcategory?.name) {
    chars.push({ icon: <IoCarSportOutline />, text: "Кузов", value: car.subcategory.name });
  }
  if (car?.mileage != null) {
    chars.push({ icon: <BsSpeedometer2 />, text: "Пробег", value: `${car.mileage.toLocaleString()} km` });
  }
  if (car?.fuelType?.name) {
    chars.push({ icon: <BsFuelPump />, text: "Тип топлива", value: car.fuelType.name });
  }
  if (car?.issueYear) {
    chars.push({ icon: <IoCalendarOutline />, text: "Год", value: dayjs(car.issueYear).format("YYYY") });
  }
  if (car?.transmission?.name) {
    chars.push({ icon: <TbManualGearbox />, text: "Трансмиссия", value: car.transmission.name });
  }
  if (car?.driveType?.name) {
    chars.push({ icon: <PiSteeringWheelDuotone />, text: "Тип привода", value: car.driveType.name });
  }
  if (car?.carCondition?.name) {
    chars.push({ icon: <IoPersonOutline />, text: "Состояние", value: car.carCondition.name });
  }
  if (car?.engineVolume != null) {
    chars.push({ icon: <TbEngine />, text: "Объем двигателя", value: `${car.engineVolume}L` });
  }
  if (car?.color?.name) {
    chars.push({ icon: <BiSolidColorFill />, text: "Цвет", value: car.color.name });
  }
  if (car?.vin) {
    chars.push({ icon: <MdOutlineSimCard />, text: "VIN / ID", value: car.vin });
  }

  if (chars.length === 0) return null;

  return (
    <ul className="p-[30px] bg-white border border-grayBorder rounded-2xl font-dm">
      {chars.map((c, i) => (
        <li
          key={c.text}
          className={`${
            i !== chars.length - 1 ? "border-b border-headerBorder" : ""
          } flex items-center justify-between text-sm 2xl:text-base py-3.5`}
        >
          <div className="flex gap-3.5">
            {c.icon}
            {c.text}
          </div>
          <div>{c.value}</div>
        </li>
      ))}
    </ul>
  );
};

export default CarChars;
