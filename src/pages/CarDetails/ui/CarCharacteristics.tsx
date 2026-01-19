import { carCharsList } from "../lib/carChars";
import type { OnePost } from "@/interfaces/posts.interface";

interface CarCharsProps {
  car?: OnePost;
}

const CarChars = ({ car }: CarCharsProps) => {
  // Create dynamic characteristics list based on car data
  const dynamicChars = car
    ? [
        ...carCharsList,
        ...(car.transmission
          ? [
              {
                icon: carCharsList[0]?.icon,
                text: "Трансмиссия",
                value: car.transmission.name,
              },
            ]
          : []),
        ...(car.fuelType
          ? [
              {
                icon: carCharsList[0]?.icon,
                text: "Тип топлива",
                value: car.fuelType.name,
              },
            ]
          : []),
        ...(car.issueYear
          ? [
              {
                icon: carCharsList[0]?.icon,
                text: "Год выпуска",
                value: car.issueYear,
              },
            ]
          : []),
      ]
    : carCharsList;

  return (
    <ul className="p-[30px] bg-white border border-grayBorder rounded-2xl font-dm">
      {dynamicChars.map((c, i) => {
        return (
          <li
            key={`${c.text}-${i}`}
            className={`${
              i !== dynamicChars.length - 1
                ? "border-b border-headerBorder"
                : ""
            } flex items-center justify-between text-sm 2xl:text-base py-3.5`}
          >
            <div className="flex gap-3.5">
              {c.icon}
              {c.text}
            </div>
            <div>{c.value}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default CarChars;
