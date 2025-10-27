import { useState, useEffect } from "react";
import { navs } from "./lib/navs";

import logoImage from "../../assets/header/logo.png";
import rus from "@assets/header/rus.png";
import Logo from "../../svgs/Logo";
import Car from "@/svgs/Car";
import Messages from "@/svgs/Messages";
import Save from "@/svgs/Save";
import user from "@assets/header/user.png";

import { RiArrowDownSLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";

import { Button } from "../ui/button";

const Header = () => {
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if scrolled to 100% of the page
      const scrolledToBottom = scrollTop + windowHeight >= documentHeight - 10; // 10px threshold
      setIsFullyScrolled(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-12 2xl:px-[118px] py-[25px] w-full border-b border-headerBorder flex items-center justify-between transition-colors duration-300 ${
        isFullyScrolled ? "bg-[#000000]" : "bg-white"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-[35px] h-[35px]">
            <img
              src={logoImage}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <Logo />
        </div>

        {/* Language Selector */}
        <div className="ml-12 flex items-center gap-2">
          <img src={rus} className="w-[26px] h-[26px] rounded-md" alt="" />
          <div className={`font-dm font-medium text-[15px] transition-colors duration-300 ${isFullyScrolled ? "text-white" : "text-black"}`}>Язык</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="">
        <ul className="flex items-center gap-[30px]">
          {navs.map((nav) => (
            <li
              key={nav.id}
              className={`flex items-center gap-2.5 font-dm font-medium text-[15px] cursor-pointer hover:opacity-65 duration-150 transition-colors ${
                isFullyScrolled ? "text-white" : "text-black"
              }`}
            >
              <span>{nav.title}</span>
              {nav.isDropdown && <RiArrowDownSLine size={16} />}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        <Button className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-[22px] px-[25px]">
          Добавить
          <Car className="size-5" />
        </Button>

        <div className="flex items-center gap-[18px] ml-7">
          <Messages className="w-7 h-7 cursor-pointer" />
          <Save className="w-6 h-6 cursor-pointer" />
          <div className="relative cursor-pointer text-gray-400">
            <FaRegBell className="w-6 h-6" />
            <div className="absolute top-0 right-0 bg-danger w-2.5 h-2.5 rounded-full text-white text-[8px] flex items-center justify-center">
              1
            </div>
          </div>

          <div className="w-11 h-11 rounded-md">
            <img src={user} alt="" />
          </div>
        </div>

        {/* Burger Menu */}
        <div className="flex items-center gap-[18px] ml-10 cursor-pointer">
          <div className="flex flex-col gap-1.5">
            <div className={`w-5 h-0.5 transition-colors duration-300 ${isFullyScrolled ? "bg-white" : "bg-textPrimary"}`}></div>
            <div className={`w-5 h-0.5 transition-colors duration-300 ${isFullyScrolled ? "bg-white" : "bg-textPrimary"}`}></div>
          </div>
          <span className={`font-dm font-medium text-[15px] transition-colors duration-300 ${isFullyScrolled ? "text-white" : "text-textPrimary"}`}>
            Меню
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
