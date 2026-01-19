import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useGetAdminProfile } from "@/api/auth/useGetAdminProfile";
import axios from "axios";

const AdminLayout = () => {
  const adminAccessToken = localStorage.getItem("adminAccessToken");
  const navigate = useNavigate();
  const { isLoading, error } = useGetAdminProfile();

  useEffect(() => {
    if (error && axios.isAxiosError(error) && !adminAccessToken) {
      if (error.response?.status === 401) {
        localStorage.removeItem("adminAccessToken");
        navigate("/admin/login", { replace: true });
      }
    }
  }, [error, navigate]);

  if (!adminAccessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-darkGreen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
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
