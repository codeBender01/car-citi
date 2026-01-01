import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarSpecsSaleTypesList } from "@/interfaces/carSpecs.interface";

export const useGetCarSpecsSaleTypes = (
  page: number = 1,
  pageSize: number = 10
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<CarSpecsSaleTypesList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const { data } = await apiClient.get<
        ApiResponse<CarSpecsSaleTypesList>
      >("/car-specs/admin-sale-type-all", {
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
    queryKey: ["getAllSaleTypes", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};