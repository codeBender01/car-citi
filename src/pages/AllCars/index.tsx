import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import CarCard from "@/components/CarCard";
import Filters from "./ui/Filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useGetPosts } from "@/api/posts";

const AllCars = () => {
  const [searchParams] = useSearchParams();
  const { i18n, t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all filter parameters from URL
  const brand = searchParams.get("carMarkId") || undefined;
  const model = searchParams.get("carModelId") || undefined;
  const cityRegion = searchParams.get("cityId") || undefined;
  const condition = searchParams.get("carConditionId") || undefined;
  const driveType = searchParams.get("driveTypeId") || undefined;
  const transmission = searchParams.get("transmissionId") || undefined;
  const fuelType = searchParams.get("fuelTypeId") || undefined;
  const color = searchParams.get("colorId") || undefined;
  const category = searchParams.get("categoryId") || undefined;
  const yearFrom = searchParams.get("yearFrom") || undefined;
  const yearTo = searchParams.get("yearTo") || undefined;
  const priceFrom = searchParams.get("priceFrom")
    ? Number(searchParams.get("priceFrom"))
    : undefined;
  const priceTo = searchParams.get("priceTo")
    ? Number(searchParams.get("priceTo"))
    : undefined;

  const { data: posts, isLoading: postsLoading } = useGetPosts({
    carMarkId: brand,
    carModelId: model,
    cityId: cityRegion,
    fuelTypeId: fuelType,
    driveTypeId: driveType,
    transmissionId: transmission,
    carConditionId: condition,
    categoryId: category,
    colorId: color,
    yearFrom: yearFrom,
    yearTo: yearTo,
    priceFrom: priceFrom,
    priceTo: priceTo,
    "Accept-Language": i18n.language,
  });

  const totalCount = posts?.data?.count || 0;
  const displayedCount = posts?.data?.rows?.length || 0;

  return (
    <div className="pt-[160px] md:pt-[180px] pb-20 px-4 md:px-12 lg:px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <Link to="/home" className="text-primary hover:underline">
          {t("allCars.breadcrumb.home")}
        </Link>{" "}
        / <span>{t("allCars.breadcrumb.search")}</span>
      </div>
      <div className="h2 mt-5">
        {t("allCars.searchResults")}{" "}
        <span className="text-primary border-b-2 border-primary">
          {postsLoading ? "..." : totalCount}
        </span>{" "}
        {t("allCars.vehicles")}
      </div>

      {/* Mobile Filter Button */}
      <div className="mt-8 lg:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button
              size="none"
              className="w-full bg-primary text-white font-dm text-[15px] rounded-xl py-4 px-6 flex items-center justify-center gap-2"
            >
              <HiAdjustmentsHorizontal className="w-5 h-5" />
              {t("allCars.filters")}
              {totalCount > 0 && ` (${totalCount})`}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[400px] bg-white overflow-y-auto z-[10001]"
          >
            <SheetHeader>
              <SheetTitle className="text-textPrimary font-rale text-xl">
                {t("allCars.filters")}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <Filters postsCount={totalCount} postsLoading={postsLoading} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 lg:mt-16 flex gap-6">
        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:block">
          <Filters postsCount={totalCount} postsLoading={postsLoading} />
        </div>

        {/* Cars Grid */}
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-dm text-base gap-4">
            <div className="text-textPrimary">
              {t("allCars.showing", { from: 1, to: displayedCount, total: totalCount })}
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-textGray">{t("allCars.sortBy")}</span>
              <span className="flex items-center gap-2">
                {t("allCars.new")}
                <FiChevronDown />
              </span>
            </div>
          </div>

          <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-7">
            {postsLoading ? (
              <div className="col-span-full text-center py-16">
                <p className="font-dm text-textGray">{t("allCars.loading")}</p>
              </div>
            ) : posts?.data.rows && posts.data.rows.length > 0 ? (
              posts.data.rows.map((car, idx) => {
                return <CarCard car={car} key={idx} />;
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="font-dm text-textGray text-lg">
                  {t("allCars.noResults")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;
