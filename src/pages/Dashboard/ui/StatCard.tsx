interface StatCardProps {
  text: string;
  value: number;
  icon: React.ReactNode;
  isGreenIcon?: boolean;
}

const StatCard = ({ text, value, icon, isGreenIcon }: StatCardProps) => {
  return (
    <div className="h-[150px] flex-1 font-dm flex items-center justify-between px-6 2xl:px-[30px] border border-headerBorder rounded-2xl 2xl:h-[170px]">
      <div className=" text-textPrimary">
        <div className="text-base">{text}</div>
        <div className="text-[30px] font-bold">{value}</div>
      </div>
      <div
        className={`${
          isGreenIcon ? "bg-primary " : "text-primary bg-paleBlue"
        } w-[50px] h-[50px] 2xl:w-[70px] 2xl:h-[70px] rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
