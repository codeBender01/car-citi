import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { AdminProfileRes } from "@/interfaces/profile.interface";

export const useGetAdminProfile = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<AdminProfileRes>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<AdminProfileRes>>(
        "/auth/admin-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getAdminProfile"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};
