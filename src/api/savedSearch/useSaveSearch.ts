import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { SaveSearchReq } from "@/interfaces/savedSearch.interface";

export const useSaveSearch = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (
      payload: SaveSearchReq,
    ): Promise<ApiResponse<SaveSearchReq>> => {
      const { data } = await apiClient.post("/cars/save-search", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["saveSearch"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getSavedSearches"] });
    },
  });
};
