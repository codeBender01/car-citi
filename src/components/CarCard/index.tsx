import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import car1 from "@assets/images/car1.png";
import Gearbox from "@/svgs/Gearbox";
import Speedometer from "@/svgs/Speedometer";
import Calendar from "@/svgs/Calendar";
import { IoLocation } from "react-icons/io5";

import { BsArrowUpRight, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { HiShieldCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAddPostToFavorites } from "@/api/posts/useAddToFavorites";
import { useToast } from "@/hooks/use-toast";
import type { AxiosError } from "axios";
import type { OnePost } from "@/interfaces/posts.interface";
import type { HomeCarModel } from "@/interfaces/home.interface";
import { BASE_URL } from "@/api";

import dayjs from "dayjs";
import "swiper/css";

export interface CarCardProps {
  car: OnePost | HomeCarModel;
}

const CarCard = ({ car }: CarCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const swiperRef = useRef<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const addToFavorites = useAddPostToFavorites();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToFavorites.mutate(car.id, {
      onSuccess: () => {
        toast({
          title:
            "isFavorite" in car && car.isFavorite
              ? "Удалено из избранного"
              : "Добавлено в избранное",
          duration: 1000,
        });
      },
      onError: (error) => {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          navigate("/auth");
          return;
        }
        toast({
          title: "Ошибка",
          description: "Не удалось обновить избранное",
          variant: "destructive",
          duration: 3000,
        });
      },
    });
  };

  const getCarImages = (): { hashblur: string; url: string }[] => {
    if (!car.images) return [];

    if (Array.isArray(car.images)) {
      const firstImageSet = car.images[0];
      if (firstImageSet && firstImageSet.images) {
        return firstImageSet.images;
      }
    } else if (car.images.images) {
      return car.images.images;
    }

    return [];
  };

  const images = getCarImages();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!swiperRef.current || !containerRef.current || images.length <= 1)
      return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    const percentage = x / containerWidth;

    const targetIndex = Math.floor(percentage * images.length);
    const clampedIndex = Math.max(0, Math.min(targetIndex, images.length - 1));

    swiperRef.current.slideTo(clampedIndex);
  };

  return (
    <div
      onClick={() => {
        navigate("/car-details/" + car.id);
      }}
      className={`rounded-2xl flex flex-col w-full md:max-w-[330px] bg-white shadow-md border-5  ${car.verifiedStatus === "verified" ? "border-primary " : "border-white"}`}
    >
      <div
        ref={containerRef}
        className="h-[220px] relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
          {car.verifiedStatus === "verified" && (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <HiShieldCheck className=" text-primary" size={22} />
            </div>
          )}
          <div
            onClick={handleFavorite}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {"isFavorite" in car && car.isFavorite ? (
              <BsBookmarkFill className="w-4 h-4 text-primary" />
            ) : (
              <BsBookmark className="w-4 h-4 text-textPrimary" />
            )}
          </div>
        </div>

        {images.length > 0 ? (
          <>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              allowTouchMove={false}
              className="h-full"
            >
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={`${BASE_URL}/${image.url}`}
                    alt={car.carModel.name}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-4 bg-white" : "w-2 bg-white/50"}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <img
            src={car1}
            alt=""
            className="rounded-t-2xl w-full h-full object-cover"
          />
        )}
      </div>

      <div className="px-[20px] pb-5 text-textPrimary grid grid-rows-[1fr_auto_auto] flex-grow">
        <div>
          <div className="font-rale font-bold text-[20px] mt-6">
            {car.title}
          </div>
          <p className="line-clamp-1 text-sm font-dm "></p>
        </div>

        <div className="grid grid-cols-2 mt-6 gap-y-7">
          {"mileage" in car && car.mileage && (
            <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
              <Speedometer />
              {car.mileage} km
            </div>
          )}

          {"city" in car && car.city?.name && (
            <div className="flex items-center gap-2 text-xs text-textPrimary font-dm">
              <IoLocation className="shrink-0" />
              <div className="line-clamp-1">
                {"region" in car && car.region?.name
                  ? `${car.region?.name}, `
                  : ""}
                {car.city.name}
              </div>
            </div>
          )}
          {/* <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
            <Fuel />
            {car.fuelType.name}
          </div> */}
          <div className="flex items-center line-clamp-1 gap-2 text-xs text-textPrimary font-dm">
            <Gearbox />
            <div className="line-clamp-1">{car.transmission.name}</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-textPrimary font-dm">
            <Calendar />
            {dayjs(car.issueYear).format("YYYY")}
          </div>
        </div>

        <div>
          <div className="my-6 h-0.5 w-full bg-headerBorder"></div>
          <div className="flex items-center justify-between font-bold">
            <div>{car.carPrice.price} TMT</div>
            <div className="flex items-center cursor-pointer text-primary gap-2 font-dm font-medium">
              Подробно
              <BsArrowUpRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
