import { navs } from "../lib/navs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import type { ProfileRes } from "@/interfaces/profile.interface";
import Messages from "@/svgs/Messages";
import Save from "@/svgs/Save";
import Car from "@/svgs/Car";
import { LanguageDropdown } from "./LanguageDropdown";

interface HeaderMenuProps {
  isOpen: boolean;
  userProfile: ProfileRes | null;
}

const HeaderMenu = ({ isOpen, userProfile }: HeaderMenuProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className={`fixed md:absolute text-white md:rounded-lg bg-black left-0 right-0 md:right-0 md:left-auto w-full md:w-75 p-5 top-21.25 md:top-[120%] bottom-0 md:bottom-auto h-[calc(100vh-85px)] md:h-auto md:max-h-[80vh] transition-all duration-300 ease-out overflow-y-auto ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <ul>
        {navs.map((n) => {
          return (
            <li
              key={n.titleKey}
              className="flex items-center justify-between text-[20px] md:text-lg p-5 md:p-3 hover:bg-gray-600 cursor-pointer rounded-lg duration-150"
            >
              <div> {t(n.titleKey)}</div>
              {n.isDropdown && <MdOutlineKeyboardArrowRight />}
            </li>
          );
        })}
      </ul>

      {/* Language Switcher Dropdown */}
      <LanguageDropdown />

      {userProfile ? (
        <>
          <Button
            size="none"
            className="bg-primary text-white w-full font-dm text-[15px] cursor-pointer rounded-xl mt-5 flex items-center justify-center gap-2.5 py-5 font-medium px-6.25"
          >
            {t("common.add")}
            <Car className="size-5" />
          </Button>

          <div className="flex items-center justify-between mt-5 pt-5 border-t border-gray-700">
            <Messages
              className="w-7 h-7 cursor-pointer text-white"
              opacity={1}
            />
            <Save className="w-6 h-6 cursor-pointer text-white" opacity={1} />
            <div className="relative cursor-pointer">
              <FaRegBell className="w-6 h-6 text-white" />
              <div className="absolute top-0 right-0 bg-danger w-2.5 h-2.5 rounded-full text-white text-[8px] flex items-center justify-center">
                1
              </div>
            </div>
            <div className="w-11 h-11 rounded-md bg-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors duration-200">
              <IoPersonOutline className="w-6 h-6 text-white" />
            </div>
          </div>
        </>
      ) : (
        <>
          <Button
            onClick={() => navigate("/auth")}
            size="none"
            className="bg-primary self-start text-white w-full font-dm text-[15px] cursor-pointer rounded-xl mt-5 flex items-center gap-2.5 py-5 font-medium px-6.25"
          >
            <div>{t("common.login")}</div>
          </Button>
          <Button
            size="none"
            onClick={() => navigate("/auth")}
            className="bg-trasparent border border-white self-start text-white w-full font-dm text-[15px] cursor-pointer rounded-xl mt-5 flex items-center gap-2.5 py-5 font-medium px-6.25"
          >
            <div>{t("common.registration")}</div>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderMenu;
