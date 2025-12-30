import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewNewsTag, OneNewsTag } from "@/interfaces/news.interface";

export const useAddNewsTag = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (
      payload: NewNewsTag
    ): Promise<ApiResponse<OneNewsTag>> => {
      const { data } = await apiClient.post("/news/tag-upsert", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["addNewsTag"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllNewsTags"] });
    },
  });
};
