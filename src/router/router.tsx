import { useRoutes } from "react-router-dom";

import ClientLayout from "../layouts/ClientLayout";

import Home from "@/pages/Home";

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
      ],
    },
  ]);

  return routes;
}
