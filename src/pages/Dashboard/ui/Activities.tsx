import AddPostGreen from "@/svgs/sidebar/AddPostGreen";
import { LuMessagesSquare } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { activities, type Activity } from "../lib/activities";

const Activities = () => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "approved":
        return <AddPostGreen />;
      case "message":
        return <LuMessagesSquare size={18} className="text-primary" />;
      case "saved":
        return <CiBookmark size={16} className="text-primary" />;
    }
  };

  return (
    <div className="w-[35%] border border-grayBorder rounded-2xl bg-white p-[30px] font-dm flex flex-col">
      <h2 className="font-medium text-lg text-textPrimary mb-[30px]">
        Активность
      </h2>

      <div className="flex-1 flex flex-col gap-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-mainBg flex items-center justify-center shrink-0">
              {getIcon(activity.type)}
            </div>
            <p className="text-sm 2xl:text-[15px] text-textPrimary leading-normal">
              <span className="font-normal">{activity.text}</span>
              <span className="font-medium">{activity.boldText}</span>
            </p>
          </div>
        ))}
      </div>

      <button className="w-full border border-primary rounded-xl px-[26px] py-5 flex items-center justify-center gap-2.5 text-primary font-medium text-[15px] leading-[26px] hover:bg-primary hover:text-white transition-colors duration-200 mt-5">
        Посмотреть все
        <FiArrowUpRight size={14} />
      </button>
    </div>
  );
};

export default Activities;
