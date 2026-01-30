import { useState } from "react";
import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

import { adminNavs } from "./lib/adminNavs";

import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (text: string) => {
    setOpenDropdown(openDropdown === text ? null : text);
  };

  return (
    <aside className="px-[30px] py-[60px] max-w-[340px]">
      <Button
        size="none"
        className="text-white bg-transparent hover:bg-white hover:text-darkGreen border border-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
      >
        <LuPlus />
        Добавить контент
      </Button>
      <ul className="mt-[25px]">
        {adminNavs.map((n) => {
          const hasSubPaths = n.subPaths && n.subPaths.length > 0;
          const isOpen = openDropdown === n.text;

          return (
            <li key={n.text}>
              <div
                onClick={() => {
                  if (hasSubPaths) {
                    toggleDropdown(n.text);
                  } else {
                    // Handle logout
                    if (n.text === "Выход") {
                      localStorage.removeItem("adminAccessToken");
                    }
                    navigate(n.path);
                  }
                }}
                className={`${
                  location.pathname.includes(n.path) ? "bg-[#FFFFFF1A]" : ""
                } py-[18px] px-5 flex items-center justify-between text-white font-dm text-base text-nowrap rounded-2xl hover:bg-[#FFFFFF1A] duration-150 cursor-pointer`}
              >
                <div className="flex items-center gap-2.5">
                  {n.icon}
                  <div className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[80%]">
                    {n.text}
                  </div>
                </div>
                {hasSubPaths && (
                  <span className="ml-auto">
                    {isOpen ? (
                      <IoChevronUp className="w-4 h-4" />
                    ) : (
                      <IoChevronDown className="w-4 h-4" />
                    )}
                  </span>
                )}
              </div>
              {hasSubPaths && isOpen && (
                <ul className="ml-9 mt-2 space-y-1">
                  {n.subPaths?.map((subPath) => (
                    <li
                      key={subPath.path}
                      onClick={() => navigate(subPath.path)}
                      className={`${
                        location.pathname === subPath.path
                          ? "bg-[#FFFFFF1A]"
                          : ""
                      } py-2 px-4 text-white/80 font-dm text-sm rounded-lg hover:bg-[#FFFFFF1A] hover:text-white duration-150 cursor-pointer`}
                    >
                      {subPath.name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
