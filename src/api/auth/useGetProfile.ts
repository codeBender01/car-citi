import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { ProfileRes } from "@/interfaces/profile.interface";

export const useGetProfile = (isAdmin = false) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<ProfileRes>> => {
      const token = localStorage.getItem(isAdmin ? "adminAccessToken" : "accessToken");

      const { data } = await apiClient.get<ApiResponse<ProfileRes>>(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: isAdmin ? ["getAdminProfile"] : ["getCurrentUser"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};
