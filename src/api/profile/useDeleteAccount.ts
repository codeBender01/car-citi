import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useDeleteAccount = () => {
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.delete(`/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["deleteAccount"],
  });
};
