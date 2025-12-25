import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

import { apiClient } from "..";

export const useGetFaqs = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<RegionsAllRes>> => {
      const { data } = await apiClient.get<ApiResponse<RegionsAllRes>>(
        `${BASE_URL}/faq/all`
      );
      return data;
    },
    queryKey: ["getAllFaqs"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
