import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OneCarMark } from "@/interfaces/carMarks.interface";

export const useGetOneCarMarkClient = (markId: string) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OneCarMark>> => {
      const { data } = await apiClient.get<ApiResponse<OneCarMark>>(
        `/cars/marks-details/${markId}`,
      );
      return data;
    },
    queryKey: ["getOneCarMark", markId],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!markId,
  });
};
