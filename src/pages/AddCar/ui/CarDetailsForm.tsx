import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { NewPostReq } from "@/interfaces/posts.interface";

import { BsArrowUpRight } from "react-icons/bs";

import { useTranslation } from "react-i18next";

import { useGetCarSpecsConditionsClient } from "@/api/carSpecsClient/useGetCarConditionsClient";

interface CarDetailsFormProps {
  formData: NewPostReq;
  setFormData: React.Dispatch<React.SetStateAction<NewPostReq>>;
}

const CarDetailsForm = ({ formData, setFormData }: CarDetailsFormProps) => {
  const { i18n } = useTranslation();

  const handleInputChange = (field: keyof NewPostReq, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
  const cities = ["Москва", "Санкт-Петербург", "Казань", "Новосибирск"];
  const categories = ["Легковые", "Грузовые", "Мото", "Спецтехника"];
  const offerTypes = ["Продажа", "Аренда"];
  const driveTypes = ["Передний", "Задний", "Полный"];
  const mileageRanges = ["0-10000", "10000-50000", "50000-100000", "100000+"];
  const transmissions = ["Автомат", "Механика", "Робот", "Вариатор"];
  const fuelTypes = ["Бензин", "Дизель", "Электро", "Гибрид"];
  const cylinderOptions = ["3", "4", "6", "8", "12"];
  const colors = ["Белый", "Черный", "Серый", "Синий", "Красный"];
  const doorOptions = ["2", "3", "4", "5"];
  const engineVolumes = [
    1.0, 1.2, 1.4, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.5, 2.7, 3.0, 3.5, 4.0, 4.5,
    5.0, 5.5, 6.0,
  ];

  const { data: conditions } = useGetCarSpecsConditionsClient(i18n.language);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 relative w-full min-h-[60px]">
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="w-full h-full px-4 pt-7 pb-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale focus:outline-none focus:border-[#7B3FF2] focus:ring-2 focus:ring-[#7B3FF2]/20 placeholder:text-base"
        />
        <span className="absolute left-4 top-3 text-sm font-medium text-gray-500 font-rale pointer-events-none">
          Имя машины
        </span>
      </div>

      <Select
        value={formData.carMarkId}
        onValueChange={(value) => handleInputChange("carMarkId", value)}
      >
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
      <Select
        value={formData.carModelId}
        onValueChange={(value) => handleInputChange("carModelId", value)}
      >
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

      <Select
        value={formData.issueYear}
        onValueChange={(value) => handleInputChange("issueYear", value)}
      >
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

      {/* Тип кузова */}
      <Select
        value={formData.subcategoryId}
        onValueChange={(value) => handleInputChange("subcategoryId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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
      <Select
        value={formData.cityId}
        onValueChange={(value) => handleInputChange("cityId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Город / Регион
            </span>
            <SelectValue placeholder="Выберите город" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {cities.map((city) => (
            <SelectItem
              key={city}
              value={city}
              className="text-base font-rale cursor-pointer"
            >
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Состояние */}
      <Select
        value={formData.carConditionId}
        onValueChange={(value) => handleInputChange("carConditionId", value)}
      >
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
              className="text-base font-rale cursor-pointer capitalize"
            >
              {cond.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Категория */}
      <Select
        value={formData.categoryId}
        onValueChange={(value) => handleInputChange("categoryId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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
      <Select
        value={formData.saleTypeId}
        onValueChange={(value) => handleInputChange("saleTypeId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип предложения
            </span>
            <SelectValue placeholder="Выберите тип" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {offerTypes.map((ot) => (
            <SelectItem
              key={ot}
              value={ot}
              className="text-base font-rale cursor-pointer"
            >
              {ot}
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
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип привода
            </span>
            <SelectValue placeholder="Выберите тип" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {driveTypes.map((dt) => (
            <SelectItem
              key={dt}
              value={dt}
              className="text-base font-rale cursor-pointer"
            >
              {dt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Пробег */}
      <Select
        value={formData.mileage}
        onValueChange={(value) => handleInputChange("mileage", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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
      <Select
        value={formData.transmissionId}
        onValueChange={(value) => handleInputChange("transmissionId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Трансмиссия
            </span>
            <SelectValue placeholder="Выберите трансмиссию" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {transmissions.map((trans) => (
            <SelectItem
              key={trans}
              value={trans}
              className="text-base font-rale cursor-pointer"
            >
              {trans}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Тип топлива */}
      <Select
        value={formData.fuelTypeId}
        onValueChange={(value) => handleInputChange("fuelTypeId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Тип топлива
            </span>
            <SelectValue placeholder="Выберите тип" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {fuelTypes.map((ft) => (
            <SelectItem
              key={ft}
              value={ft}
              className="text-base font-rale cursor-pointer"
            >
              {ft}
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
              value={String(ev)}
              className="text-base font-rale cursor-pointer"
            >
              {ev} L
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Цилиндры */}
      <Select
        value={formData.cylinders}
        onValueChange={(value) => handleInputChange("cylinders", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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
      <Select
        value={formData.colorId}
        onValueChange={(value) => handleInputChange("colorId", value)}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
          <div className="flex flex-col gap-2 items-start w-full">
            <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
              Цвет
            </span>
            <SelectValue placeholder="Выберите цвет" />
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
          {colors.map((col) => (
            <SelectItem
              key={col}
              value={col}
              className="text-base font-rale cursor-pointer"
            >
              {col}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Двери */}
      <Select
        value={String(formData.doors)}
        onValueChange={(value) => handleInputChange("doors", Number(value))}
      >
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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

      {/* Описание объявления - Full Width */}
      <div className="col-span-4 relative w-full min-h-[120px]">
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
      <div className="col-span-4">
        <Button
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
