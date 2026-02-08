import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { BASE_URL } from "@/api";

const AllBrands = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const { data: carMarks, isLoading } = useGetCarMarksClient(
    1,
    100,
    i18n.language,
  );

  const handleBrandClick = (brandId: string) => {
    navigate(`/all-cars?carMarkId=${brandId}`);
  };

  return (
    <div className="pt-[160px] md:pt-[180px] pb-20 px-4 md:px-12 lg:px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <Link to="/home" className="text-primary hover:underline">
          {t("allCars.breadcrumb.home")}
        </Link>{" "}
        / <span>{t("allBrands.breadcrumb")}</span>
      </div>
      <div className="h2 mt-5">{t("allBrands.title")} </div>

      <div className="mt-[50px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7">
        {isLoading ? (
          <div className="col-span-full text-center py-16">
            <p className="font-dm text-textGray">{t("allCars.loading")}</p>
          </div>
        ) : carMarks?.data.rows && carMarks.data.rows.length > 0 ? (
          carMarks.data.rows.map((item) => (
            <div
              key={item.id}
              onClick={() => handleBrandClick(item.id)}
              className="border border-headerBorder rounded-2xl flex flex-col items-center justify-center gap-4 py-6 hover:border-primary text-textPrimary hover:text-primary duration-200 cursor-pointer"
            >
              <img
                src={`${BASE_URL}/${item.logo.url}`}
                alt={item.name}
                className="max-h-[45px] md:max-h-[65px] max-w-[60px] md:max-w-[99px] object-contain"
              />
              <div className="text-base md:text-lg text-center font-dm font-medium mt-auto">
                {item.name}
              </div>
              <div className="text-xs text-gray-500">
                {item.carModels?.length || 0} {t("allBrands.models")}
              </div>
              <button
                className="mt-2 px-4 py-1.5 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#88ba00" }}
              >
                {t("allBrands.details")}
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="font-dm text-textGray text-lg">
              {t("allCars.noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBrands;
