import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarMarksList } from "@/interfaces/carMarks.interface";

export const useGetCarMarksClient = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarMarksList>> => {
      const { data } = await apiClient.get<ApiResponse<CarMarksList>>(
        "/cars/marks-all",
        {
          params: {
            page,
            pageSize,
          },
        }
      );
      return data;
    },
    queryKey: ["getAllCarMarks", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
