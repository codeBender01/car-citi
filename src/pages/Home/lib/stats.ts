import type { TFunction } from "i18next";

export const getStats = (t: TFunction) => [
  {
    num: "1,445",
    text: t("stats.listings"),
  },
  {
    num: "166",
    text: t("stats.dealers"),
  },
  {
    num: "10123",
    text: t("stats.users"),
  },
  {
    num: "556",
    text: t("stats.successfulDeals"),
  },
];
