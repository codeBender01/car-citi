import { FiChevronDown } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CarCard from "@/components/CarCard";
import Filters from "./ui/Filters";

import { useGetPosts } from "@/api/posts";

const AllCars = () => {
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();

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
  const priceFrom = searchParams.get("priceFrom") ? Number(searchParams.get("priceFrom")) : undefined;
  const priceTo = searchParams.get("priceTo") ? Number(searchParams.get("priceTo")) : undefined;

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
    <div className="pt-[180px] px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] flex gap-1">
        <span className="text-primary">Домашняя страница</span> /{" "}
        <span>Поиск</span>
      </div>
      <div className="h2 mt-5">
        Результаты поиска{" "}
        <span className="text-primary border-b-2 border-primary">
          {postsLoading ? "..." : totalCount}
        </span>{" "}
        автомобилей
      </div>
      <div className="mt-16 flex justify-between">
        <Filters postsCount={totalCount} postsLoading={postsLoading} />
        <div className="w-[70%]">
          <div className="flex items-center justify-between font-dm text-base">
            <div className="text-textPrimary">
              Показаны от 1 до {displayedCount} из {totalCount} автомобилей
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-textGray">Сортировать по</span>
              <span className="flex items-center gap-2">
                Новые
                <FiChevronDown />
              </span>
            </div>
          </div>

          <div className="mt-[50px] grid grid-cols-3 gap-7">
            {postsLoading ? (
              <div>Загрузка...</div>
            ) : (
              posts?.data.rows.map((car, idx) => {
                return <CarCard car={car} key={idx} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCars;
