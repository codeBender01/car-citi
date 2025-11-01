import LogoDashboard from "@/svgs/LogoDashboard";
import BurgerMenu from "@/svgs/BurgerMenu";
import { CiSearch } from "react-icons/ci";
import { RiArrowDownSLine } from "react-icons/ri";

import { Input } from "../ui/input";

import { navs } from "../Header/lib/navs";
import rus from "@assets/header/rus.png";

const DashboardHeader = () => {
  return (
    <header className="px-10 py-9 2xl:px-[60px] flex items-center justify-between">
      <div className="flex items-center">
        <LogoDashboard />
        <div className="ml-16 flex gap-8 items-center">
          <BurgerMenu />
          <div className="text-white flex items-center">
            <CiSearch />
            <Input
              className="border-none text-white placeholder:text-white"
              placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <nav className="">
          <ul className="flex items-center gap-[30px]">
            {navs.map((nav) => (
              <li
                key={nav.id}
                className={`flex items-center gap-2.5 text-white font-dm font-medium text-[15px] cursor-pointer hover:opacity-65 duration-150 transition-colors `}
              >
                <span>{nav.title}</span>
                {nav.isDropdown && <RiArrowDownSLine size={16} />}
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-12 text-white flex items-center gap-2">
          <img src={rus} className="w-[26px] h-[26px] rounded-md" alt="" />
          <div
            className={`font-dm font-medium text-[15px] transition-colors duration-300 `}
          >
            Язык
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
