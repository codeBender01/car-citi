import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { FaqsClient } from "@/interfaces/faq.interface";

import { apiClient } from "..";

export const useGetFaqs = (language: string) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<FaqsClient>> => {
      const { data } = await apiClient.get<ApiResponse<FaqsClient>>(
        `${BASE_URL}/faq/all`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllFaqs", language],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
