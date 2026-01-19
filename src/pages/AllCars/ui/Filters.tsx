import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectGroup,
  SearchableSelectItem,
  SearchableSelectLabel,
  SearchableSelectTrigger,
  SearchableSelectValue,
} from "@/components/ui/searchable-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

import { useGetRegions } from "@/api/regions/useGetRegions";
import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";
import { useGetDriveTypeClient } from "@/api/carSpecsClient/useGetDriveTypeClient";
import { useGetTransmissionClient } from "@/api/carSpecsClient/useGetTransmissionClient";
import { useGetFuelTypeClient } from "@/api/carSpecsClient/useGetFuelTypeClient";
import { useGetCharsClient } from "@/api/carSpecsClient/useGetCharsClient";
import { useGetColorsClient } from "@/api/carSpecsClient/useGetColorsClient";

interface FiltersProps {
  postsCount: number;
  postsLoading: boolean;
}

const Filters = ({ postsCount, postsLoading }: FiltersProps) => {
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [brand, setBrand] = useState(searchParams.get("carMarkId") || "");
  const [model, setModel] = useState(searchParams.get("carModelId") || "");
  const [cityRegion, setCityRegion] = useState(
    searchParams.get("cityId") || "",
  );
  const [condition, setCondition] = useState(
    searchParams.get("carConditionId") || "",
  );
  const [driveType, setDriveType] = useState(
    searchParams.get("driveTypeId") || "",
  );
  const [transmission, setTransmission] = useState(
    searchParams.get("transmissionId") || "",
  );
  const [fuelType, setFuelType] = useState(
    searchParams.get("fuelTypeId") || "",
  );
  const [color, setColor] = useState(searchParams.get("colorId") || "");
  const [yearFrom, setYearFrom] = useState(searchParams.get("yearFrom") || "");
  const [yearTo, setYearTo] = useState(searchParams.get("yearTo") || "");
  const [minPrice, setMinPrice] = useState(
    searchParams.get("priceFrom") || "0",
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("priceTo") || "100000",
  );
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("priceFrom") || 0),
    Number(searchParams.get("priceTo") || 100000),
  ]);
  const [citySearch, setCitySearch] = useState("");

  // Fetch data from APIs
  const { data: regions } = useGetRegions(i18n.language);
  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);
  const { data: driveTypes } = useGetDriveTypeClient(i18n.language);
  const { data: transmissions } = useGetTransmissionClient(i18n.language);
  const { data: fuelTypes } = useGetFuelTypeClient(i18n.language);
  const { data: chars } = useGetCharsClient(i18n.language);
  const { data: colors } = useGetColorsClient(i18n.language);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (brand) params.set("carMarkId", brand);
    if (model) params.set("carModelId", model);
    if (cityRegion) params.set("cityId", cityRegion);
    if (fuelType) params.set("fuelTypeId", fuelType);
    if (driveType) params.set("driveTypeId", driveType);
    if (transmission) params.set("transmissionId", transmission);
    if (condition) params.set("carConditionId", condition);
    if (color) params.set("colorId", color);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    if (minPrice && minPrice !== "0") params.set("priceFrom", minPrice);
    if (maxPrice && maxPrice !== "100000") params.set("priceTo", maxPrice);

    setSearchParams(params, { replace: true });
  }, [
    brand,
    model,
    cityRegion,
    fuelType,
    driveType,
    transmission,
    condition,
    color,
    yearFrom,
    yearTo,
    minPrice,
    maxPrice,
    setSearchParams,
  ]);

  const filteredRegions = useMemo(() => {
    if (!regions?.data?.rows) return [];

    if (!citySearch.trim()) return regions.data.rows;

    const searchLower = citySearch.toLowerCase();
    return regions.data.rows
      .map((region) => ({
        ...region,
        cities: region.cities.filter((city) =>
          city.name.toLowerCase().includes(searchLower),
        ),
      }))
      .filter(
        (region) =>
          region.cities.length > 0 ||
          region.name.toLowerCase().includes(searchLower),
      );
  }, [regions, citySearch]);

  const years = [
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
  ];

  return (
    <div className="w-[25%] flex flex-col gap-4">
      <div className="w-full border border-grayBorder rounded-2xl p-5">
        {/* Регион / Город */}
        <div className="relative">
          <SearchableSelect value={cityRegion} onValueChange={setCityRegion}>
            <SearchableSelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Регион / Город
                </span>
                <SearchableSelectValue placeholder="Выберите город" />
              </div>
            </SearchableSelectTrigger>
            <SearchableSelectContent
              className="rounded-xl bg-white border border-[#7B3FF2]/20"
              onSearchChange={setCitySearch}
              searchPlaceholder="Поиск города..."
            >
              {filteredRegions.length > 0 ? (
                filteredRegions.map((region) => (
                  <SearchableSelectGroup key={region.id}>
                    <SearchableSelectLabel className="text-gray-700 font-medium">
                      {region.name}
                    </SearchableSelectLabel>
                    {region.cities.map((city) => (
                      <SearchableSelectItem
                        key={city.id}
                        value={city.id}
                        className="text-base font-rale cursor-pointer pl-6"
                      >
                        {city.name}
                      </SearchableSelectItem>
                    ))}
                  </SearchableSelectGroup>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-gray-500">
                  Город не найден
                </div>
              )}
            </SearchableSelectContent>
          </SearchableSelect>
          {cityRegion && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCityRegion("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Состояние */}
        <div className="relative">
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Состояние
                </span>
                <SelectValue placeholder="Выберите состояние" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              {conditions?.data.rows.map((cond) => (
                <SelectItem
                  key={cond.id}
                  value={cond.id}
                  className="text-base font-rale cursor-pointer"
                >
                  {cond.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {condition && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCondition("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Марка */}
        <div className="relative">
          <Select value={brand} onValueChange={setBrand}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Марка
                </span>
                <SelectValue placeholder="Выберите марку" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="placeholder"
                className="text-base font-rale cursor-pointer"
              >
                Все
              </SelectItem>
            </SelectContent>
          </Select>
          {brand && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBrand("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Модель */}
        <div className="relative">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Модель
                </span>
                <SelectValue placeholder="Выберите модель" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="placeholder"
                className="text-base font-rale cursor-pointer"
              >
                Все
              </SelectItem>
            </SelectContent>
          </Select>
          {model && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModel("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Year Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Select value={yearFrom} onValueChange={setYearFrom}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Мин. год
                  </span>
                  <SelectValue placeholder="Год" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={`${year}-01-01`}
                    className="text-base font-rale cursor-pointer"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {yearFrom && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setYearFrom("");
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                <IoCloseCircle size={20} />
              </button>
            )}
          </div>

          <div className="relative">
            <Select value={yearTo} onValueChange={setYearTo}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Макс. год
                  </span>
                  <SelectValue placeholder="Год" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={`${year}-12-31`}
                    className="text-base font-rale cursor-pointer"
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {yearTo && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setYearTo("");
                }}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
              >
                <IoCloseCircle size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Тип привода */}
        <div className="relative">
          <Select value={driveType} onValueChange={setDriveType}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Тип привода
                </span>
                <SelectValue placeholder="Выберите тип" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              {driveTypes?.data.rows.map((dt) => (
                <SelectItem
                  key={dt.id}
                  value={dt.id}
                  className="text-base font-rale cursor-pointer"
                >
                  {dt.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {driveType && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDriveType("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Price Range */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">Цена</div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textPrimary font-dm text-sm">
                $
              </span>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPriceRange([Number(e.target.value), priceRange[1]]);
                }}
                className="pl-7 pr-4 py-2.5 rounded-xl border border-grayBorder bg-white font-dm text-sm text-textPrimary"
                placeholder="Мин. цена"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textPrimary font-dm text-sm">
                $
              </span>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPriceRange([priceRange[0], Number(e.target.value)]);
                }}
                className="pl-7 pr-4 py-2.5 rounded-xl border border-grayBorder bg-white font-dm text-sm text-textPrimary"
                placeholder="Макс. цена"
              />
            </div>
          </div>

          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              setMinPrice(value[0].toString());
              setMaxPrice(value[1].toString());
            }}
            max={100000}
            step={1000}
            className="w-full **:data-[slot=slider-track]:h-[3px] **:data-[slot=slider-track]:bg-headerBorder **:data-[slot=slider-range]:bg-textPrimary"
          />
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Трансмиссия */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">
            Коробка передач
          </div>

          <div className="flex flex-col gap-4">
            {transmissions?.data.rows.map((trans) => (
              <div key={trans.id} className="flex items-center gap-3">
                <Checkbox
                  checked={transmission === trans.id}
                  onCheckedChange={(checked) => {
                    setTransmission(checked ? trans.id : "");
                  }}
                  className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
                />
                <label className="text-base font-rale text-textPrimary cursor-pointer">
                  {trans.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Тип топлива */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">
            Тип топлива
          </div>

          <div className="flex flex-col gap-4">
            {fuelTypes?.data.rows.map((fuel) => (
              <div key={fuel.id} className="flex items-center gap-3">
                <Checkbox
                  checked={fuelType === fuel.id}
                  onCheckedChange={(checked) => {
                    setFuelType(checked ? fuel.id : "");
                  }}
                  className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
                />
                <label className="text-base font-rale text-textPrimary cursor-pointer">
                  {fuel.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Цвет */}
        <div className="relative">
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Цвет
                </span>
                <SelectValue placeholder="Выберите цвет" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              {colors?.data.rows.map((col) => (
                <SelectItem
                  key={col.id}
                  value={col.id}
                  className="text-base font-rale cursor-pointer capitalize"
                >
                  {col.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {color && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setColor("");
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            >
              <IoCloseCircle size={20} />
            </button>
          )}
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Характеристики */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">
            Характеристики
          </div>

          <div className="flex flex-col gap-4">
            {chars?.data.rows.slice(0, 8).map((char) => (
              <div key={char.id} className="flex items-center gap-3">
                <Checkbox className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!" />
                <label className="text-base font-rale text-textPrimary cursor-pointer">
                  {char.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {chars?.data.rows && chars.data.rows.length > 8 && (
          <div className="font-dm text-base text-primary mt-5 cursor-pointer">
            Показать еще {chars.data.rows.length - 8}
          </div>
        )}
      </div>

      <div className="text-base font-rale text-textPrimary">
        Найдено: {postsLoading ? "..." : postsCount} авто
      </div>
    </div>
  );
};

export default Filters;
