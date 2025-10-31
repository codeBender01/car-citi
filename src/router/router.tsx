import { useRoutes } from "react-router-dom";
import { lazy } from "react";

import ClientLayout from "../layouts/ClientLayout";

import Home from "@/pages/Home";

const AboutUs = lazy(() => import("@pages/AboutUs"));
const CarDetails = lazy(() => import("@pages/CarDetails"));

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
      ],
    },
  ]);

  return routes;
}
