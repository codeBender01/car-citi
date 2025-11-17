import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navs } from "./lib/navs";
import { pathnames } from "./lib/whiteLogoNavs";

import logoImage from "../../assets/header/logo.png";
import rus from "@assets/header/rus.png";
import Logo from "../../svgs/Logo";
import LogoWhiteHeader from "@/svgs/LogoWhiteHeader";
import Car from "@/svgs/Car";
import Messages from "@/svgs/Messages";
import Save from "@/svgs/Save";
import user from "@assets/header/user.png";

import { RiArrowDownSLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

import { Button } from "../ui/button";

const Header = () => {
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight - 800;

      setIsFullyScrolled(scrollTop >= viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem("userToken");
      setIsLoggedIn(!!userToken);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const isWhiteLogoPathname = useMemo(() => {
    return pathnames.some((p) => p === location.pathname);
  }, [location]);

  const isAuthPathname = location.pathname === "/auth";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-12 2xl:px-[118px] py-[25px] w-full border-b border-headerBorder flex items-center justify-between transition-colors duration-300 ${
        isFullyScrolled || isAuthPathname ? "bg-[#000000]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-[35px] h-[35px] ">
            <img
              src={logoImage}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          {isWhiteLogoPathname || isFullyScrolled ? (
            <LogoWhiteHeader />
          ) : (
            <Logo />
          )}
        </div>

        <div className="ml-12 flex items-center gap-2">
          <img src={rus} className="w-[26px] h-[26px] rounded-md" alt="" />
          <div
            className={`font-dm font-medium text-[15px] transition-colors duration-300 ${
              isFullyScrolled || isWhiteLogoPathname
                ? "text-white"
                : "text-black"
            }`}
          >
            Язык
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="">
        <ul className="flex items-center gap-[30px]">
          {navs.map((nav) => (
            <li
              key={nav.id}
              onClick={() => {
                navigate(nav.path);
              }}
              className={`flex items-center gap-2.5 font-dm font-medium text-[15px] cursor-pointer hover:opacity-65 duration-150 transition-colors ${
                isWhiteLogoPathname || isFullyScrolled
                  ? "text-white"
                  : "text-black"
              }`}
            >
              <span>{nav.title}</span>
              {nav.isDropdown && <RiArrowDownSLine size={16} />}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        <Button
          size="none"
          className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px]"
        >
          Добавить
          <Car className="size-5" />
        </Button>

        {isLoggedIn ? (
          <div className="flex items-center gap-[18px] ml-7">
            <Messages
              className={`w-7 h-7 cursor-pointer transition-colors duration-300 ${
                isFullyScrolled || isWhiteLogoPathname ? "text-white" : ""
              }`}
              opacity={isFullyScrolled || isWhiteLogoPathname ? 1 : 0.25}
            />
            <Save
              className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
                isFullyScrolled || isWhiteLogoPathname ? "text-white" : ""
              }`}
              opacity={isFullyScrolled || isWhiteLogoPathname ? 1 : 0.25}
            />
            <div className="relative cursor-pointer ">
              <FaRegBell
                className={`w-6 h-6 ${
                  isFullyScrolled || isWhiteLogoPathname
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
              <div className="absolute top-0 right-0 bg-danger w-2.5 h-2.5 rounded-full text-white text-[8px] flex items-center justify-center">
                1
              </div>
            </div>

            <div className="w-11 h-11 rounded-md">
              <img src={user} alt="" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-7">
            <IoPersonOutline className="size-5 text-textGraySec" />

            <span
              className={`font-dm font-medium text-[15px] cursor-pointer hover:opacity-70 transition-all duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "text-white"
                  : "text-textGraySec"
              }`}
              onClick={() => navigate("/auth")}
            >
              Логин
            </span>
            <span
              className={`font-dm font-medium text-[15px] transition-colors duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "text-white"
                  : "text-textGraySec"
              }`}
            >
              |
            </span>
            <span
              className={`font-dm font-medium text-[15px] cursor-pointer hover:opacity-70 transition-all duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "text-white"
                  : "text-textGraySec"
              }`}
              onClick={() => navigate("/auth")}
            >
              Регистрация
            </span>
          </div>
        )}

        {/* Burger Menu */}
        <div className="flex items-center gap-[18px] ml-10 cursor-pointer">
          <div className="flex flex-col gap-1.5">
            <div
              className={`w-5 h-0.5 transition-colors duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "bg-white"
                  : "bg-textPrimary"
              }`}
            ></div>
            <div
              className={`w-5 h-0.5 transition-colors duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "bg-white"
                  : "bg-textPrimary"
              }`}
            ></div>
          </div>
          <span
            className={`font-dm font-medium text-[15px] transition-colors duration-300 ${
              isFullyScrolled || isWhiteLogoPathname
                ? "text-white"
                : "text-textPrimary"
            }`}
          >
            Меню
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
