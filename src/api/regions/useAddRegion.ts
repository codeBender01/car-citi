import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewRegion } from "@/interfaces/regions.interface";

export const useAddFaq = () => {
  return useMutation({
    mutationFn: async (payload: NewRegion): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.post("/regions/upsert", payload);
      return data;
    },
    mutationKey: ["addRegion"],
  });
};
