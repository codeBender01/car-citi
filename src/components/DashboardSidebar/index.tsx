import { useTranslation } from "react-i18next";
import { useQueryClient } from "@tanstack/react-query";

import { sideNavs } from "./lib/sideNavs";

import { useNavigate, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  onNavigate?: () => void;
}

const DahsboardSidebar = ({ onNavigate }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const handleNavigate = (path: string, textKey: string) => {
    // Handle logout
    if (textKey === "common.logout") {
      localStorage.removeItem("accessToken");
      // Clear the profile query cache completely
      queryClient.removeQueries({ queryKey: ["getCurrentUser"] });
    }
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="px-7.5 py-15 max-w-75 w-full">
      <ul className="mt-6.25 ">
        {sideNavs.map((n) => {
          return (
            <li
              key={n.textKey}
              onClick={() => handleNavigate(n.path, n.textKey)}
              className={`${
                location.pathname === n.path ? "bg-[#FFFFFF1A]" : ""
              } py-4.5 px-5 flex items-center gap-3.5 text-white font-dm text-base text-nowrap rounded-2xl hover:bg-[#FFFFFF1A] duration-150 cursor-pointer`}
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
