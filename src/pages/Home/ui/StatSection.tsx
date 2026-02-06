import type { HomeData } from "@/interfaces/home.interface";
import { getStats } from "../lib/stats";
import { useTranslation } from "react-i18next";

interface StatsSectionProps {
  counts?: HomeData["counts"];
}

const StatsSection = ({ counts }: StatsSectionProps) => {
  const { t } = useTranslation();

  const statsData = counts
    ? [
        {
          num: counts.postCount.toLocaleString(),
          text: t("stats.listings"),
        },
        {
          num: counts.dealerCount.toLocaleString(),
          text: t("stats.dealers"),
        },
        {
          num: counts.userCount.toLocaleString(),
          text: t("stats.users"),
        },
        {
          num: counts.successfulTransactionCount.toLocaleString(),
          text: t("stats.successfulDeals"),
        },
      ]
    : getStats(t);

  return (
    <div className="px-10 md:px-[120px] 2xl:px-[118px] border-b border-headerBorder">
      <ul className="py-[30px] md:py-[60px] grid grid-cols-2 gap-y-5 md:gap-0 md:flex items-center justify-between w-full ">
        {statsData.map((s) => {
          return (
            <li key={s.text} className="flex flex-col gap-1.5 items-center">
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
