import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneCarMark } from "@/interfaces/carMarks.interface";

export const useGetOneCarMark = (
  markId: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneCarMark>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<ApiResponse<OneCarMark>>(
        `/cars/admin-mark/${markId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            pageSize,
          },
        },
      );
      return data;
    },
    queryKey: ["getOneCarMark", markId, page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!markId,
  });
};
