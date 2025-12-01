import { stats } from "../lib/stats";

const StatsSection = () => {
  return (
    <div className="px-10 md:px-[120px] 2xl:px-[118px] border-b border-headerBorder">
      <ul className="py-[30px] md:py-[60px] grid grid-cols-2 gap-y-5 md:gap-0 md:flex items-center justify-between w-full ">
        {stats.map((s) => {
          return (
            <li key={s.num} className="flex flex-col gap-1.5 items-center">
              <div className="text-xl md:text-[38px] font-dm font-bold ">
                {s.num}
              </div>
              <div className="font-dm text-base">{s.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatsSection;
