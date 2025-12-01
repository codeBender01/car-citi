import { MdOutlineCategory } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";

export const adminNavs = [
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
  },
  {
    text: "Отзывы",
    icon: <VscFeedback className="w-5 h-5" />,
    path: "/admin/feedbacks",
  },
  {
    text: "Выход",
    icon: <BiLogOut className="w-5 h-5" />,
    path: "/",
  },
];