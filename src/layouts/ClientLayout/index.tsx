import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";

const ClientLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className="max-w-480 mx-auto bg-mainBg">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default ClientLayout;
