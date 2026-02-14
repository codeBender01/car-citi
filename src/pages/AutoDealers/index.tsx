import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsArrowUpRight } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

import { useGetUsers } from "@/api/auth/useGetUsers";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/api";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 10;

const AutoDealers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data: users } = useGetUsers(currentPage, PAGE_SIZE, "Business", search || undefined);

  const dealers = users?.data?.users || [];
  const totalItems = users?.data?.count || 0;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <div className="pt-[160px] md:pt-[180px] pb-20 px-4 md:px-12 lg:px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <Link to="/home" className="text-primary hover:underline">
          {t("allCars.breadcrumb.home")}
        </Link>{" "}
        / <span>{t("autoDealers.breadcrumb")}</span>
      </div>
      <div className="h2 mt-5">{t("autoDealers.title")}</div>

      <div className="mt-8 relative">
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder={t("autoDealers.searchPlaceholder")}
          className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl font-dm text-base text-textPrimary placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="mt-[50px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-7">
        {dealers.length > 0 ? (
          dealers.map((dealer) => (
            <div
              key={dealer.id}
              className="flex flex-col items-center bg-white border border-grayBorder rounded-2xl p-6 gap-4"
            >
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-gray-100">
                {dealer.businesProfile?.logo ? (
                  <img
                    src={`${BASE_URL}/${dealer.userProfile?.avatar}`}
                    alt={dealer.businesProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-rale font-bold">
                    {dealer.businesProfile?.name?.charAt(0) || "?"}
                  </div>
                )}
              </div>

              <div className="text-xl font-rale font-bold text-textPrimary text-center">
                {dealer.businesProfile?.name || t("autoDealers.unnamed")}
              </div>

              {/* {dealer.businesProfile?.baranchAddresses?.[0] && (
                <div className="text-base font-dm text-textPrimary text-center">
                  {dealer.businesProfile.baranchAddresses[0]}
                </div>
              )} */}

              <Button
                size="none"
                onClick={() => navigate(`/all-cars?dealerId=${dealer.id}`)}
                className="w-full bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl flex items-center justify-center gap-2.5 py-[14px] font-medium"
              >
                {t("autoDealers.details")}
                <BsArrowUpRight />
              </Button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="font-dm text-textGray text-lg">
              {t("autoDealers.noResults")}
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={PAGE_SIZE}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AutoDealers;
