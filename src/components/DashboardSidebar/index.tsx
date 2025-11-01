import { Button } from "../ui/button";
import { LuPlus } from "react-icons/lu";

import { sideNavs } from "./lib/sideNavs";

import { useNavigate, useLocation } from "react-router-dom";

const DahsboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="px-[30px] py-[60px] max-w-[300px]">
      <Button
        size="none"
        className="text-white bg-transparent hover:bg-white hover:text-darkGreen border border-white  font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
      >
        <LuPlus />
        Добавить объявление
      </Button>
      <ul className="mt-[25px] ">
        {sideNavs.map((n) => {
          return (
            <li
              key={n.text}
              onClick={() => {
                navigate(n.path);
              }}
              className={`${
                location.pathname === n.path ? "bg-[#FFFFFF1A]" : ""
              } py-[18px] px-5 flex items-center gap-3.5 text-white font-dm text-base text-nowrap rounded-2xl hover:bg-[#FFFFFF1A] duration-150 cursor-pointer`}
            >
              {n.icon}
              {n.text}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default DahsboardSidebar;
