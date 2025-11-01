import { cards } from "./lib/cards";
import StatCard from "./ui/StatCard";
import ViewsChart from "./ui/ViewsChart";
import Activities from "./ui/Activities";

const Dashboard = () => {
  return (
    <div className="p-[35px] 2xl:p-[60px]">
      <div className="font-dm text-textSecondary ">
        <div className="text-[32px] font-bold">Дашборд</div>
        <p className="text-textSecondary text-base">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
      </div>
      <div className="flex w-full mt-10 gap-6">
        {cards.map((c) => (
          <StatCard
            key={c.text}
            text={c.text}
            value={c.value}
            icon={c.icon}
            isGreenIcon={c.isGreenIcon}
          />
        ))}
      </div>
      <div className="flex mt-6 gap-6">
        <ViewsChart />
        <Activities />
      </div>
    </div>
  );
};

export default Dashboard;
