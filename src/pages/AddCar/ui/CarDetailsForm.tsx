import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BsArrowUpRight } from "react-icons/bs";

const CarDetailsForm = () => {
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
  const [vinId, setVinId] = useState("");
  const [description, setDescription] = useState("");

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
  const conditions = ["Отличное", "Хорошее", "Удовлетворительное"];
  const categories = ["Легковые", "Грузовые", "Мото", "Спецтехника"];
  const offerTypes = ["Продажа", "Аренда"];
  const driveTypes = ["Передний", "Задний", "Полный"];
  const mileageRanges = ["0-10000", "10000-50000", "50000-100000", "100000+"];
  const priceRanges = ["0-10000", "10000-20000", "20000-50000", "50000+"];
  const transmissions = ["Автомат", "Механика", "Робот", "Вариатор"];
  const fuelTypes = ["Бензин", "Дизель", "Электро", "Гибрид"];
  const engineVolumes = ["1.0-1.5", "1.6-2.0", "2.1-3.0", "3.0+"];
  const cylinderOptions = ["3", "4", "6", "8", "12"];
  const colors = ["Белый", "Черный", "Серый", "Синий", "Красный"];
  const doorOptions = ["2", "3", "4", "5"];
  const labels = ["Срочная продажа", "Новое поступление", "Хит продаж"];

  return (
    <div className="grid grid-cols-4 gap-4">
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

      {/* Цена */}
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

      {/* Тип кузова */}
      <Select value={bodyType} onValueChange={setBodyType}>
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
      <Select value={cityRegion} onValueChange={setCityRegion}>
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
          {conditions.map((cond) => (
            <SelectItem
              key={cond}
              value={cond}
              className="text-base font-rale cursor-pointer"
            >
              {cond}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Категория */}
      <Select value={category} onValueChange={setCategory}>
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
      <Select value={offerType} onValueChange={setOfferType}>
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
      <Select value={mileage} onValueChange={setMileage}>
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
      <Select value={transmission} onValueChange={setTransmission}>
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
      <Select value={fuelType} onValueChange={setFuelType}>
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
      <Select value={engineVolume} onValueChange={setEngineVolume}>
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
      <Select value={doors} onValueChange={setDoors}>
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

      {/* Ярлык */}
      <Select value={label} onValueChange={setLabel}>
        <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
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

      {/* VIN / ID */}
      <div className="relative w-full min-h-[60px]">
        <Input
          type="text"
          value={vinId}
          onChange={(e) => setVinId(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
