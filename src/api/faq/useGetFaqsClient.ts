import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { FaqsClient } from "@/interfaces/faq.interface";

export const useGetFaqsClient = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<FaqsClient>> => {
      const { data } = await apiClient.get<ApiResponse<FaqsClient>>(
        `${BASE_URL}/faq/all`,
        {
          params: {
            page,
            pageSize,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllFaqsClient", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
