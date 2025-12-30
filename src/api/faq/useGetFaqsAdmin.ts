import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { FaqsAdmin } from "@/interfaces/faq.interface";

export const useGetFaqsAdmin = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<FaqsAdmin>> => {
      const { data } = await apiClient.get<ApiResponse<FaqsAdmin>>(
        `${BASE_URL}/faq/admin-all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllFaqsAdmin"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
