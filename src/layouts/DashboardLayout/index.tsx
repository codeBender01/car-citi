import DashboardHeader from "@/components/DashboardHeader";
import DahsboardSidebar from "@/components/DashboardSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useGetProfile } from "@/api/auth/useGetProfile";

import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { error } = useGetProfile();

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/auth");
      }
    }
  }, [error, navigate]);

  return (
    <div className="w-full min-h-screen bg-darkGreen flex flex-col pb-4 md:pb-8">
      <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="flex justify-between px-4 md:pr-6 lg:pr-[30px] h-[80%] gap-4">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <DahsboardSidebar />
        </div>

        {/* Mobile Sidebar */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-[280px]">
            <DahsboardSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex-1 bg-white rounded-2xl overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
