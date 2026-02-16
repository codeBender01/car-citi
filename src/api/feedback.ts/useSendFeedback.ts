import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { SendFeedback } from "@/interfaces/feedback.interface";

export const useSendFeedback = () => {
  return useMutation({
    mutationFn: async (payload: SendFeedback): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.post("/feedback/create", payload, {});
      return data;
    },
    mutationKey: ["sendFeedback"],
  });
};
