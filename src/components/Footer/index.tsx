import { BsApple, BsGooglePlay } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Button } from "../ui/button";
import LogoWhite from "@/svgs/LogoWhite";
import logoImage from "@/assets/header/logo.png";
import land from "@assets/images/landscape.png";

import { useLocation } from "react-router-dom";

import { BsArrowUpRight } from "react-icons/bs";

import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/all-cars" && (
        <div className="bg-textPrimary flex h-[600px] mt-[200px]">
          <div className="w-[50%] h-full">
            <img src={land} alt="" className="object-cover h-full" />
          </div>
          <div className="w-[40%] mx-auto flex items-center flex-col justify-center gap-10 h-full text-white">
            <div className="text-[40px] font-rale font-bold">
              Локальные автодилеры и лучшие предложения
            </div>
            <p className="font-dm text-base ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. 
            </p>
            <Button
              size="none"
              className="bg-transparent self-start text-white font-dm text-[15px] cursor-pointer rounded-xl w-fit flex items-center gap-2.5 py-[22.5px] font-medium px-[25px] border border-white"
            >
              <div>Весь список</div>
              <BsArrowUpRight />
            </Button>
          </div>
        </div>
      )}

      <footer
        className={`bg-black text-white ${
          location.pathname === "/all-cars" ? "mt-0" : "mt-[200px]"
        } `}
      >
        {/* Newsletter Section */}
        <div className="px-12 2xl:px-[118px] py-12 border-b border-white/15">
          <p className="text-[15px] font-dm mb-6">
            Подписывайтесь на рассылку что бы быть в курсе всех событий и акций
          </p>
          <div className="flex items-center justify-between">
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
            <div className="relative">
              <div className="bg-white/10 rounded-xl px-6 py-4 w-[450px] flex items-center justify-between">
                <input
                  type="email"
                  placeholder="Э-почта"
                  className="bg-transparent border-none outline-none text-white placeholder:text-white font-dm text-[15px] flex-1"
                />
                <Button
                  size="none"
                  className="bg-primary text-white font-dm text-[15px] font-medium px-[30px] py-5 rounded-xl"
                >
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="px-12 2xl:px-[118px] py-16">
          <div className="grid grid-cols-6 gap-8">
            {/* Contact Information */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                Для связи
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MdLocationOn
                    className="text-white mt-1 shrink-0"
                    size={20}
                  />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">Адрес</p>
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
                    <p className="font-medium mb-1">Почта</p>
                    <p className="text-white/80">info@carciti.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdPhone className="text-white mt-1 shrink-0" size={20} />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">Телефон</p>
                    <p className="text-white/80">+90 (533) 888 47 06</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">Меню</h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="text-primary cursor-pointer hover:opacity-80">
                  О компании
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Подобрать авто
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Вакансии
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Полезное
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Блог
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  FAQ
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Поддержка
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Контакты
                </li>
              </ul>
            </div>

            {/* Auto Dealers */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                Авто Дилеры
              </h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Toyota
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Audi
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  BMW
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Honda
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Mercedes Benz
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Jaguar
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Opel
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Hundai
                </li>
              </ul>
            </div>

            {/* Car Types */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                Типы Авто
              </h3>
              <ul className="space-y-3 font-dm text-[15px]">
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Пикап
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Купе
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Седан
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  SUV
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Хэтчбек
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Электрические
                </li>
                <li className="cursor-pointer hover:text-primary transition-colors">
                  Гибридные
                </li>
              </ul>
            </div>

            {/* Our App */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                Наше приложение
              </h3>
              <div className="space-y-4">
                <div className="bg-white/7 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <BsApple size={30} />
                  <div className="font-dm">
                    <p className="text-[13px] text-white/80">Download on the</p>
                    <p className="text-[15px] font-medium">Apple Store</p>
                  </div>
                </div>
                <div className="bg-white/7 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <BsGooglePlay size={25} />
                  <div className="font-dm">
                    <p className="text-[13px] text-white/80">Get in on</p>
                    <p className="text-[15px] font-medium">Google Play</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                Наши соц. сети
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaFacebookF size={14} />
                </div>
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaInstagram size={14} />
                </div>
                <div className="bg-white/7 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                  <FaLinkedinIn size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-12 2xl:px-[118px] py-6 border-t border-white/15">
          <div className="flex items-center justify-between">
            <p className="font-dm text-[15px] text-white/80">
              © 2025 Carciti.com. Все права защищены
            </p>
            <div className="flex items-center gap-3 font-dm text-[15px]">
              <span className="cursor-pointer hover:text-primary transition-colors">
                Правила
              </span>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <span className="cursor-pointer hover:text-primary transition-colors">
                Условия конфиденциальности
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
