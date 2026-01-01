import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { IoCarSport } from "react-icons/io5";

interface SubPath {
  name: string;
  path: string;
}

interface AdminNav {
  text: string;
  icon: React.ReactElement;
  path: string;
  subPaths?: SubPath[];
}

export const adminNavs: AdminNav[] = [
  {
    text: "Характеристики автомобиля",
    icon: <IoCarSport className="w-5 h-5" />,
    path: "/admin/car-specs",
    subPaths: [
      {
        name: "Категории",
        path: "/admin/car-specs/categories",
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
        name: "Тип продажи",
        path: "/admin/car-specs/sale-type",
      },
      {
        name: "Характеристики",
        path: "/admin/car-specs/characteristics",
      },
      {
        name: "Цвет",
        path: "/admin/car-specs/color",
      },
    ],
  },
  {
    text: "Регионы",
    icon: <HiOutlineLocationMarker className="w-5 h-5" />,
    path: "/admin/regions",
  },
  {
    text: "Новости",
    icon: <IoNewspaperOutline className="w-5 h-5" />,
    path: "/admin/news",
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
  },
  {
    text: "FAQ",
    icon: <FaQuestion className="w-5 h-5" />,
    path: "/admin/faq",
  },
  {
    text: "Выход",
    icon: <BiLogOut className="w-5 h-5" />,
    path: "/home",
  },
];
