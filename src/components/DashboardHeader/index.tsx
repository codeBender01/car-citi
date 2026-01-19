import LogoDashboard from "@/svgs/LogoDashboard";
import BurgerMenu from "@/svgs/BurgerMenu";
import { CiSearch } from "react-icons/ci";
import { RiArrowDownSLine } from "react-icons/ri";

import { Input } from "../ui/input";

import { navs } from "../Header/lib/navs";
import rus from "@assets/header/rus.png";

interface DashboardHeaderProps {
  onMenuClick?: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="px-4 py-6 md:px-6 lg:px-10 2xl:px-15 md:py-9 flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-8 lg:gap-16 flex-1 md:flex-initial">
        <LogoDashboard />
        <div className="flex gap-4 md:gap-8 items-center flex-1 md:flex-initial">
          <button onClick={onMenuClick} className="lg:hidden">
            <BurgerMenu />
          </button>
          <div className="hidden md:flex text-white items-center">
            <CiSearch />
            <Input
              className="border-none text-white placeholder:text-white"
              placeholder="Поиск"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7.5">
            {navs.map((nav) => (
              <li
                key={nav.id}
                className={`flex items-center gap-2.5 text-white font-dm font-medium text-[15px] cursor-pointer hover:opacity-65 duration-150 transition-colors `}
              >
                <span>{nav.titleKey}</span>
                {nav.isDropdown && <RiArrowDownSLine size={16} />}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden md:flex text-white items-center gap-2">
          <img src={rus} className="w-6.5 h-6.5 rounded-md" alt="" />
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
