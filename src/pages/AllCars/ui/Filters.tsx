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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { IoCloseCircle, IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";

import { useGetRegions } from "@/api/regions/useGetRegions";
import { useSaveSearch } from "@/api/savedSearch/useSaveSearch";
import { useToast } from "@/hooks/use-toast";
import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";
import { useGetDriveTypeClient } from "@/api/carSpecsClient/useGetDriveTypeClient";
import { useGetTransmissionClient } from "@/api/carSpecsClient/useGetTransmissionClient";
import { useGetFuelTypeClient } from "@/api/carSpecsClient/useGetFuelTypeClient";
import { useGetCharsClient } from "@/api/carSpecsClient/useGetCharsClient";
import { useGetColorsClient } from "@/api/carSpecsClient/useGetColorsClient";
import { useGetOfferTypesClient } from "@/api/carSpecsClient/useGetOfferTypesClient";
import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { useGetOneCarMarkClient } from "@/api/carMarks/useGetOneCarMarkClient";

interface FiltersProps {
  postsCount: number;
  postsLoading: boolean;
}

const Filters = ({ postsCount, postsLoading }: FiltersProps) => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const saveSearch = useSaveSearch();
  const { toast } = useToast();

  // Initialize state from URL params
  const [brand, setBrand] = useState(searchParams.get("carMarkId") || "");
  const [model, setModel] = useState(searchParams.get("carModelId") || "");
  const [cityRegions, setCityRegions] = useState<string[]>(() => [
    ...searchParams.getAll("regionId"),
    ...searchParams.getAll("cityId"),
  ]);
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
  const [offerType, setOfferType] = useState(
    searchParams.get("offerTypeId") || "",
  );
  const [subcategory] = useState(searchParams.get("subcategoryId") || "");
  const [yearFrom, setYearFrom] = useState(searchParams.get("yearFrom") || "");
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
  const [selectedChars, setSelectedChars] = useState<string[]>(() =>
    searchParams.getAll("characteristicIds"),
  );
  const [selectedCharItems, setSelectedCharItems] = useState<string[]>(() =>
    searchParams.getAll("characteristicItemIds"),
  );

  const { data: regions } = useGetRegions(i18n.language);
  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);
  const { data: driveTypes } = useGetDriveTypeClient(i18n.language);
  const { data: transmissions } = useGetTransmissionClient(i18n.language);
  const { data: fuelTypes } = useGetFuelTypeClient(i18n.language);
  const { data: chars } = useGetCharsClient(i18n.language);
  const { data: colors } = useGetColorsClient(i18n.language);
  const { data: offerTypes } = useGetOfferTypesClient(i18n.language);
  const { data: carMarks } = useGetCarMarksClient(1, 100, i18n.language);
  const { data: selectedCarMark } = useGetOneCarMarkClient(brand);

  useEffect(() => {
    if (brand) {
      setModel("");
    }
  }, [brand]);

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

  const resolvedLocations = useMemo(() => {
    const regionIds: string[] = [];
    const cityIds: string[] = [];
    if (!regions?.data?.rows || cityRegions.length === 0)
      return { regionIds, cityIds };

    for (const value of cityRegions) {
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
  }, [cityRegions, regions]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Preserve params not managed by Filters
    const dealerId = searchParams.get("dealerId");
    const categoryId = searchParams.get("categoryId");
    if (dealerId) params.set("dealerId", dealerId);
    if (categoryId) params.set("categoryId", categoryId);

    if (brand) params.set("carMarkId", brand);
    if (model) params.set("carModelId", model);
    for (const id of resolvedLocations.regionIds) params.append("regionId", id);
    for (const id of resolvedLocations.cityIds) params.append("cityId", id);
    if (fuelType) params.set("fuelTypeId", fuelType);
    if (driveType) params.set("driveTypeId", driveType);
    if (transmission) params.set("transmissionId", transmission);
    if (condition) params.set("carConditionId", condition);
    if (color) params.set("colorId", color);
    if (offerType) params.set("offerTypeId", offerType);
    if (subcategory) params.set("subcategoryId", subcategory);
    if (yearFrom) params.set("yearFrom", yearFrom);

    if (minPrice && minPrice !== "0") params.set("priceFrom", minPrice);
    if (maxPrice && maxPrice !== "100000") params.set("priceTo", maxPrice);
    for (const id of selectedChars) params.append("characteristicIds", id);
    for (const id of selectedCharItems)
      params.append("characteristicItemIds", id);

    setSearchParams(params, { replace: true });
  }, [
    brand,
    model,
    cityRegions,
    fuelType,
    driveType,
    transmission,
    condition,
    color,
    offerType,
    subcategory,
    yearFrom,
    minPrice,
    maxPrice,
    selectedChars,
    selectedCharItems,
    setSearchParams,
    resolvedLocations,
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1995 + 1 }, (_, i) =>
    String(currentYear - i),
  );

  const handleSaveSearch = async () => {
    const payload: Record<string, any> = {};

    if (brand) payload.carMarkId = brand;
    if (model) payload.carModelId = model;
    if (resolvedLocations.regionIds.length > 0)
      payload.regionId = resolvedLocations.regionIds;
    if (resolvedLocations.cityIds.length > 0)
      payload.cityId = resolvedLocations.cityIds[0];
    if (condition) payload.carConditionId = condition;
    if (driveType) payload.driveTypeId = driveType;
    if (transmission) payload.transmissionId = transmission;
    if (color) payload.colorId = color;
    if (subcategory) payload.subcategoryId = subcategory;
    if (yearFrom) payload.yearFrom = yearFrom;
    if (yearFrom) payload.To = yearFrom;
    if (minPrice && minPrice !== "0") payload.priceFrom = Number(minPrice);
    if (maxPrice && maxPrice !== "100000") payload.priceTo = Number(maxPrice);
    if (selectedChars.length > 0) payload.characteristicIds = selectedChars;
    if (selectedCharItems.length > 0)
      payload.characteristicItemIds = selectedCharItems;

    try {
      await saveSearch.mutateAsync(payload);
      toast({
        title: t("filters.searchSaved"),
        variant: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast({
          title: t("filters.loginRequired"),
          description: t("filters.loginToSaveSearch"),
          variant: "destructive",
        });
        return;
      }
      toast({
        title: t("filters.error"),
        description: t("filters.saveSearchError"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full lg:w-[100%] flex flex-col gap-4">
      <div className="w-full border border-grayBorder rounded-2xl p-5">
        {/* Регион / Город */}
        <div className="relative">
          <MultiSearchableSelect
            values={cityRegions}
            onValuesChange={handleCityRegionsChange}
          >
            <MultiSearchableSelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  {t("filters.regionCity")}
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

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Состояние */}
        <div className="relative">
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  {t("filters.condition")}
                </span>
                <SelectValue placeholder={t("filters.chooseCondition")} />
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

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Модель */}
        <div className="relative">
          <Select value={model} onValueChange={setModel} disabled={!brand}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 disabled:opacity-50 disabled:cursor-not-allowed">
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

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Year Range */}
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <Select value={yearFrom} onValueChange={setYearFrom}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    {t("filters.minYear")}
                  </span>
                  <SelectValue placeholder={t("filters.chooseYear")} />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20 max-h-[200px] overflow-y-auto">
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
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Тип привода */}
        <div className="relative">
          <Select value={driveType} onValueChange={setDriveType}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Price Range */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">{t("filters.price")}</div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setPriceRange([Number(e.target.value), priceRange[1]]);
                }}
                className="pl-7 pr-4 py-2.5 rounded-xl border border-grayBorder bg-white font-dm text-sm text-textPrimary"
                placeholder={t("filters.minPrice")}
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textPrimary font-dm text-sm"></span>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPriceRange([priceRange[0], Number(e.target.value)]);
                }}
                className="pl-7 pr-4 py-2.5 rounded-xl border border-grayBorder bg-white font-dm text-sm text-textPrimary"
                placeholder={t("filters.maxPrice")}
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
            {t("filters.transmission")}
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
            {t("filters.fuelType")}
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

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Тип предложения */}
        <div className="relative">
          <Select value={offerType} onValueChange={setOfferType}>
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  {t("filters.offerType")}
                </span>
                <SelectValue placeholder={t("filters.chooseType")} />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              {offerTypes?.data.rows.map((ot) => (
                <SelectItem
                  key={ot.id}
                  value={ot.id}
                  className="text-base font-rale cursor-pointer"
                >
                  {ot.name}
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
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        {/* Характеристики */}
        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">
            {t("filters.characteristics")}
          </div>

          <div className="flex flex-col gap-4">
            {chars?.data.rows.slice(0, 8).map((char) => (
              <div key={char.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedChars.includes(char.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedChars((prev) => [...prev, char.id]);
                        const itemIds =
                          char.items?.map((item) => item.id) || [];
                        setSelectedCharItems((prev) => [
                          ...new Set([...prev, ...itemIds]),
                        ]);
                      } else {
                        setSelectedChars((prev) =>
                          prev.filter((id) => id !== char.id),
                        );
                        const itemIds = new Set(
                          char.items?.map((item) => item.id) || [],
                        );
                        setSelectedCharItems((prev) =>
                          prev.filter((id) => !itemIds.has(id)),
                        );
                      }
                    }}
                    className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
                  />
                  <label className="text-base font-rale text-textPrimary cursor-pointer font-medium">
                    {char.name}
                  </label>
                </div>
                {char.items?.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pl-6">
                    <Checkbox
                      checked={selectedCharItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const newItems = [...selectedCharItems, item.id];
                          setSelectedCharItems(newItems);
                          const allItemIds = char.items?.map((i) => i.id) || [];
                          if (allItemIds.every((id) => newItems.includes(id))) {
                            setSelectedChars((prev) => [
                              ...new Set([...prev, char.id]),
                            ]);
                          }
                        } else {
                          setSelectedCharItems((prev) =>
                            prev.filter((id) => id !== item.id),
                          );
                          setSelectedChars((prev) =>
                            prev.filter((id) => id !== char.id),
                          );
                        }
                      }}
                      className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
                    />
                    <label className="text-base font-rale text-textPrimary cursor-pointer">
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {chars?.data.rows && chars.data.rows.length > 8 && (
          <div className="font-dm text-base text-primary mt-5 cursor-pointer">
            {t("filters.showMoreCount", { count: chars.data.rows.length - 8 })}
          </div>
        )}
      </div>

      <div className="text-base font-rale text-textPrimary">
        {postsLoading ? "..." : t("filters.found", { count: postsCount })}
      </div>

      <button
        onClick={handleSaveSearch}
        disabled={saveSearch.isPending}
        className="w-full flex items-center justify-center cursor-pointer gap-3 py-4 px-6 border border-[#88BA00] rounded-2xl bg-[#FBFCF9] text-[#88BA00] font-rale text-base font-medium hover:bg-[#f5f7f0] transition-colors disabled:opacity-50"
      >
        <IoBookmarkOutline size={20} />
        {saveSearch.isPending
          ? t("filters.saving")
          : t("filters.saveSearchSettings")}
      </button>
    </div>
  );
};

export default Filters;
