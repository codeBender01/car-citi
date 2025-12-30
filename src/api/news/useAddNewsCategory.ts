import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewNewsCategory } from "@/interfaces/news.interface";

export const useAddNewsCategory = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: NewNewsCategory): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.post("/news/category-upsert", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["addNewsCategory"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllNewsCategories"] });
    },
  });
};
