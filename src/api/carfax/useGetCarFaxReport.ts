import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarFaxReportRes } from "@/interfaces/carfax.interface";

export const useGetCarFaxReport = (carId: string) => {
  const token = localStorage.getItem("adminAccessToken");
  return useQuery<ApiResponse<CarFaxReportRes>>({
    queryKey: ["carFaxReport", carId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/cars/car-fax-report/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    enabled: !!carId,
  });
};
