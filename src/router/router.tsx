import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import ClientLayout from "../layouts/ClientLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";

const AboutUs = lazy(() => import("@pages/AboutUs"));
const CarDetails = lazy(() => import("@pages/CarDetails"));
const AllCars = lazy(() => import("@pages/AllCars"));
const MyPosts = lazy(() => import("@pages/MyPosts"));
const Favorites = lazy(() => import("@pages/Favorites"));
const SavedSearch = lazy(() => import("@pages/SavedSearch"));
const Messages = lazy(() => import("@pages/Messages"));
const Profile = lazy(() => import("@pages/Profile"));
const AddCar = lazy(() => import("@pages/AddCar"));
const Auth = lazy(() => import("@pages/Auth"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/about",
          element: <AboutUs />,
        },
        {
          path: "/car-details",
          element: <CarDetails />,
        },
        {
          path: "/all-cars",
          element: <AllCars />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "add",
          element: <AddCar />,
        },
        {
          path: "posted",
          element: <MyPosts />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "saved-search",
          element: <SavedSearch />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return routes;
}
