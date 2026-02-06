export const getTechChars = (t: (key: string) => string) => [
  {
    id: 1,
    text: t("technicalSpecs.engineTransmission"),
  },
  {
    id: 2,
    text: t("technicalSpecs.dimensions"),
  },
  {
    id: 3,
    text: t("technicalSpecs.other"),
  },
];
