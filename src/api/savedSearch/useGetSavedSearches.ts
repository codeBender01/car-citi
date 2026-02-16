import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { SaveSearchList } from "@/interfaces/savedSearch.interface";

export const useGetSavedSearches = () => {
  const token = localStorage.getItem("accessToken");
  return useQuery<ApiResponse<SaveSearchList>>({
    queryKey: ["getSavedSearches"],
    queryFn: async () => {
      const { data } = await apiClient.get("/cars/saved-searches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};
