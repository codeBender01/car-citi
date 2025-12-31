import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useRemoveNews = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: string): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.delete(`/news/remove/${payload}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["removeNews"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllNewsAdmin"] });
    },
  });
};