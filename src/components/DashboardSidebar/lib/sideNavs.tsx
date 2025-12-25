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
    textKey: "dashboard.dashboard",
    icon: <Home />,
    path: "/dashboard",
  },
  {
    textKey: "dashboard.myListings",
    icon: <MyPosts />,
    path: "/dashboard/posted",
  },
  {
    textKey: "dashboard.addListings",
    icon: <AddPost />,
    path: "/dashboard/add",
  },
  {
    textKey: "dashboard.favorites",
    icon: <CiBookmark />,
    path: "/dashboard/favorites",
  },
  {
    textKey: "dashboard.savedSearches",
    icon: <RiSearchLine />,
    path: "/dashboard/saved-search",
  },
  {
    textKey: "dashboard.messages",
    icon: <LuMessagesSquare />,
    path: "/dashboard/messages",
  },
  {
    textKey: "dashboard.profile",
    icon: <BsPersonSquare />,
    path: "/dashboard/profile",
  },
  {
    textKey: "common.logout",
    icon: <BiLogOut />,
    path: "/",
  },
];
