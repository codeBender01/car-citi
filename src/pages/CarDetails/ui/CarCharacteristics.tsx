import { carCharsList } from "../lib/carChars";

const CarChars = () => {
  return (
    <ul className="p-[30px] bg-white border border-grayBorder rounded-2xl font-dm">
      {carCharsList.map((c, i) => {
        return (
          <li
            key={c.text}
            className={`${
              i !== carCharsList.length - 1
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
