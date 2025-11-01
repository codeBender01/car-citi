import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  regions,
  bodyTypes,
  years,
  transmissions,
  fuelTypes,
  chars,
} from "../lib/filters";
import { CiBookmark } from "react-icons/ci";

const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100000");

  return (
    <div className="w-[25%] flex flex-col gap-4">
      <div className="w-full border border-grayBorder rounded-2xl p-5">
        <Select>
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Регион / Город
              </span>
              <SelectValue placeholder="Выберите город" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            {regions.map((region) => (
              <SelectItem
                key={region}
                value={region}
                className="text-base font-rale cursor-pointer"
              >
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2 mt-5">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Радиус
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Состояние
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <div>
          <div className="text-lg font-rale text-textPrimary mb-4">
            Тип кузова
          </div>

          <div className="flex flex-col gap-4">
            {bodyTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-3">
                <Checkbox className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!" />
                <label className="text-base font-rale text-textPrimary cursor-pointer">
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Марка
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Модель
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <div className="grid grid-cols-2 gap-4">
          <Select>
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
                  value={year}
                  className="text-base font-rale cursor-pointer"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
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
                  value={year}
                  className="text-base font-rale cursor-pointer"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Пробег
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

        <Select defaultValue="all">
          <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
            <div className="flex flex-col gap-2 items-start w-full">
              <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                Тип привода
              </span>
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
            <SelectItem
              value="all"
              className="text-base font-rale cursor-pointer"
            >
              Все
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="border-b border-grayBorder my-5 -mx-5"></div>

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
          <div className="border-b border-grayBorder my-5 -mx-5"></div>

          <div>
            <div className="text-lg font-rale text-textPrimary mb-4">
              Коробка передач
            </div>

            <div className="flex flex-col gap-4">
              {transmissions.map((type) => (
                <div key={type.id} className="flex items-center gap-3">
                  <Checkbox className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!" />
                  <label className="text-base font-rale text-textPrimary cursor-pointer">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <div>
            <div className="text-lg font-rale text-textPrimary mb-4">
              Тип топлива
            </div>

            <div className="flex flex-col gap-4">
              {fuelTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-3">
                  <Checkbox className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!" />
                  <label className="text-base font-rale text-textPrimary cursor-pointer">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <Select defaultValue="all">
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Цвет
                </span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="all"
                className="text-base font-rale cursor-pointer"
              >
                Все
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <Select defaultValue="all">
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Цвет интерьера
                </span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="all"
                className="text-base font-rale cursor-pointer"
              >
                Все
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <Select defaultValue="all">
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Двери
                </span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="all"
                className="text-base font-rale cursor-pointer"
              >
                3
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <Select defaultValue="all">
            <SelectTrigger className="relative w-full min-h-[60px] px-4 py-2.5 border border-[#E1E1E1] rounded-xl bg-white font-medium text-textPrimary font-rale shadow-none hover:border-[#E1E1E1] focus-visible:border-[#7B3FF2] focus-visible:ring-[#7B3FF2]/20 [&>svg]:absolute [&>svg]:right-4 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2">
              <div className="flex flex-col gap-2 items-start w-full">
                <span className="text-sm font-medium text-gray-500 font-rale pointer-events-none">
                  Цилиндры
                </span>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-white border border-[#7B3FF2]/20">
              <SelectItem
                value="all"
                className="text-base font-rale cursor-pointer"
              >
                6
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="border-b border-grayBorder my-5 -mx-5"></div>
          <div>
            <div className="text-lg font-rale text-textPrimary mb-4">
              Характеристики
            </div>

            <div className="flex flex-col gap-4">
              {chars.map((type) => (
                <div key={type.id} className="flex items-center gap-3">
                  <Checkbox className="w-5 h-5 data-[state=checked]:bg-[#0C1002]! data-[state=checked]:text-white! data-[state=checked]:border-[#0C1002]! border-[#0C1002]!" />
                  <label className="text-base font-rale text-textPrimary cursor-pointer">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="font-dm text-base text-primary mt-5">
            Показать еще 8
          </div>
        </div>
      </div>
      <Button
        size="none"
        className="text-primary bg-white border border-primary hover:bg-primary hover:text-white  font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
      >
        <CiBookmark />
        Сохранить поисковые настройки
      </Button>
    </div>
  );
};

export default Filters;
