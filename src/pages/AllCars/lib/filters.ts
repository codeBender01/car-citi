export const regions = [
  "Ашхабад",
  "Мары",
  "Туркменабат",
  "Дашогуз",
  "Балканабат",
  "Туркменбаши",
  "Теджен",
  "Сердар",
];

export const bodyTypes = [
  { id: "suv", label: "SUV  (1,456)" },
  { id: "sedan", label: "Седан  (1,456)" },
  { id: "hatchback", label: "Хэтчбек  (1,456)" },
  { id: "coupe", label: "Купе  (1,456)" },
  { id: "hybrid", label: "Гибрид  (1,456)" },
];

export const transmissions = [
  { id: "suv", label: "Автомат  (1,456)" },
  { id: "sedan", label: "Ручная  (1,456)" },
  { id: "hatchback", label: "Вариатор  (1,456)" },
];

export const fuelTypes = [
  { id: "suv", label: "Дизель  (1,456)" },
  { id: "sedan", label: "Бензин  (1,456)" },
  { id: "hatchback", label: "Гибрид  (1,456)" },
  { id: "hatchback", label: "Электрический  (1,456)" },
];

export const chars = [
  { id: "suv", label: "Панорамная крыша  (1,456)" },
  { id: "sedan", label: "Bluetooth  (1,456)" },
  { id: "hatchback", label: "Руль с подогревом  (1,456)" },
  { id: "hatchback", label: "Сиденья с подогревом  (1,456)" },
  { id: "hatchback", label: "Apple CarPlay/Android Auto  (1,456)" },
  { id: "hatchback", label: "SRS Airbag - водитель  (1,456)" },
  { id: "hatchback", label: "ABS  (1,456)" },
];

export const years = Array.from({ length: 25 }, (_, i) =>
  (2024 - i).toString()
);
