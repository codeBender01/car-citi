import Home from "@/svgs/sidebar/Home";
import AddPost from "@/svgs/sidebar/AddPost";
import MyPosts from "@/svgs/sidebar/MyPosts";
import { CiBookmark } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { BsPersonSquare } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

export const sideNavs = [
  {
    text: "Дашборд",
    icon: <Home />,
    path: "/dashboard",
  },
  {
    text: "Мои объявления",
    icon: <MyPosts />,
    path: "/dashboard/posted",
  },
  {
    text: "Добавлять объявления",
    icon: <AddPost />,
    path: "/dashboard/add",
  },
  {
    text: "Избранное",
    icon: <CiBookmark />,
    path: "/dashboard/favorites",
  },
  {
    text: "Сохранённые поиски",
    icon: <RiSearchLine />,
    path: "/dashboard/saved-search",
  },
  {
    text: "Сообщения",
    icon: <LuMessagesSquare />,
    path: "/dashboard/messages",
  },
  {
    text: "Профиль",
    icon: <BsPersonSquare />,
    path: "/dashboard/profile",
  },
  {
    text: "Выход",
    icon: <BiLogOut />,
    path: "/",
  },
];
