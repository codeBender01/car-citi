import { getServiceOptions } from "./lib/serviceOptions";
import { IoIosCheckmark } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsArrowUpRight } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { PiUpload } from "react-icons/pi";
import { IoPricetagOutline, IoBookmark } from "react-icons/io5";

import CarImages from "./ui/CarImages";

import CarChars from "./ui/CarCharacteristics";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import CarsCarousel from "../Home/ui/CarsCarousel";
import { useGetOnePost } from "@/api/posts/useGetOnePost";
import { useGetSimilar } from "@/api/posts/useGetSimilar";
import { useAddPostToFavorites } from "@/api/posts/useAddToFavorites";

import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";

import dayjs from "dayjs";

const CarDetails = () => {
  const [expandedChars, setExpandedChars] = useState<string[]>([]);
  const [showPhone, setShowPhone] = useState(false);

  const { id } = useParams();
  const { i18n, t } = useTranslation();

  const toggleChar = (id: string) => {
    setExpandedChars((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const { data: oneCar, isLoading } = useGetOnePost(
    i18n.language,
    id as string,
  );

  console.log(oneCar);
  const { data: similarPosts } = useGetSimilar(i18n.language, id as string);
  const { toast } = useToast();
  const addToFavorites = useAddPostToFavorites();

  const car = oneCar?.data;

  const serviceOptions = getServiceOptions(t, car?.verifiedStatus);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `${car?.carMark?.name} ${car?.carModel?.name}`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: t("carDetailsPage.linkCopied"),
        variant: "success",
        duration: 2000,
      });
    }
  };

  const handleBookmark = async () => {
    if (!id) return;

    try {
      await addToFavorites.mutateAsync(id);
      toast({
        title: car?.isFavorite
          ? t("carDetailsPage.favorites.removed")
          : t("carDetailsPage.favorites.added"),
        description: car?.isFavorite
          ? t("carDetailsPage.favorites.removedDescription")
          : t("carDetailsPage.favorites.addedDescription"),
        variant: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: t("carDetailsPage.favorites.error"),
        description: t("carDetailsPage.favorites.errorDescription"),
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pt-8 lg:pt-[120px] xl:pt-[180px] flex items-center justify-center min-h-[50vh]">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <div className="pt-8 lg:pt-[120px] xl:pt-[180px] px-0 lg:px-10 xl:px-20 2xl:px-[118px]">
      <div className="font-dm text-[15px] hidden lg:flex gap-1">
        <Link to="/" className="text-primary hover:underline">
          {t("carDetailsPage.breadcrumb.home")}
        </Link>{" "}
        /{" "}
        <Link to="/all-cars" className="text-primary hover:underline">
          {t("carDetailsPage.breadcrumb.carsForSale")}
        </Link>{" "}
        / <span>{car?.title}</span>
      </div>
      <div className="lg:flex hidden h2 mt-5">{car?.title}</div>
      <p className="font-dm text-base lg:flex hidden">
        {car?.transmission?.name} • {dayjs(car?.issueYear).format("YYYY")}
      </p>
      <div className="mt-5 flex justify-between gap-4 xl:gap-0">
        <div className="w-full lg:w-[65%]">
          <ul className="hidden lg:flex items-center 2xl:flex-nowrap flex-wrap gap-4 text-[13px] 2xl:text-base font-dm">
            {serviceOptions.map((s) => {
              return (
                <li
                  key={s.id}
                  className="flex items-center gap-2.5 border border-grayBorder rounded-[100px] px-5 py-2 text-nowrap"
                >
                  {s.icon}
                  {s.text}
                </li>
              );
            })}
          </ul>
          <CarImages images={car?.images} />
          <div className="px-6">
            <div className="lg:hidden flex h2 mt-5">
              {car?.carMark?.name}, {car?.carModel?.name}
            </div>
            <p className="font-dm text-base lg:hidden flex">
              {car?.transmission?.name} • {dayjs(car?.issueYear).format("YYYY")}
            </p>
          </div>
          <div className="bg-white border border-grayBorder mx-6 lg:mx-0 p-6 lg:p-10 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
            <div className="text-[22px] md:text-[26px]">
              {t("carDetailsPage.description")}
            </div>
            <p className="mt-6 lg:mt-10 text-base font-light">{car?.damage}</p>
          </div>
          <div className="lg:hidden bg-white border border-grayBorder mx-6 p-6 mt-[15px] rounded-2xl font-dm">
            <div className="flex gap-4 text-textPrimary">
              <span>{t("carDetailsPage.price")}</span>
            </div>
            <div className="font-dm text-[30px] my-5 font-bold">
              {car?.carPrice?.price
                ? `${car.carPrice.price.toLocaleString()} TMT`
                : ""}
            </div>
            <div>{t("carDetailsPage.noNegotiation")}</div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showPhone
                  ? "max-h-20 opacity-100 mt-6 mb-3"
                  : "max-h-0 opacity-0 mt-0 mb-0"
              }`}
            >
              <a
                href={`tel:${car?.phone}`}
                className="text-primary font-dm text-lg font-bold hover:underline"
              >
                {car?.phone}
              </a>
            </div>
            <Button
              size="none"
              className={`text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center ${showPhone ? "" : "mt-6"} gap-2.5 py-4 px-[25px] w-fit`}
              onClick={() => setShowPhone((prev) => !prev)}
            >
              <IoPricetagOutline />
              {t("carDetailsPage.makeOffer")}
            </Button>
          </div>
          <div className="lg:hidden mx-6 mt-[15px]">
            <CarChars car={car} />
          </div>
          {/* {car?.carCharacteristics && car.carCharacteristics.length > 0 && (
            <div className="bg-white border border-grayBorder mx-6 lg:mx-0 p-6 lg:p-10 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
              <div className="text-[22px] md:text-[26px]">
                {t("carDetailsPage.features")}
              </div>
              <div className="mt-6 lg:mt-10 md:flex grid grid-cols-1 sm:grid-cols-2 md:gap-0 gap-8 justify-between">
                {car.carCharacteristics
                  .filter((char) => char.items && char.items.length > 0)
                  .map((s) => {
                    return (
                      <div className="" key={s.id}>
                        <div className="text-base 2xl:text-lg">{s.name}</div>
                        <ul className="flex flex-col gap-[22px] mt-5">
                          {s.items.map((item) => {
                            return (
                              <li
                                key={item.id}
                                className="flex text-xs 2xl:text-base gap-2.5 items-center"
                              >
                                <div className="w-5 h-5 rounded-full bg-[#EEF1FB] flex items-center justify-center">
                                  <IoIosCheckmark className="text-primary" />
                                </div>
                                {item.name}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
              </div>
            </div>
          )} */}
          {car?.carCharacteristics && car.carCharacteristics.length > 0 && (
            <div className="bg-white border border-grayBorder mx-6 lg:mx-0 p-6 lg:p-10 mt-[15px] md:mt-[30px] rounded-2xl font-dm">
              <div className="text-[22px] md:text-[26px]">
                {t("carDetailsPage.technicalSpecs")}
              </div>
              <div className="mt-6 md:mt-10 flex justify-between flex-col">
                {car.carCharacteristics
                  .filter((c) => c.items && c.items.some((item) => item.checked))
                  .map((c, index, arr) => {
                    const isExpanded = expandedChars.includes(c.id);
                    return (
                      <div
                        key={c.id}
                        className={`py-[30px] ${
                          index === arr.length - 1
                            ? ""
                            : "border-b border-grayBorder font-dm "
                        }`}
                      >
                        <div
                          className="text-lg flex items-center justify-between cursor-pointer"
                          onClick={() => toggleChar(c.id)}
                        >
                          {c.name}
                          <IoChevronDownOutline
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        <div
                          className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? "mt-[15px] md:mt-[30px] max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {c.items.filter((item) => item.checked).map((item) => (
                            <div
                              key={item.id}
                              className="text-base flex items-center w-full gap-2.5"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#EEF1FB] flex items-center justify-center shrink-0">
                                <IoIosCheckmark className="text-primary" />
                              </div>
                              <div>{item.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          {/* <Map /> */}
          {/* <Reviews />
          <LeaveReviewForm /> */}
        </div>
        <div className="hidden lg:flex flex-col gap-[30px] self-stretch">
          <div className="flex items-center justify-end gap-7 font-dm text-base">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              {t("carDetailsPage.send")}
              <div className=" bg-white border border-headerBorder p-3 rounded-full">
                <PiUpload size={14} />
              </div>
            </button>
            <button
              onClick={handleBookmark}
              disabled={addToFavorites.isPending}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {t("carDetailsPage.save")}
              <div className=" bg-white border border-headerBorder p-3 rounded-full">
                {car?.isFavorite ? (
                  <IoBookmark size={14} className="text-primary" />
                ) : (
                  <CiBookmark size={14} />
                )}
              </div>
            </button>
          </div>

          <div className="p-[30px] bg-white border border-grayBorder rounded-2xl font-dm">
            <div className="flex gap-4 text-textPrimary">
              <span>{t("carDetailsPage.price")}</span>
            </div>
            <div className="font-dm text-[30px] my-5 font-bold">
              {car?.carPrice?.price
                ? `${car.carPrice.price.toLocaleString()} TMT`
                : ""}
            </div>
            <div>{t("carDetailsPage.noNegotiation")}</div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                showPhone
                  ? "max-h-20 opacity-100 mt-10 mb-3"
                  : "max-h-0 opacity-0 mt-0 mb-0"
              }`}
            >
              <a
                href={`tel:${car?.phone}`}
                className="text-primary font-dm text-lg font-bold hover:underline"
              >
                {car?.phone}
              </a>
            </div>
            <Button
              size="none"
              className={`text-white bg-primary hover:bg-white hover:text-primary font-dm text-[15px] cursor-pointer rounded-xl flex items-center ${showPhone ? "" : "mt-10"} gap-2.5 py-4 px-[25px] w-fit`}
              onClick={() => setShowPhone((prev) => !prev)}
            >
              <IoPricetagOutline />
              {t("carDetailsPage.makeOffer")}
            </Button>
          </div>
          <CarChars car={car} />

          {/* <div className="p-[30px] bg-white border flex flex-col gap-5 border-grayBorder rounded-2xl font-dm">
            <div className="w-20 h-20 rounded-full">
              <img
                src={user}
                className="rounded-full object-cover w-full h-full"
                alt=""
              />
            </div>
            <div className="text-[20px] font-medium">Floyd Alexander</div>
            <div className="text-base">Консультант Mercedes-Benz</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-primary rounded-full bg-paleBlue p-2 2xl:p-3">
                  <HiOutlineLocationMarker />
                </div>
                <span className="text-sm 2xl:text-base">Ашхабад</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-primary rounded-full bg-paleBlue p-2 2xl:p-3">
                  <CgPhone />
                </div>
                <span className="text-sm 2xl:text-base">+90 533 888 4706</span>
              </div>
            </div>
            <Button
              size="none"
              className="text-white bg-primary  font-dm text-[15px] cursor-pointer rounded-xl flex items-center gap-2.5 py-4 px-[25px] w-full"
            >
              Написать дилеру
              <BsArrowUpRight />
            </Button>
            <Button
              size="none"
              className="text-whatsappGreen bg-white hover:bg-whatsappGreen hover:text-white border border-whatsappGreen font-dm text-[15px] cursor-pointer rounded-xl flex items-center  gap-2.5 py-4 px-[25px] w-full"
            >
              Связаться в Whatsapp
              <BsArrowUpRight />
            </Button>
          </div> */}
        </div>
      </div>
      {similarPosts && similarPosts.data.rows.length > 0 && (
        <div className="px-6 lg:px-0 mt-20 md:mt-[200px] w-full">
          <div className="flex items-center justify-between">
            <div className="font-rale text-[40px] text-textPrimary font-bold">
              {t("carDetailsPage.similarListings")}
            </div>
            <Link
              to={`/all-cars?similarTo=${id}`}
              className="flex cursor-pointer items-center gap-2 font-dm font-medium"
            >
              {t("carDetailsPage.viewAll")}
              <BsArrowUpRight />
            </Link>
          </div>

          <div className="px-6 bg-amber-50">
            <CarsCarousel
              posts={similarPosts.data.rows}
              totalCount={similarPosts.data.count}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
