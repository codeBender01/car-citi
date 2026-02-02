import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { ProfileRes } from "@/interfaces/profile.interface";

export const useGetProfile = () => {
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryFn: async (): Promise<ApiResponse<ProfileRes>> => {
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
    queryKey: ["getCurrentUser"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    enabled: !!token,
  });
};
