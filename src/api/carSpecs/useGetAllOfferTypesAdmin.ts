import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OfferTypesList } from "@/interfaces/carSpecs.interface";

export const useGetSubcategories = (
  page: number = 1,
  pageSize: number = 10,
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OfferTypesList>> => {
      const token = localStorage.getItem("adminAccessToken");

      const { data } = await apiClient.get<ApiResponse<OfferTypesList>>(
        "/car-specs/admin-offer-type-all",
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
    queryKey: ["getAllOfferTypesAdmin", page, pageSize],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
