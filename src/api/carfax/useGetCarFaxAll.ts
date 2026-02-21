import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarFaxList } from "@/interfaces/carfax.interface";

export const useGetCarFaxAll = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery<ApiResponse<CarFaxList>>({
    queryKey: ["carFaxAll"],
    queryFn: async () => {
      const { data } = await apiClient.get("/cars/car-fax-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};
