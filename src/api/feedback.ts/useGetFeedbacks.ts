import { BASE_URL } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

import { apiClient } from "..";
import type { FeedbacksList } from "@/interfaces/feedback.interface";

interface GetFeedbacksParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const useGetFeedbacks = (params?: GetFeedbacksParams) => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery({
    queryFn: async (): Promise<ApiResponse<FeedbacksList>> => {
      const { data } = await apiClient.get<ApiResponse<FeedbacksList>>(
        `${BASE_URL}/feedback/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: params?.page,
            pageSize: params?.pageSize,
            search: params?.search,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllFeedbacks", params?.page, params?.pageSize, params?.search],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
