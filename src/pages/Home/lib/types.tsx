import carType1 from "@assets/images/carType1.png";
import carType2 from "@assets/images/carType2.png";
import carType3 from "@assets/images/carType3.png";
import carType4 from "@assets/images/carType4.png";
import carType5 from "@assets/images/carType5.png";

import Suv from "@/svgs/cars/Suv";
import Sedan from "@/svgs/cars/Sedan";
import Hback from "@/svgs/cars/Hback";
import Cupe from "@/svgs/cars/Cupe";
import Ecar from "@/svgs/cars/Ecar";

export const types = [
  {
    num: "230 Авто",
    type: "SUV",
    img: carType1,
    icon: <Suv />,
  },
  {
    num: "123 Авто",
    type: "Седан",
    img: carType2,
    icon: <Sedan />,
  },
  {
    num: "345 Авто",
    type: "Хэтчбек",
    img: carType3,
    icon: <Hback />,
  },
  {
    num: "56 Авто",
    type: "Купе",
    img: carType4,
    icon: <Cupe />,
  },
  {
    num: "23 Авто",
    type: "Электро и Гибридные",
    img: carType5,
    icon: <Ecar />,
  },
];
