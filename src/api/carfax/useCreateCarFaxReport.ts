import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CarFaxReportReq } from "@/interfaces/carfax.interface";

export const useCreateCarFaxReport = () => {
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: CarFaxReportReq,
    ): Promise<ApiResponse<unknown>> => {
      const { data } = await apiClient.put("/cars/car-fax-report", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["createCarFaxReport"],
  });
};
