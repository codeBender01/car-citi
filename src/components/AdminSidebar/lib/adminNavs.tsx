import React from "react";
import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";

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
    text: "Категории",
    icon: <MdOutlineCategory className="w-5 h-5" />,
    path: "/admin/categories",
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
