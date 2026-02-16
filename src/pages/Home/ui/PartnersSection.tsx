import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BsArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { OneUser } from "@/interfaces/auth.interface";
import { BASE_URL } from "@/api";

import "swiper/css";

interface PartnersSectionProps {
  dealers?: OneUser[];
}

const PartnersSection = ({ dealers }: PartnersSectionProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dealersToDisplay = dealers && dealers.length > 0 ? dealers : null;

  if (!dealersToDisplay) return null;

  return (
    <div className="mt-[70px] md:mt-[120px] lg:mt-[300px] mb-10 md:mb-[150px] w-[90%] mx-auto">
      <div className="flex items-center justify-between">
        <div className="font-rale text-[26px] md:text-[40px] text-textPrimary font-bold">
          {t("home.meetOurPartners")}
        </div>
        <div
          onClick={() => navigate("/auto-dealers")}
          className="hidden md:flex cursor-pointer items-center gap-2 font-dm font-medium hover:text-primary transition-colors"
        >
          {t("common.viewAll")}
          <BsArrowUpRight />
        </div>
      </div>

      <div className="mt-[30px] lg:hidden">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2.5}
          breakpoints={{
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
          }}
        >
          {dealersToDisplay.map((dealer) => (
            <SwiperSlide key={dealer.id}>
              <div
                onClick={() => navigate(`/all-cars?dealerId=${dealer.id}`)}
                className="border border-headerBorder rounded-2xl h-[135px] flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
              >
                <div className="w-[45px] h-[45px] md:w-[65px] md:h-[65px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  {dealer.businesProfile?.logo ? (
                    <img
                      src={`${BASE_URL}/${dealer.businesProfile.logo}`}
                      alt={dealer.businesProfile?.name || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-rale font-bold">
                      {dealer.businesProfile?.name?.charAt(0) || "?"}
                    </div>
                  )}
                </div>
                <div className="text-base md:text-lg text-center font-dm font-medium mt-auto px-2 truncate w-full">
                  {dealer.businesProfile?.name || t("autoDealers.unnamed")}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ul className="hidden lg:grid grid-cols-5 mt-[95px] gap-7">
        {dealersToDisplay.map((dealer) => (
          <li
            key={dealer.id}
            onClick={() => navigate(`/all-cars?dealerId=${dealer.id}`)}
            className="border border-headerBorder py-2 rounded-2xl flex-1 flex flex-col items-center justify-center gap-4 py-4 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
          >
            <div className="w-[90px] h-[90px] lg:w-[160px] flex items-center justify-center lg:h-[160px] flex rounded-full overflow-hidden p-2 border border-grayBorder flex-shrink-0">
              {dealer.businesProfile?.logo ? (
                <img
                  src={`${BASE_URL}/${dealer.businesProfile.logo}`}
                  alt={dealer.businesProfile?.name || ""}
                  className=" object-cover rounded-full w-[90px] h-[90px]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-rale font-bold">
                  {dealer.businesProfile?.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
            <div className="text-lg font-dm font-medium mt-auto text-center px-2 truncate w-full">
              {dealer.businesProfile?.name || t("autoDealers.unnamed")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnersSection;
