import { stats } from "../lib/stats";

const StatsSection = () => {
  return (
    <div className="px-[120px] 2xl:px-[118px] border-b border-headerBorder">
      <ul className="py-[60px] flex items-center justify-between w-full ">
        {stats.map((s) => {
          return (
            <li key={s.num} className="flex flex-col gap-1.5 items-center">
              <div className="text-[38px] font-dm font-bold ">{s.num}</div>
              <div className="font-dm text-base">{s.text}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatsSection;
