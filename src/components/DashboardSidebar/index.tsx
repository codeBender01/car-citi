import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";

import { sideNavs } from "./lib/sideNavs";

import { useNavigate, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

const DahsboardSidebar = ({ onNavigate }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="px-[30px] py-[60px] max-w-[300px] w-full">
      <Button
        size="none"
        className="text-white bg-transparent hover:bg-white hover:text-darkGreen border border-white  font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
        onClick={() => handleNavigate("/dashboard/add")}
      >
        <LuPlus />
        {t('dashboard.addListings')}
      </Button>
      <ul className="mt-[25px] ">
        {sideNavs.map((n) => {
          return (
            <li
              key={n.textKey}
              onClick={() => handleNavigate(n.path)}
              className={`${
                location.pathname === n.path ? "bg-[#FFFFFF1A]" : ""
              } py-[18px] px-5 flex items-center gap-3.5 text-white font-dm text-base text-nowrap rounded-2xl hover:bg-[#FFFFFF1A] duration-150 cursor-pointer`}
            >
              {n.icon}
              {t(n.textKey)}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DahsboardSidebar;
