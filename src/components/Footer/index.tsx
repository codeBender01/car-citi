import { BsApple, BsGooglePlay } from "react-icons/bs";
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetSubcategoriesClient } from "@/api/carSpecsClient/useGetSubcategoriesClient";
import DealersBanner from "@/components/DealersBanner";

import { MdEmail } from "react-icons/md";

const Footer = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { data: subcategories } = useGetSubcategoriesClient(i18n.language);

  return (
    <>
      {location.pathname === "/all-cars" && (
        <div className="mt-[200px]">
          <DealersBanner
            title={t("footer.dealersBanner.title")}
            description={t("footer.dealersBanner.description")}
            buttonText={t("footer.dealersBanner.fullList")}
          />
        </div>
      )}

      <footer
        className={`bg-black text-white ${
          location.pathname === "/all-cars" || location.pathname === "/auth"
            ? "mt-0"
            : "mt-[200px]"
        } `}
      >
        {/* Main Footer Content */}
        <div className="px-12 2xl:px-[118px] py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.contact.title")}
              </h3>
              <div className="space-y-6 flex md:block flex-wrap">
                <div className="flex items-start gap-3">
                  <MdEmail className="text-white mt-1 shrink-0" size={20} />
                  <div className="font-dm text-[15px]">
                    <p className="font-medium mb-1">
                      {t("footer.contact.email")}
                    </p>
                    <p className="text-white/80">info@carciti.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="col-span-1 md:block hidden">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.menu.title")}
              </h3>
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
                <li>
                  <Link to="/auto-dealers" className="cursor-pointer hover:text-primary transition-colors">
                    Toyota
                  </Link>
                </li>

                <li>
                  <Link to="/auto-dealers" className="cursor-pointer hover:text-primary transition-colors">
                    BMW
                  </Link>
                </li>

                <li>
                  <Link to="/auto-dealers" className="cursor-pointer hover:text-primary transition-colors">
                    Mercedes Benz
                  </Link>
                </li>

                <li>
                  <Link to="/auto-dealers" className="cursor-pointer hover:text-primary transition-colors">
                    Kia
                  </Link>
                </li>
                <li>
                  <Link to="/auto-dealers" className="cursor-pointer hover:text-primary transition-colors">
                    Hyundai
                  </Link>
                </li>
              </ul>
            </div>

            {/* Car Types */}
            <div className="col-span-1">
              <h3 className="text-[20px] font-dm font-medium mb-6">
                {t("footer.carTypes.title")}
              </h3>
              <ul className="space-y-3 font-dm text-[15px]">
                {subcategories?.data?.rows?.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      to={`/all-cars?subcategoryId=${sub.id}`}
                      className="cursor-pointer hover:text-primary transition-colors"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
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
                    <p className="text-[13px] text-white/80">
                      {t("footer.app.downloadOn")}
                    </p>
                    <p className="text-[15px] font-medium">
                      {t("footer.app.appStore")}
                    </p>
                  </div>
                </div>
                <div className="bg-white/7 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-colors">
                  <BsGooglePlay size={25} />
                  <div className="font-dm">
                    <p className="text-[13px] text-white/80">
                      {t("footer.app.getItOn")}
                    </p>
                    <p className="text-[15px] font-medium">
                      {t("footer.app.googlePlay")}
                    </p>
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
