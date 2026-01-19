import { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navs } from "./lib/navs";
import { pathnames } from "./lib/whiteLogoNavs";

import logoImage from "../../assets/header/logo.png";
import Logo from "../../svgs/Logo";
import LogoWhiteHeader from "@/svgs/LogoWhiteHeader";
import Car from "@/svgs/Car";
import Messages from "@/svgs/Messages";
import Save from "@/svgs/Save";
import { LanguageSwitcher } from "../LanguageSwitcher";

import { RiArrowDownSLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

import { useGetProfile } from "@/api/auth/useGetProfile";

import { Button } from "../ui/button";
import HeaderMenu from "./ui/HeaderMenu";

const Header = () => {
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const { data: profile } = useGetProfile();

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
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isWhiteLogoPathname = useMemo(() => {
    return pathnames.some((p) => p === location.pathname);
  }, [location]);

  const isAuthPathname = location.pathname === "/auth";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[10000] px-12 2xl:px-[118px] py-[25px] w-full border-b border-headerBorder flex items-center justify-between transition-colors duration-300 max-lg:bg-black ${
        isFullyScrolled || isAuthPathname || isMenuOpen
          ? "bg-[#000000]"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <div className="w-[35px] h-[35px] ">
            <img
              src={logoImage}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:hidden">
            <LogoWhiteHeader />
          </div>
          <div className="hidden lg:block">
            {isWhiteLogoPathname || isFullyScrolled || isMenuOpen ? (
              <LogoWhiteHeader />
            ) : (
              <Logo />
            )}
          </div>
        </div>

        <div className="ml-12 hidden xl:flex">
          <LanguageSwitcher isDark={isFullyScrolled || isWhiteLogoPathname} />
        </div>
      </div>

      <nav className="hidden xl:block">
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
              <span>{t(nav.titleKey)}</span>
              {nav.isDropdown && <RiArrowDownSLine size={16} />}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center">
        {profile ? (
          <Button
            onClick={() => [navigate("/dashboard/posted")]}
            size="none"
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl hidden xl:flex items-center gap-2.5 py-4 px-[25px]"
          >
            {t("common.add")}
            <Car className="size-5" />
          </Button>
        ) : null}

        {profile ? (
          <div className="hidden xl:flex items-center gap-[18px] ml-7">
            <Messages
              className={`w-7 h-7 cursor-pointer transition-colors duration-300 max-lg:text-white ${
                isFullyScrolled || isWhiteLogoPathname ? "text-white" : ""
              }`}
              opacity={
                isFullyScrolled || isWhiteLogoPathname || isMobileView
                  ? 1
                  : 0.25
              }
            />
            <Save
              className={`w-6 h-6 cursor-pointer transition-colors duration-300 max-lg:text-white ${
                isFullyScrolled || isWhiteLogoPathname ? "text-white" : ""
              }`}
              opacity={
                isFullyScrolled || isWhiteLogoPathname || isMobileView
                  ? 1
                  : 0.25
              }
            />
            <div className="relative cursor-pointer ">
              <FaRegBell
                className={`w-6 h-6 max-lg:text-white ${
                  isFullyScrolled || isWhiteLogoPathname
                    ? "text-white"
                    : "text-gray-400"
                }`}
              />
              <div className="absolute top-0 right-0 bg-danger w-2.5 h-2.5 rounded-full text-white text-[8px] flex items-center justify-center">
                1
              </div>
            </div>

            <div
              className={`w-11 h-11 rounded-md flex items-center justify-center cursor-pointer transition-colors duration-200 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <IoPersonOutline
                className={`w-6 h-6 ${
                  isFullyScrolled || isWhiteLogoPathname
                    ? "text-white"
                    : "text-gray-600"
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="hidden xl:flex items-center gap-2 ml-7">
            <IoPersonOutline className="size-5 text-textGraySec" />

            <span
              className={`font-dm font-medium text-[15px] cursor-pointer hover:opacity-70 transition-all duration-300 ${
                isFullyScrolled || isWhiteLogoPathname
                  ? "text-white"
                  : "text-textGraySec"
              }`}
              onClick={() => navigate("/auth")}
            >
              {t("common.login")}
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
              {t("common.registration")}
            </span>
          </div>
        )}

        <div
          ref={menuRef}
          className="flex relative items-center gap-[18px] ml-10 cursor-pointer xl:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="relative w-5 h-5">
            <div
              className={`absolute left-0 w-5 h-0.5 transition-all duration-300 max-lg:bg-white ${
                isFullyScrolled || isWhiteLogoPathname || isMenuOpen
                  ? "bg-white"
                  : "bg-textPrimary"
              } ${
                isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[5px]"
              }`}
            ></div>
            <div
              className={`absolute left-0 w-5 h-0.5 transition-all duration-300 max-lg:bg-white ${
                isFullyScrolled || isWhiteLogoPathname || isMenuOpen
                  ? "bg-white"
                  : "bg-textPrimary"
              } ${
                isMenuOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45"
                  : "top-[13px]"
              }`}
            ></div>
          </div>
          <span
            className={`font-dm font-medium text-[15px] transition-colors duration-300 max-lg:text-white ${
              isFullyScrolled || isWhiteLogoPathname || isMenuOpen
                ? "text-white"
                : "text-textPrimary"
            }`}
          >
            {t("common.menu")}
          </span>

          <HeaderMenu
            userProfile={profile ? profile?.data : null}
            isOpen={isMenuOpen}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
