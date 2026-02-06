import FullList from "@/svgs/FullList";
import PriceTag from "@/svgs/PriceTag";
import Diamond from "@/svgs/Diamond";
import CarService from "@/svgs/CarService";
import type { TFunction } from "i18next";

export const getWhyUs = (t: TFunction) => [
  {
    title: t("whyUs.securityTitle"),
    text: t("whyUs.securityDesc"),
    icon: <FullList />,
  },
  {
    title: t("whyUs.uniqueTitle"),
    text: t("whyUs.uniqueDesc"),
    icon: <Diamond />,
  },
  {
    title: t("whyUs.noMiddlemanTitle"),
    text: t("whyUs.noMiddlemanDesc"),
    icon: <PriceTag />,
  },
  {
    title: t("whyUs.verifiedOnlyTitle"),
    text: t("whyUs.verifiedOnlyDesc"),
    icon: <CarService />,
  },
];
