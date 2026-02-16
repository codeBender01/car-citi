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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { NewPostReq } from "@/interfaces/posts.interface";

import { BsArrowUpRight } from "react-icons/bs";

import { useTranslation } from "react-i18next";
import { useState, useMemo, useEffect } from "react";

import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";
import { useGetCarMarksClient } from "@/api/carMarks/useGetCarMarksClient";
import { useGetRegions } from "@/api/regions/useGetRegions";
import { useGetOfferTypesClient } from "@/api/carSpecsClient/useGetOfferTypesClient";
import { useGetDriveTypeClient } from "@/api/carSpecsClient/useGetDriveTypeClient";
import { useGetTransmissionClient } from "@/api/carSpecsClient/useGetTransmissionClient";
import { useGetColorsClient } from "@/api/carSpecsClient/useGetColorsClient";
import { useGetSubcategoriesClient } from "@/api/carSpecsClient/useGetSubcategoriesClient";
import { useGetCarEquipment } from "@/api/carSpecsClient/useGetCarEquipmentAll";
import { useGetOneCarMarkClient } from "@/api/carMarks/useGetOneCarMarkClient";
import type { OneCarModel } from "@/interfaces/carMarks.interface";

export interface CarDetailsFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
  onNext: () => void;
}

const CarDetailsForm = ({
  formData,
  setFormData,
  onNext,
}: CarDetailsFormProps) => {
  const { i18n } = useTranslation();
  const [citySearch, setCitySearch] = useState("");
  const [activeCarModels, setActiveCarModels] = useState<OneCarModel[]>([]);
  const [selectedCarMark, setSelectedCarMark] = useState("");

  // Generate years from 2000 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => currentYear - i,
  );

  const handleInputChange = (field: keyof NewPostReq, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCityChange = (cityId: string) => {
    const region = regions?.data?.rows.find((r) =>
      r.cities.some((c) => c.id === cityId),
    );

    if (region) {
      setFormData((prev) => ({
        ...prev,
        cityId: cityId,
        regionId: region.id,
      }));
    }
  };

  const engineVolumes = [
    1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.5, 2.7, 3.0, 3.5, 4.0, 4.5,
    5.0, 5.5, 6.0,
  ];

  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);
  const { data: carMarks } = useGetCarMarksClient(1, 100, i18n.language);
  const { data: regions } = useGetRegions(i18n.language);
  const { data: offerTypes } = useGetOfferTypesClient(i18n.language);
  const { data: driveTypes } = useGetDriveTypeClient(i18n.language);
  const { data: transmissions } = useGetTransmissionClient(i18n.language);
  const { data: colors } = useGetColorsClient(i18n.language);
  const { data: subcategories } = useGetSubcategoriesClient(i18n.language);
  const { data: equipment } = useGetCarEquipment(i18n.language);
  const { data: carMark } = useGetOneCarMarkClient(selectedCarMark);

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

  useEffect(() => {
    if (selectedCarMark !== "" && carMark) {
      setActiveCarModels(carMark.data.carModels);
    }
  }, [selectedCarMark, carMark]);

  console.log(activeCarModels);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="col-span-full relative w-full min-h-[60px]">
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => {
            if (e.target.value.length <= 50) {
              handleInputChange("title", e.target.value);
            }
          }}
          maxLength={50}
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Имя машины
        </span>
      </div>

      <Select
        value={formData.carMarkId}
        onValueChange={(value) => {
          setSelectedCarMark(value);
          handleInputChange("carMarkId", value);
        }}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Марка
            </span>
            <SelectValue className="truncate" placeholder="Выберите марку" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {carMarks?.data.rows.map((carBrand) => (
            <SelectItem
              key={carBrand.id}
              value={carBrand.id}
              className="text-base font-rale cursor-pointer"
            >
              {carBrand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Модель */}
      <Select
        disabled={activeCarModels.length === 0}
        value={formData.carModelId}
        onValueChange={(value) => handleInputChange("carModelId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Модель
            </span>
            <SelectValue className="truncate" placeholder="Выберите модель" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {activeCarModels.map((m) => (
            <SelectItem
              key={m.id}
              value={m.id}
              className="text-base font-rale cursor-pointer"
            >
              {m.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={
          formData.issueYear
            ? formData.issueYear.includes(".")
              ? formData.issueYear.split(".")[2]
              : formData.issueYear.split("-")[0]
            : ""
        }
        onValueChange={(year) =>
          handleInputChange("issueYear", `${year}-01-01`)
        }
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Год выпуска
            </span>
            <SelectValue className="truncate" placeholder="Выберите год" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20 max-h-[300px]">
          {years.map((year) => (
            <SelectItem
              key={year}
              value={year.toString()}
              className="text-base font-rale cursor-pointer"
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Город / Регион */}
      <SearchableSelect
        value={formData.cityId}
        onValueChange={handleCityChange}
      >
        <SearchableSelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 flex">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Город / Регион
            </span>
            <SearchableSelectValue
              className="truncate"
              placeholder="Выберите город"
            />
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
      <Select
        value={formData.carConditionId}
        onValueChange={(value) => handleInputChange("carConditionId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Состояние
            </span>
            <SelectValue
              className="truncate"
              placeholder="Выберите состояние"
            />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {conditions?.data.rows.map((cond) => (
            <SelectItem
              key={cond.id}
              value={cond.id}
              className="text-base font-rale cursor-pointer capitalize"
            >
              {cond.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={formData.subcategoryId}
        onValueChange={(value) => handleInputChange("subcategoryId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип кузова
            </span>
            <SelectValue
              className="truncate"
              placeholder="Выберите категорию"
            />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {subcategories?.data.rows.map((cat) => (
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

      {/* Тип предложения */}
      <Select
        value={formData.offerTypeId}
        onValueChange={(value) => handleInputChange("offerTypeId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип предложения
            </span>
            <SelectValue className="truncate" placeholder="Выберите тип" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {offerTypes?.data.rows.map((ot) => (
            <SelectItem
              key={ot.id}
              value={ot.id}
              className="text-base font-rale cursor-pointer capitalize"
            >
              {ot.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Тип привода */}
      <Select
        value={formData.driveTypeId}
        onValueChange={(value) => handleInputChange("driveTypeId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип привода
            </span>
            <SelectValue className="truncate" placeholder="Выберите тип" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {driveTypes?.data.rows.map((dt) => (
            <SelectItem
              key={dt.id}
              value={dt.id}
              className="text-base font-rale cursor-pointer capitalize"
            >
              {dt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Пробег */}
      <div className="relative w-full min-h-[60px]">
        <Input
          type="number"
          value={formData.mileage || ""}
          onChange={(e) => {
            const val = e.target.value;
            handleInputChange("mileage", val === "" ? 0 : Number(val) || 0);
          }}
          placeholder="Введите пробег"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Пробег (км)
        </span>
      </div>

      {/* Трансмиссия */}
      <Select
        value={formData.transmissionId}
        onValueChange={(value) => handleInputChange("transmissionId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Трансмиссия
            </span>
            <SelectValue
              className="truncate"
              placeholder="Выберите трансмиссию"
            />
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

      {/* Объем двигателя */}
      <Select
        value={String(formData.engineVolume)}
        onValueChange={(value) =>
          handleInputChange("engineVolume", Number(value))
        }
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Объем двигателя
            </span>
            <SelectValue className="truncate" placeholder="Выберите объем" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {engineVolumes.map((ev) => (
            <SelectItem
              key={ev}
              value={String(ev)}
              className="text-base font-rale cursor-pointer"
            >
              {ev} L
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Цвет */}
      <Select
        value={formData.colorId}
        onValueChange={(value) => handleInputChange("colorId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full min-w-0 pr-8">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Цвет
            </span>
            <SelectValue className="truncate" placeholder="Выберите цвет" />
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

      {/* VIN / ID */}
      <div className="relative w-full min-h-[60px]">
        <Input
          type="text"
          value={formData.vin}
          onChange={(e) => handleInputChange("vin", e.target.value)}
          placeholder="Введите VIN / ID"
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          VIN / ID
        </span>
      </div>

      {/* Комплектация */}
      <div className="relative">
        <Select
          value={formData.carEquipmentId}
          onValueChange={(value) => handleInputChange("carEquipmentId", value)}
        >
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Комплектация
              </span>
              <SelectValue
                className="truncate"
                placeholder="Выберите комплектацию"
              />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            {equipment?.data?.rows?.map((equip) => (
              <SelectItem
                key={equip.id}
                value={equip.id}
                className="text-base font-rale cursor-pointer"
              >
                {equip.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Описание объявления - Full Width */}
      <div className="col-span-full relative w-full min-h-[120px]">
        <textarea
          value={formData.damage}
          onChange={(e) =>
            setFormData({
              ...formData,
              damage: e.target.value,
            })
          }
          placeholder="Введите описание"
          rows={5}
          className="w-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale resize-none focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Описание объявления
        </span>
      </div>
      <div className="col-span-full">
        <Button
          onClick={onNext}
          size="none"
          className="text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center mt-[30px] gap-2.5 py-4 px-[25px] ml-auto w-fit"
        >
          Далее
          <BsArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default CarDetailsForm;
