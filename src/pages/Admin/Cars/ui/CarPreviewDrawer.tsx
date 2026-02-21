import { useRef } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BASE_URL } from "@/api";
import dayjs from "dayjs";
import type { OnePost } from "@/interfaces/posts.interface";

import "swiper/css";

interface CarPreviewDrawerProps {
  car: OnePost | null;
  onClose: () => void;
  onStatusChange: (carId: string, status: string) => void;
}

const CarPreviewDrawer = ({ car, onClose, onStatusChange }: CarPreviewDrawerProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const carImages = car?.images?.images || [];

  return (
    <Sheet
      open={!!car}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="!w-[80%] !max-w-none bg-white p-0 overflow-y-auto [&>button]:text-textSecondary"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>
            {car?.carMark?.name} {car?.carModel?.name}
          </SheetTitle>
        </SheetHeader>

        {car && (
          <div className="flex flex-col">
            {carImages.length > 1 ? (
              <div className="relative">
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  className="h-[400px] w-full"
                >
                  {carImages.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={`${BASE_URL}/${img.url}`}
                        alt={`${car.carMark?.name} ${car.carModel?.name} - ${idx + 1}`}
                        className="w-full h-[400px] object-contain bg-black"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center px-3 z-10 pointer-events-none">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-black/40 text-white p-2 rounded-full cursor-pointer hover:bg-black/60 transition-colors pointer-events-auto"
                  >
                    <MdOutlineKeyboardArrowLeft size={22} />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-black/40 text-white p-2 rounded-full cursor-pointer hover:bg-black/60 transition-colors pointer-events-auto"
                  >
                    <MdOutlineKeyboardArrowRight size={22} />
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={
                  carImages[0]?.url
                    ? `${BASE_URL}/${carImages[0].url}`
                    : "https://via.placeholder.com/800x400"
                }
                alt={`${car.carMark?.name} ${car.carModel?.name}`}
                className="w-full h-[400px] object-contain bg-black"
              />
            )}

            <div className="p-6 flex flex-col gap-4">
              <h2 className="font-dm text-2xl font-bold text-textSecondary">
                {car.carMark?.name} {car.carModel?.name}
              </h2>

              <div className="font-dm text-xl font-semibold text-primary">
                {car.carPrice?.price?.toLocaleString()} TMT
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">Марка</span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {car.carMark?.name || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">Модель</span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {car.carModel?.name || "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">Год выпуска</span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {car.issueYear
                      ? dayjs(car.issueYear).format("YYYY")
                      : "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">Трансмиссия</span>
                  <span className="text-sm font-medium text-textSecondary font-dm">
                    {car.transmission?.name || "-"}
                  </span>
                </div>
                {car.fuelType?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Тип топлива</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.fuelType.name}
                    </span>
                  </div>
                )}
                {car.subcategory?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Тип кузова</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.subcategory.name}
                    </span>
                  </div>
                )}
                {car.mileage != null && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Пробег</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.mileage.toLocaleString()} km
                    </span>
                  </div>
                )}
                {car.engineVolume != null && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Объем двигателя</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.engineVolume}L
                    </span>
                  </div>
                )}
                {car.driveType?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Тип привода</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.driveType.name}
                    </span>
                  </div>
                )}
                {car.carCondition?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Состояние</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.carCondition.name}
                    </span>
                  </div>
                )}
                {car.color?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Цвет</span>
                    <span className="text-sm font-medium text-textSecondary font-dm flex items-center gap-2">
                      {car.color.hex && (
                        <span
                          className="inline-block w-4 h-4 rounded-full border border-headerBorder"
                          style={{ backgroundColor: car.color.hex }}
                        />
                      )}
                      {car.color.name}
                    </span>
                  </div>
                )}
                {car.region?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Регион</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.region.name}
                    </span>
                  </div>
                )}
                {car.city?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Город</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.city.name}
                    </span>
                  </div>
                )}
                {car.offerType?.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Тип предложения</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.offerType.name}
                    </span>
                  </div>
                )}
                {car.phone && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">Телефон</span>
                    <a
                      href={`tel:${car.phone}`}
                      className="text-sm font-medium text-primary font-dm hover:underline"
                    >
                      {car.phone}
                    </a>
                  </div>
                )}
                {car.vin && (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-textGray font-dm">VIN</span>
                    <span className="text-sm font-medium text-textSecondary font-dm">
                      {car.vin}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-textGray font-dm">Верификация</span>
                  <span className={`text-sm font-medium font-dm ${car.verifiedStatus === "verified" ? "text-green-600" : "text-yellow-600"}`}>
                    {car.verifiedStatus === "verified" ? "Верифицирован" : "Не верифицирован"}
                  </span>
                </div>
              </div>

              {car.damage && (
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-sm text-textGray font-dm">Описание</span>
                  <p className="text-sm font-medium text-textSecondary font-dm whitespace-pre-wrap">
                    {car.damage}
                  </p>
                </div>
              )}

              {car.carCharacteristics &&
                car.carCharacteristics.length > 0 && (
                  <div className="flex flex-col gap-3 mt-2">
                    <h3 className="font-dm text-lg font-semibold text-textSecondary">
                      Характеристики
                    </h3>
                    {car.carCharacteristics.map((char) => (
                      <div key={char.id} className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-textGray font-dm">
                          {char.name}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {char.items.map((item) => (
                            <span
                              key={item.id}
                              className="px-3 py-1 bg-mainBg rounded-lg text-sm text-textSecondary font-dm"
                            >
                              {item.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-headerBorder">
                <button
                  onClick={() => onStatusChange(car.id, "checking")}
                  className={`flex-1 py-2.5 rounded-lg font-dm text-sm font-medium transition-colors ${
                    car.status === "checking"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                  }`}
                >
                  На проверке
                </button>
                <button
                  onClick={() => onStatusChange(car.id, "confirmed")}
                  className={`flex-1 py-2.5 rounded-lg font-dm text-sm font-medium transition-colors ${
                    car.status === "confirmed"
                      ? "bg-green-500 text-white"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  Подтвердить
                </button>
                <button
                  onClick={() => onStatusChange(car.id, "rejected")}
                  className={`flex-1 py-2.5 rounded-lg font-dm text-sm font-medium transition-colors ${
                    car.status === "rejected"
                      ? "bg-red-500 text-white"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CarPreviewDrawer;
