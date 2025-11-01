import DashboardHeader from "@/components/DashboardHeader";
import DahsboardSidebar from "@/components/DashboardSidebar";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen bg-darkGreen flex flex-col pb-8">
      <DashboardHeader />

      <div className="flex justify-between pr-[30px] h-[80%]">
        <DahsboardSidebar />
        <div className="flex-1 bg-white rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
