import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  IoNewspaperOutline,
  IoChatbubblesOutline,
  IoDocumentTextOutline,
  IoMedkitOutline,
} from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";
import { TbBrandToyota } from "react-icons/tb";
import { HiOutlineChartBar, HiOutlineUserGroup } from "react-icons/hi";
import { MdDirectionsCar, MdPendingActions } from "react-icons/md";
import { MdViewCarousel } from "react-icons/md";

interface SubPath {
  name: string;
  path: string;
}

export interface AdminNav {
  text: string;
  icon: React.ReactElement;
  path: string;
  subPaths?: SubPath[];
  roles?: string[];
}

export const adminNavs: AdminNav[] = [
  {
    text: "Характеристики автомобиля",
    icon: <IoCarSport className="w-5 h-5" />,
    path: "/admin/car-specs",
    roles: ["admin"],
    subPaths: [
      {
        name: "Категории",
        path: "/admin/car-specs/categories",
      },
      {
        name: "Тип кузова",
        path: "/admin/car-specs/subcategories",
      },
      {
        name: "Состояние",
        path: "/admin/car-specs/condition",
      },
      {
        name: "Тип привода",
        path: "/admin/car-specs/drive-type",
      },
      {
        name: "Трансмиссия",
        path: "/admin/car-specs/transmission",
      },
      {
        name: "Тип топлива",
        path: "/admin/car-specs/fuel-type",
      },
      {
        name: "Тип предложения",
        path: "/admin/car-specs/offer-type",
      },
      {
        name: "Характеристики",
        path: "/admin/car-specs/characteristics",
      },
      {
        name: "Цвет",
        path: "/admin/car-specs/color",
      },
      {
        name: "Комплектация",
        path: "/admin/car-specs/equipment",
      },
    ],
  },
  {
    text: "Марки машин",
    icon: <TbBrandToyota className="w-5 h-5" />,
    path: "/admin/car-marks",
    roles: ["admin"],
  },
  {
    text: "Регионы",
    icon: <HiOutlineLocationMarker className="w-5 h-5" />,
    path: "/admin/regions",
    roles: ["admin"],
  },
  {
    text: "Новости",
    icon: <IoNewspaperOutline className="w-5 h-5" />,
    path: "/admin/news",
    roles: ["admin"],
    subPaths: [
      {
        name: "Новости",
        path: "/admin/news/index",
      },
      {
        name: "Категории",
        path: "/admin/news/categories",
      },
      {
        name: "Тэги",
        path: "/admin/news/tags",
      },
    ],
  },
  {
    text: "Отзывы",
    icon: <VscFeedback className="w-5 h-5" />,
    path: "/admin/feedbacks",
    roles: ["admin", "supportOperator"],
  },
  {
    text: "FAQ",
    icon: <FaQuestion className="w-5 h-5" />,
    path: "/admin/faq",
    roles: ["admin"],
  },
  {
    text: "Баннеры",
    icon: <MdViewCarousel className="w-5 h-5" />,
    path: "/admin/banners",
    roles: ["admin"],
  },
  {
    text: "Чат",
    icon: <IoChatbubblesOutline className="w-5 h-5" />,
    path: "/admin/chat",
    roles: ["admin", "supportOperator"],
  },
  {
    text: "Обьявления",
    icon: <MdDirectionsCar className="w-5 h-5" />,
    path: "/admin/cars",
    roles: ["admin", "moderator"],
  },
  {
    text: "Заявки на проверку авто",
    icon: <MdPendingActions className="w-5 h-5" />,
    path: "/admin/car-requests",
    roles: ["admin", "moderator"],
  },
  {
    text: "Сотрудники",
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    path: "/admin/admins",
    roles: ["admin"],
  },
  {
    text: "Статистика",
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    path: "/admin/stats",
    roles: ["admin"],
  },
  {
    text: "Диагностика",
    icon: <IoMedkitOutline className="w-5 h-5" />,
    path: "/admin/car-diagnostics",
    roles: ["admin", "moderator"],
  },
  {
    text: "Карфакс",
    icon: <IoDocumentTextOutline className="w-5 h-5" />,
    path: "/admin/carfax",
    roles: ["admin", "moderator"],
  },
  {
    text: "Выход",
    icon: <BiLogOut className="w-5 h-5" />,
    path: "/home",
  },
];
