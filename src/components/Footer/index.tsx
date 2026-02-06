import { BsApple, BsGooglePlay } from "react-icons/bs";
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import LogoWhite from "@/svgs/LogoWhite";
import logoImage from "@/assets/header/logo.png";
import land from "@assets/images/landscape.png";

import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BsArrowUpRight } from "react-icons/bs";

import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      return t("footer.newsletter.emailRequired");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return t("footer.newsletter.emailInvalid");
    }
    return "";
  };

  const handleSubscribe = () => {
    const error = validateEmail(email);
    setEmailError(error);

    if (!error) {
      setEmail("");
      setEmailError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError("");
    }
  };

  return (
    <>
      {location.pathname === "/all-cars" && (
        <div className="bg-textPrimary flex h-[600px] mt-[200px]">
          <div className="w-[50%] h-full">
            <img src={land} alt="" className="object-cover h-full" />
          </div>
          <div className="w-[40%] mx-auto flex items-center flex-col justify-center gap-10 h-full text-white">
            <div className="text-[40px] font-rale font-bold">
              {t("footer.dealersBanner.title")}
            </div>
            <p className="font-dm text-base ">
              {t("footer.dealersBanner.description")} 
            </p>
            <Button
              size="none"
              className="bg-transparent self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
            >
              <div>{t("footer.dealersBanner.fullList")}</div>
              <BsArrowUpRight />
            </Button>
          </div>
        </div>
      )}

      <footer
        className={`bg-black text-white ${
          location.pathname === "/all-cars" || location.pathname === "/auth"
            ? "mt-0"
            : "mt-[200px]"
        } `}
      >
        {/* Newsletter Section */}
        <div className="px-4 md:px-8 lg:px-12 2xl:px-[118px] py-12 border-b border-white/15">
          <p className="text-[15px] md:text-left text-center font-dm mb-6">
            {t("footer.newsletter.title")}
          </p>
          <div className="flex lg:flex-row flex-col lg:gap-0 gap-6 lg:items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-[35px] h-[35px]">
                <img
                  src={logoImage}
                  alt="logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <LogoWhite />
            </div>

            {/* Newsletter Form */}
            <div className="flex flex-col gap-2">
              <div
                className={`bg-white/10 rounded-xl px-6 py-4 w-full md:w-[450px] flex items-center justify-between ${emailError ? "border border-red-500" : ""}`}
              >
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder={t("footer.newsletter.placeholder")}
                  className="bg-transparent border-none outline-none text-white placeholder:text-white font-dm text-[15px] flex-1"
                />
                <Button
                  size="none"
                  onClick={handleSubscribe}
                  className="bg-primary text-white font-dm text-[15px] font-medium px-[30px] py-5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {t("footer.newsletter.subscribe")}
                </Button>
              </div>
              {emailError && (
                <p className="text-red-400 text-sm font-dm ml-2">
                  {emailError}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-12 2xl:px-[118px] py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.contact.title")}
              </h3>
              <div className="space-y-6 flex md:block flex-wrap">
                <div className="flex items-start gap-3 w-full">
                  <MdLocationOn
                    className="text-white mt-1 shrink-0"
                    size={20}
                  />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">{t("footer.contact.address")}</p>
                    <p className="text-white/80">
                      Magtymguly şaýoly, No:88,
                      <br />
                      Bagtyýarlyk etraby, Ashgabat
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdEmail className="text-white mt-1 shrink-0" size={20} />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">{t("footer.contact.email")}</p>
                    <p className="text-white/80">info@carciti.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdPhone className="text-white mt-1 shrink-0" size={20} />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">{t("footer.contact.phone")}</p>
                    <p className="text-white/80">+90 (533) 888 47 06</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="col-span-1 md:block hidden">
              <h3 className="text-[20px] font-dm font-medium mb-6">{t("footer.menu.title")}</h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="text-primary cursor-pointer hover:opacity-80">
                  <Link to="/about">{t("footer.menu.about")}</Link>
                </li>

                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link to="/news">{t("footer.menu.blog")}</Link>
                </li>

                <li className="cursor-pointer hover:text-primary transition-colors">
                  <Link to="/contact">{t("footer.menu.contacts")}</Link>
                </li>
              </ul>
            </div>

            {/* Auto Dealers */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.dealers.title")}
              </h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Toyota
                </li>

                <li className="cursor-pointer hover:text-primary transition-colors">
                  BMW
                </li>

                <li className="cursor-pointer hover:text-primary transition-colors">
                  Mercedes Benz
                </li>

                <li className="cursor-pointer hover:text-primary transition-colors">
                  Kia
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Hyundai
                </li>
              </ul>
            </div>

            {/* Car Types */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.carTypes.title")}
              </h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.sedan")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.hatchback")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.suv")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.minivan")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.van")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.pickup")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.electric")}
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  {t("footer.carTypes.hybrid")}
                </li>
              </ul>
            </div>

            {/* Our App */}
            <div className="col-span-4 md:block flex items-center flex-col md:col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.app.title")}
              </h3>
              <div className="space-y-4 w-full">
                <div className="bg-white/7 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <BsApple size={30} />
                  <div className="font-dm">
                    <p className="text-[13px] text-white/80">{t("footer.app.downloadOn")}</p>
                    <p className="text-[15px] font-medium">{t("footer.app.appStore")}</p>
                  </div>
                </div>
                <div className="bg-white/7 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <BsGooglePlay size={25} />
                  <div className="font-dm">
                    <p className="text-[13px] text-white/80">{t("footer.app.getItOn")}</p>
                    <p className="text-[15px] font-medium">{t("footer.app.googlePlay")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="col-span-1 md:col-span-1 md:block flex items-center flex-col">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.social.title")}
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaTelegramPlane size={20} />
                </div>
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaWhatsapp size={20} />
                </div>
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaInstagram size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-4 md:px-8 lg:px-12 2xl:px-[118px] py-6 border-t border-white/15">
          <div className="flex items-center md:flex-row flex-col md:gap-0 gap-4 justify-between">
            <p className="font-dm text-[15px] text-white/80">
              {t("footer.bottom.copyright")}
            </p>
            <div className="flex items-center gap-3 font-dm text-[15px]">
              <span className="cursor-pointer hover:text-primary transition-colors">
                {t("footer.bottom.terms")}
              </span>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <span className="cursor-pointer hover:text-primary transition-colors">
                {t("footer.bottom.privacy")}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
