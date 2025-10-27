import Header from "@components/Header";
import Footer from "@components/Footer";

import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <main className="max-w-[1920px] mx-auto bg-mainBg">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default ClientLayout;
