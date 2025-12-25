import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

import { Outlet, Navigate } from "react-router-dom";

const AdminLayout = () => {
  const adminAccessToken = localStorage.getItem("adminAccessToken");

  if (!adminAccessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="w-full min-h-screen bg-darkGreen flex flex-col pb-8">
      <AdminHeader />

      <div className="flex justify-between pr-[30px] h-[80%]">
        <AdminSidebar />
        <div className="flex-1 bg-white rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
