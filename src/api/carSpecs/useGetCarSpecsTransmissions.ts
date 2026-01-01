import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsTransmissionsList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsTransmissions = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsTransmissionsList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<
        ApiResponse<CarSpecsTransmissionsList>
      >("/car-specs/admin-transmission-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          pageSize,
        },
      });
      return data;
    },
    queryKey: ["getAllTransmissions", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};