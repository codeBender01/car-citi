import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useDeleteSavedSearch = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (payload: string): Promise<ApiResponse<string>> => {
      const { data } = await apiClient.post(
        `/cars/save-search-remove/${payload}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    mutationKey: ["deleteSavedSearch"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSavedSearches"] });
    },
  });
};
