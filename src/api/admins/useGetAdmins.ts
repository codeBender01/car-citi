import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { AdminsList } from "@/interfaces/admins.interface";

export const useGetAdmins = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<AdminsList>> => {
      const { data } = await apiClient.get<ApiResponse<AdminsList>>(
        `${BASE_URL}/auth/admins`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllAdmins"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
