import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSearchableSelect,
  MultiSearchableSelectContent,
  MultiSearchableSelectGroup,
  MultiSearchableSelectItem,
  MultiSearchableSelectTrigger,
  MultiSearchableSelectValue,
} from "@/components/ui/multi-searchable-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

import { useGetRegions } from "@/api/regions/useGetRegions";

import { CiSearch } from "react-icons/ci";
import { IoCloseCircle } from "react-icons/io5";

import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";
import { useGetDriveTypeClient } from "@/api/carSpecsClient/useGetDriveTypeClient";

import { useGetColorsClient } from "@/api/carSpecsClient/useGetColorsClient";
import { useGetSubcategoriesClient } from "@/api/carSpecsClient/useGetSubcategoriesClient";
import { useGetPosts } from "@/api/posts";
import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { useGetOneCarMarkClient } from "@/api/carMarks/useGetOneCarMarkClient";

const SearchForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "new" | "used">("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [cityRegions, setCityRegions] = useState<string[]>([]);
  const [condition, setCondition] = useState("");
  const [driveType, setDriveType] = useState("");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100000");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [engineVolume, setEngineVolume] = useState("");
  const [color, setColor] = useState("");

  const [citySearch, setCitySearch] = useState("");

  const { data: regions } = useGetRegions(i18n.language);
  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);
  const { data: driveTypes } = useGetDriveTypeClient(i18n.language);

  const { data: colors } = useGetColorsClient(i18n.language);
  const { data: subCats } = useGetSubcategoriesClient(i18n.language);
  const { data: carMarks } = useGetCarMarksClient(1, 100, i18n.language);
  const { data: selectedCarMark } = useGetOneCarMarkClient(brand);

  useEffect(() => {
    if (brand) {
      setModel("");
    }
  }, [brand]);

  // Parse year to YYYY-MM-DD format
  const parsedYear = useMemo(() => {
    if (!year) return { yearFrom: undefined, yearTo: undefined };
    return {
      yearFrom: `${year}-01-01`,
      yearTo: `${year}-12-31`,
    };
  }, [year]);

  const resolveLocations = (values: string[]) => {
    const regionIds: string[] = [];
    const cityIds: string[] = [];
    if (!regions?.data?.rows) return { regionIds, cityIds };

    for (const value of values) {
      const isRegion = regions.data.rows.some((r) => r.id === value);
      if (isRegion) {
        regionIds.push(value);
        continue;
      }
      for (const region of regions.data.rows) {
        const city = region.cities.find((c) => c.id === value);
        if (city) {
          cityIds.push(city.id);
          break;
        }
      }
    }
    return { regionIds, cityIds };
  };

  const handleCityRegionsChange = (newValues: string[]) => {
    if (!regions?.data?.rows) {
      setCityRegions(newValues);
      return;
    }
    const added = newValues.filter((v) => !cityRegions.includes(v));
    const removed = cityRegions.filter((v) => !newValues.includes(v));
    let result = [...newValues];

    for (const id of added) {
      const region = regions.data.rows.find((r) => r.id === id);
      if (region) {
        const cityIds = region.cities.map((c) => c.id);
        result = [...new Set([...result, ...cityIds])];
      }
    }

    for (const id of removed) {
      const region = regions.data.rows.find((r) => r.id === id);
      if (region) {
        const cityIds = new Set(region.cities.map((c) => c.id));
        result = result.filter((v) => !cityIds.has(v));
      }
    }

    setCityRegions(result);
  };

  const resolvedLocations = resolveLocations(cityRegions);

  const { data: posts, isLoading: postsLoading } = useGetPosts({
    carMarkId: brand || undefined,
    carModelId: model || undefined,
    regionId: resolvedLocations.regionIds.length > 0 ? resolvedLocations.regionIds : undefined,
    cityId: resolvedLocations.cityIds.length > 0 ? resolvedLocations.cityIds : undefined,
    driveTypeId: driveType || undefined,
    carConditionId: condition || undefined,
    subcategoryId: bodyType || undefined,
    colorId: color || undefined,
    yearFrom: parsedYear.yearFrom,
    yearTo: parsedYear.yearTo,
    priceFrom: minPrice ? Number(minPrice) : undefined,
    priceTo: maxPrice ? Number(maxPrice) : undefined,
    "Accept-Language": i18n.language,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    const locations = resolveLocations(cityRegions);

    if (brand) params.append("carMarkId", brand);
    if (model) params.append("carModelId", model);
    for (const id of locations.regionIds) params.append("regionId", id);
    for (const id of locations.cityIds) params.append("cityId", id);
    if (driveType) params.append("driveTypeId", driveType);
    if (condition) params.append("carConditionId", condition);
    if (bodyType) params.append("subcategoryId", bodyType);
    if (color) params.append("colorId", color);
    if (engineVolume) params.append("engineVolume", engineVolume);

    if (parsedYear.yearFrom) params.append("yearFrom", parsedYear.yearFrom);
    if (parsedYear.yearTo) params.append("yearTo", parsedYear.yearTo);

    if (minPrice) params.append("priceFrom", minPrice);
    if (maxPrice) params.append("priceTo", maxPrice);

    navigate(`/all-cars?${params.toString()}`);
  };

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

  const tabs = [
    { id: "all" as const, label: t("common.all") },
    { id: "new" as const, label: t("common.new") },
  ];

  const years = ["2024", "2023", "2022", "2021", "2020", "2019"];
  const engineVolumes = ["1.0-1.5", "1.6-2.0", "2.1-3.0", "3.0+"];

  return (
    <div
      className={`lg:mt-[-70px] relative z-30 bg-black lg:bg-white/40 shadow-lg lg:w-[90%] ${isExpanded ? "pb-10" : "pb-4"} lg:rounded-2xl mx-auto`}
    >
      <div className="flex relative rounded-2xl backdrop-blur-md h-[70px]">
        <div className="flex justify-center lg:justify-start gap-8 lg:bg-[#FFFFFF33] px-8 pt-4 w-full lg:w-[75%] lg:rounded-tl-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative cursor-pointer font-rale  font-medium text-base text-white pb-4 transition-colors hover:text-white/80"
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute bottom-[25%] left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-bottom-1 duration-300" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto w-[25%] cursor-pointer hidden lg:flex items-center justify-center font-rale font-medium text-[15px] text-white gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-3.5 h-3.5 flex items-center justify-center">
            <div className="absolute w-3.5 h-0.5 bg-white rounded-lg"></div>
            <div
              className={`absolute w-0.5 h-3.5 bg-white rounded-lg transition-transform duration-300 ${
                isExpanded ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            ></div>
          </div>
          {t("filters.advancedSearch")}
        </button>
      </div>

      <div className="flex">
        <div className="p-[25px] lg:pt-2.5 pl-4 pr-6 bg-white lg:bg-transparent w-[90%] mx-auto rounded-2xl lg:rounded-none lg:w-[75%]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5">
            {/* Марка */}
            <div className="relative">
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                  <div className="flex flex-col gap-2 items-start w-full">
                    <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                      {t("filters.brand")}
                    </span>
                    <SelectValue placeholder={t("filters.chooseBrand")} />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                  {carMarks?.data.rows.map((carMark) => (
                    <SelectItem
                      key={carMark.id}
                      value={carMark.id}
                      className="text-base font-rale cursor-pointer"
                    >
                      {carMark.name}
                    </SelectItem>
                  ))}
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

            {/* Модель */}
            <div className="relative">
              <Select value={model} onValueChange={setModel} disabled={!brand}>
                <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="flex flex-col gap-2 items-start w-full">
                    <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                      {t("filters.model")}
                    </span>
                    <SelectValue
                      placeholder={
                        brand
                          ? t("filters.chooseModel")
                          : t("filters.firstSelectBrand")
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                  {selectedCarMark?.data.carModels?.map((carModel) => (
                    <SelectItem
                      key={carModel.id}
                      value={carModel.id}
                      className="text-base font-rale cursor-pointer"
                    >
                      {carModel.name}
                    </SelectItem>
                  ))}
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

            {/* Год */}
            <div className="relative">
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                  <div className="flex flex-col gap-2 items-start w-full">
                    <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                      {t("filters.minYear")}
                    </span>
                    <SelectValue placeholder={t("filters.chooseYear")} />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                  {years.map((y) => (
                    <SelectItem
                      key={y}
                      value={y}
                      className="text-base font-rale cursor-pointer"
                    >
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {year && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setYear("");
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  <IoCloseCircle size={20} />
                </button>
              )}
            </div>

            <div>
              <div className="text-sm font-medium text-gray-500 font-rale mb-1.5">
                {t("filters.price")}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="relative">
                  <Input
                    type="number"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setPriceRange([Number(e.target.value), priceRange[1]]);
                    }}
                    className="w-full h-[40px] px-3 py-2 border border-[#E1E1E1] rounded-lg bg-white font-dm text-xs text-textPrimary"
                    placeholder={t("filters.minPrice")}
                  />
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setPriceRange([priceRange[0], Number(e.target.value)]);
                    }}
                    className="w-full h-[40px] px-3 py-2 border border-[#E1E1E1] rounded-lg bg-white font-dm text-xs text-textPrimary"
                    placeholder={t("filters.maxPrice")}
                  />
                </div>
              </div>

              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value as [number, number]);
                  setMinPrice(value[0].toString());
                  setMaxPrice(value[1].toString());
                }}
                max={100000}
                step={1000}
                className="w-full **:data-[slot=slider-track]:h-[2px] **:data-[slot=slider-track]:bg-headerBorder **:data-[slot=slider-range]:bg-textPrimary"
              />
            </div>

            <Button
              size="none"
              onClick={handleSearch}
              className="bg-primary text-white font-dm text-sm mt-5 lg:hidden cursor-pointer rounded-xl w-full flex items-center gap-2.5 py-5 font-medium px-[25px]"
            >
              <CiSearch />
              <div>
                {t("filters.searchButton")}{" "}
                <span className="underline">
                  {postsLoading ? "..." : posts?.data?.count || 0}
                </span>{" "}
                {t("filters.cars")}
              </div>
            </Button>

            <div
              className={`hidden lg:contents transition-all duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{ gridColumn: "1 / -1" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5">
                  {/* Тип кузова */}

                  {/* Город / Регион */}
                  <div className="relative">
                    <MultiSearchableSelect
                      values={cityRegions}
                      onValuesChange={handleCityRegionsChange}
                    >
                      <MultiSearchableSelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.cityRegion")}
                          </span>
                          <MultiSearchableSelectValue
                            placeholder={t("filters.chooseCity")}
                            getLabel={(id) => {
                              if (!regions?.data?.rows) return id;
                              for (const r of regions.data.rows) {
                                if (r.id === id) return r.name;
                                const city = r.cities.find((c) => c.id === id);
                                if (city) return city.name;
                              }
                              return id;
                            }}
                          />
                        </div>
                      </MultiSearchableSelectTrigger>
                      <MultiSearchableSelectContent
                        className="rounded-xl bg-white border border-[#7B3FF2]/20"
                        onSearchChange={setCitySearch}
                        searchPlaceholder={t("filters.searchCity")}
                      >
                        {filteredRegions.length > 0 ? (
                          filteredRegions.map((region) => (
                            <MultiSearchableSelectGroup key={region.id}>
                              <MultiSearchableSelectItem
                                value={region.id}
                                className="text-base font-rale cursor-pointer font-medium text-gray-700"
                              >
                                {region.name}
                              </MultiSearchableSelectItem>
                              {region.cities.map((city) => (
                                <MultiSearchableSelectItem
                                  key={city.id}
                                  value={city.id}
                                  className="text-base font-rale cursor-pointer pl-6"
                                >
                                  {city.name}
                                </MultiSearchableSelectItem>
                              ))}
                            </MultiSearchableSelectGroup>
                          ))
                        ) : (
                          <div className="py-6 text-center text-sm text-gray-500">
                            {t("filters.cityNotFound")}
                          </div>
                        )}
                      </MultiSearchableSelectContent>
                    </MultiSearchableSelect>
                    {cityRegions.length > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCityRegions([]);
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div>

                  {/* Состояние */}
                  <div className="relative">
                    <Select value={condition} onValueChange={setCondition}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.condition")}
                          </span>
                          <SelectValue
                            placeholder={t("filters.chooseCondition")}
                          />
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

                  {/* Категория */}
                  {/* <div className="relative">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Категория
                          </span>
                          <SelectValue placeholder="Выберите категорию" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {categories?.data.rows.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                            className="text-base font-rale cursor-pointer"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {category && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategory("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}
                  <div className="relative">
                    <Select value={bodyType} onValueChange={setBodyType}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.bodyType")}
                          </span>
                          <SelectValue placeholder={t("filters.chooseType")} />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {subCats?.data.rows.map((bt) => (
                          <SelectItem
                            key={bt.id}
                            value={bt.id}
                            className="text-base font-rale cursor-pointer"
                          >
                            {bt.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {bodyType && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setBodyType("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div>

                  {/* Тип предложения */}
                  {/* <div className="relative">
                    <Select value={offerType} onValueChange={setOfferType}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Характеристики
                          </span>
                          <SelectValue placeholder="Выберите тип" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {chars?.data.rows.map((char) => (
                          <SelectItem
                            key={char.id}
                            value={char.id}
                            className="text-base font-rale cursor-pointer"
                          >
                            {char.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {offerType && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOfferType("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}

                  {/* Тип привода */}
                  <div className="relative">
                    <Select value={driveType} onValueChange={setDriveType}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.driveType")}
                          </span>
                          <SelectValue placeholder={t("filters.chooseType")} />
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

                  {/* Пробег */}
                  {/* <div className="relative">
                    <Select value={mileage} onValueChange={setMileage}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Пробег
                          </span>
                          <SelectValue placeholder="Выберите пробег" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {mileageRanges.map((mr) => (
                          <SelectItem
                            key={mr}
                            value={mr}
                            className="text-base font-rale cursor-pointer"
                          >
                            {mr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {mileage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMileage("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}

                  {/* Трансмиссия */}
                  {/* <div className="relative">
                    <Select
                      value={transmission}
                      onValueChange={setTransmission}
                    >
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Трансмиссия
                          </span>
                          <SelectValue placeholder="Выберите трансмиссию" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {transmissions?.data.rows.map((trans) => (
                          <SelectItem
                            key={trans.id}
                            value={trans.id}
                            className="text-base font-rale cursor-pointer"
                          >
                            {trans.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {transmission && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTransmission("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}

                  {/* Тип топлива
                  <div className="relative">
                    <Select value={fuelType} onValueChange={setFuelType}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Тип топлива
                          </span>
                          <SelectValue placeholder="Выберите тип" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {fuelTypes?.data.rows.map((ft) => (
                          <SelectItem
                            key={ft.id}
                            value={ft.id}
                            className="text-base font-rale cursor-pointer"
                          >
                            {ft.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fuelType && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFuelType("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}

                  {/* Объем двигателя */}
                  <div className="relative">
                    <Select
                      value={engineVolume}
                      onValueChange={setEngineVolume}
                    >
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.engineVolume")}
                          </span>
                          <SelectValue
                            placeholder={t("filters.chooseVolume")}
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {engineVolumes.map((ev) => (
                          <SelectItem
                            key={ev}
                            value={ev}
                            className="text-base font-rale cursor-pointer"
                          >
                            {ev}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {engineVolume && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEngineVolume("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div>

                  {/* Цилиндры
                  <div className="relative">
                    <Select value={cylinders} onValueChange={setCylinders}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Цилиндры
                          </span>
                          <SelectValue placeholder="Выберите кол-во" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {cylinderOptions.map((cyl) => (
                          <SelectItem
                            key={cyl}
                            value={cyl}
                            className="text-base font-rale cursor-pointer"
                          >
                            {cyl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {cylinders && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCylinders("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}

                  {/* Цвет */}
                  <div className="relative">
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            {t("filters.color")}
                          </span>
                          <SelectValue placeholder={t("filters.chooseColor")} />
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

                  {/* Двери */}
                  {/* <div className="relative">
                    <Select value={doors} onValueChange={setDoors}>
                      <SelectTrigger className="relative w-full min-h-[90px] px-4 py-3 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
                        <div className="flex flex-col gap-2 items-start w-full">
                          <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                            Двери
                          </span>
                          <SelectValue placeholder="Выберите кол-во" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                        {doorOptions.map((door) => (
                          <SelectItem
                            key={door}
                            value={door}
                            className="text-base font-rale cursor-pointer"
                          >
                            {door}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {doors && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDoors("");
                        }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    )}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:block hidden w-[25%] mt-3">
          <Button
            size="none"
            onClick={handleSearch}
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl w-[90%] flex items-center gap-2.5 py-[22.5px] font-medium px-[25px]"
          >
            <CiSearch />
            <div>{t("filters.searchCars")}</div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
