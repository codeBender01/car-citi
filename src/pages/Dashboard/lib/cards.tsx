import MyPostsLarge from "@/svgs/sidebar/MyPostsLarge";
import { CiBookmark } from "react-icons/ci";
import { LuMessagesSquare } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";

export const cards = [
  {
    text: "Мои объявления",
    value: 15,
    icon: <MyPostsLarge />,
    isGreenIcon: true,
  },
  {
    text: "Сохранённые поиски",
    value: 19,
    icon: <RiSearchLine size={24} />,
  },
  {
    text: "Новые сообщения",
    value: 15,
    icon: <LuMessagesSquare size={24} />,
  },
  {
    text: "Мои избранные",
    value: 22,
    icon: <CiBookmark size={24} />,
  },
];
