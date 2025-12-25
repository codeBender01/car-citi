import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewFaq } from "@/interfaces/faq.interface";

export const useAddFaq = () => {
  return useMutation({
    mutationFn: async (payload: NewFaq): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.post("/faq/upsert", payload);
      return data;
    },
    mutationKey: ["addFaq"],
  });
};
