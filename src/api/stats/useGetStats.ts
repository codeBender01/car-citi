import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  StatsRequest,
  StatsResponse,
} from "@/interfaces/stats.interface";

export const useGetStats = () => {
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: StatsRequest
    ): Promise<ApiResponse<StatsResponse>> => {
      const { data } = await apiClient.post("/cars/statistics", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["getStats"],
  });
};