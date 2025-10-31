import { IoCarSportOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { BsFuelPump } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { TbManualGearbox } from "react-icons/tb";
import { PiSteeringWheelDuotone } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { TbEngine } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";
import { BiSolidColorFill } from "react-icons/bi";
import { MdOutlineSimCard } from "react-icons/md";

export const carCharsList = [
  {
    text: "Кузов",
    value: "Купе",
    icon: <IoCarSportOutline />,
  },
  {
    text: "Пробег",
    value: "28.000 km",
    icon: <BsSpeedometer2 />,
  },
  {
    text: "Тип топлива",
    value: "Бензин",
    icon: <BsFuelPump />,
  },
  {
    text: "Год",
    value: "2023",
    icon: <IoCalendarOutline />,
  },
  {
    text: "Трансмиссия",
    value: "Автомат",
    icon: <TbManualGearbox />,
  },
  {
    text: "Тип привода",
    value: "Передний",
    icon: <PiSteeringWheelDuotone />,
  },
  {
    text: "Состояние",
    value: "бу",
    icon: <IoPersonOutline />,
  },
  {
    text: "Объем двигателя",
    value: "4.8L",
    icon: <TbEngine />,
  },
  {
    text: "Двери",
    value: "3",
    icon: <GiCarDoor />,
  },
  {
    text: "Цвет",
    value: "Черный",
    icon: <BiSolidColorFill />,
  },
  {
    text: "VIN / ID",
    value: "ZN682AVA2P7429564",
    icon: <MdOutlineSimCard />,
  },
];
