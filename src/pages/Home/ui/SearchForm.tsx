import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useGetRegions } from "@/api/regions/useGetRegions";

import { CiSearch } from "react-icons/ci";

import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";
import { useGetDriveTypeClient } from "@/api/carSpecsClient/useGetDriveTypeClient";
import { useGetTransmissionClient } from "@/api/carSpecsClient/useGetTransmissionClient";
import { useGetFuelTypeClient } from "@/api/carSpecsClient/useGetFuelTypeClient";
import { useGetCharsClient } from "@/api/carSpecsClient/useGetCharsClient";
import { useGetColorsClient } from "@/api/carSpecsClient/useGetColorsClient";

const SearchForm = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"all" | "new" | "used">("all");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [cityRegion, setCityRegion] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [offerType, setOfferType] = useState("");
  const [driveType, setDriveType] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engineVolume, setEngineVolume] = useState("");
  const [cylinders, setCylinders] = useState("");
  const [color, setColor] = useState("");
  const [doors, setDoors] = useState("");
  const [label, setLabel] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [promo, setPromo] = useState(false);
  const [credit, setCredit] = useState(false);
  const [tirePressure, setTirePressure] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  const { data: regions } = useGetRegions(i18n.language);
  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);
  const { data: driveTypes } = useGetDriveTypeClient(i18n.language);
  const { data: transmissions } = useGetTransmissionClient(i18n.language);
  const { data: fuelTypes } = useGetFuelTypeClient(i18n.language);
  const { data: chars } = useGetCharsClient(i18n.language);
  const { data: colors } = useGetColorsClient(i18n.language);

  const filteredRegions = useMemo(() => {
    if (!regions?.data?.rows) return [];

    if (!citySearch.trim()) return regions.data.rows;

    const searchLower = citySearch.toLowerCase();
    return regions.data.rows
      .map((region) => ({
        ...region,
        cities: region.cities.filter((city) =>
          city.name.toLowerCase().includes(searchLower)
        ),
      }))
      .filter(
        (region) =>
          region.cities.length > 0 ||
          region.name.toLowerCase().includes(searchLower)
      );
  }, [regions, citySearch]);

  const tabs = [
    { id: "all" as const, label: "Все" },
    { id: "new" as const, label: "Новые" },
  ];

  const carBrands = [
    "Audi",
    "BMW",
    "Mercedes-Benz",
    "Toyota",
    "Volkswagen",
    "Ford",
    "Honda",
    "Nissan",
    "Hyundai",
    "Kia",
  ];

  const carModels = ["Model 1", "Model 2", "Model 3", "Model 4"];
  const years = ["2024", "2023", "2022", "2021", "2020", "2019"];
  const bodyTypes = ["Седан", "Внедорожник", "Хэтчбек", "Купе", "Универсал"];
  const categories = ["Легковые", "Грузовые", "Мото", "Спецтехника"];
  const mileageRanges = ["0-10000", "10000-50000", "50000-100000", "100000+"];
  const priceRanges = ["0-10000", "10000-20000", "20000-50000", "50000+"];
  const engineVolumes = ["1.0-1.5", "1.6-2.0", "2.1-3.0", "3.0+"];
  const cylinderOptions = ["3", "4", "6", "8", "12"];
  const doorOptions = ["2", "3", "4", "5"];
  const labels = ["Срочная продажа", "Новое поступление", "Хит продаж"];

  return (
    <div className="lg:mt-[-70px] relative z-30 bg-black lg:bg-white/40 shadow-lg lg:w-[90%] pb-10 lg:rounded-2xl mx-auto">
      <div className="flex relative rounded-2xl backdrop-blur-md h-[70px]">
        <div className="flex justify-center lg:justify-start gap-8 lg:bg-[#FFFFFF33] px-8 pt-4 w-full lg:w-[75%] lg:rounded-tl-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative cursor-pointer font-rale font-medium text-base text-white pb-4 transition-colors hover:text-white/80"
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute bottom-[25%] left-0 right-0 h-0.5 bg-primary animate-in slide-in-from-bottom-1 duration-300" />
              )}
            </button>
          ))}
        </div>

        <button className="ml-auto w-[25%] hidden lg:flex items-center justify-center font-rale font-medium text-[15px] text-white gap-2 hover:opacity-80 transition-opacity">
          <div className="w-3.5 h-0.5 bg-white rounded-lg"></div>
          Расширенный поиск
        </button>
      </div>

      <div className="flex">
        <div className="p-[25px] lg:pt-2.5 pl-4 pr-6 bg-white lg:bg-transparent w-[90%] mx-auto rounded-2xl lg:rounded-none lg:w-[75%]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2.5">
            {/* Марка */}
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
                {carBrands.map((carBrand) => (
                  <SelectItem
                    key={carBrand}
                    value={carBrand}
                    className="text-base font-rale cursor-pointer"
                  >
                    {carBrand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Модель */}
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
                {carModels.map((m) => (
                  <SelectItem
                    key={m}
                    value={m}
                    className="text-base font-rale cursor-pointer"
                  >
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Цена ($)
                  </span>
                  <SelectValue placeholder="Выберите цену" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {priceRanges.map((pr) => (
                  <SelectItem
                    key={pr}
                    value={pr}
                    className="text-base font-rale cursor-pointer"
                  >
                    {pr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Год */}
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Год
                  </span>
                  <SelectValue placeholder="Выберите год" />
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

            <Button
              size="none"
              className="bg-primary text-white font-dm text-sm mt-5 lg:hidden cursor-pointer rounded-xl w-full flex items-center gap-2.5 py-5 font-medium px-[25px]"
            >
              <CiSearch />
              <div>
                Поиск <span className="underline">9451</span> авто
              </div>
            </Button>

            {/* Тип кузова */}
            <Select value={bodyType} onValueChange={setBodyType}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Тип кузова
                  </span>
                  <SelectValue placeholder="Выберите тип" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {bodyTypes.map((bt) => (
                  <SelectItem
                    key={bt}
                    value={bt}
                    className="text-base font-rale cursor-pointer"
                  >
                    {bt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Город / Регион */}
            <SearchableSelect value={cityRegion} onValueChange={setCityRegion}>
              <SearchableSelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Город / Регион
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

            {/* Состояние */}
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Категория */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Категория
                  </span>
                  <SelectValue placeholder="Выберите категорию" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-base font-rale cursor-pointer"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Тип предложения */}
            <Select value={offerType} onValueChange={setOfferType}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Тип привода */}
            <Select value={driveType} onValueChange={setDriveType}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Пробег */}
            <Select value={mileage} onValueChange={setMileage}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Трансмиссия */}
            <Select value={transmission} onValueChange={setTransmission}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Тип топлива */}
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Объем двигателя */}
            <Select value={engineVolume} onValueChange={setEngineVolume}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Объем двигателя
                  </span>
                  <SelectValue placeholder="Выберите объем" />
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

            {/* Цилиндры */}
            <Select value={cylinders} onValueChange={setCylinders}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Цвет */}
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Двери */}
            <Select value={doors} onValueChange={setDoors}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
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

            {/* Ярлык */}
            <Select value={label} onValueChange={setLabel}>
              <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 hidden lg:flex">
                <div className="flex flex-col gap-2 items-start w-full">
                  <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                    Ярлык
                  </span>
                  <SelectValue placeholder="Выберите ярлык" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
                {labels.map((lbl) => (
                  <SelectItem
                    key={lbl}
                    value={lbl}
                    className="text-base font-rale cursor-pointer"
                  >
                    {lbl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="lg:block hidden w-[25%] mt-3">
          <Button
            size="none"
            className="bg-primary text-white font-dm text-[15px] cursor-pointer rounded-xl w-[90%] flex items-center gap-2.5 py-[22.5px] font-medium px-[25px]"
          >
            <CiSearch />
            <div>
              Поиск <span className="underline">9451</span> авто
            </div>
          </Button>

          <div className="checkboxes flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={recommended}
                onCheckedChange={(checked) => setRecommended(checked === true)}
                className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
              />
              <label className="text-base font-rale text-textPrimary cursor-pointer">
                Рекомендуемые
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={promo}
                onCheckedChange={(checked) => setPromo(checked === true)}
                className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
              />
              <label className="text-base font-rale text-textPrimary cursor-pointer">
                Акция
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={credit}
                onCheckedChange={(checked) => setCredit(checked === true)}
                className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
              />
              <label className="text-base font-rale text-textPrimary cursor-pointer">
                В кредит
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                checked={tirePressure}
                onCheckedChange={(checked) => setTirePressure(checked === true)}
                className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!"
              />
              <label className="text-base font-rale text-textPrimary cursor-pointer">
                Контроля давления в шинах
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
