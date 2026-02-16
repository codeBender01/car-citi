import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { ProfileRes } from "@/interfaces/profile.interface";

export const useGetProfile = () => {
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryFn: async (): Promise<ApiResponse<ProfileRes>> => {
      const currentToken = localStorage.getItem("accessToken");
      const { data } = await apiClient.get<ApiResponse<ProfileRes>>(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getCurrentUser", token],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!token,
  });
};
