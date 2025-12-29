import { useRoutes, Navigate } from "react-router-dom";
import { lazy } from "react";

import ClientLayout from "../layouts/ClientLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdminLayout from "@/layouts/AdminLayout";

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

// Admin pages
const AdminLogin = lazy(() => import("@pages/Admin/Login"));
const Categories = lazy(() => import("@pages/Admin/Categories"));
const Regions = lazy(() => import("@pages/Admin/Regions"));
const Cities = lazy(() => import("@pages/Admin/Cities"));
const News = lazy(() => import("@pages/Admin/News"));
const Feedbacks = lazy(() => import("@pages/Admin/Feedbacks"));
const Faq = lazy(() => import("@pages/Admin/Faq"));

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
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
      path: "/admin/login",
      element: <AdminLogin />,
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
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "regions",
          element: <Regions />,
        },
        {
          path: "regions/:id",
          element: <Cities />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "feedbacks",
          element: <Feedbacks />,
        },
        {
          path: "faq",
          element: <Faq />,
        },
      ],
    },
  ]);

  return routes;
}
