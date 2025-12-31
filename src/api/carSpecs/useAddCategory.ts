import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewNews } from "@/interfaces/news.interface";

export const useAddNews = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: NewNews): Promise<ApiResponse<any>> => {
      const { data } = await apiClient.post(
        "/car-specs/admin-category-upsert",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    mutationKey: ["addNews"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllNewsAdmin"] });
    },
  });
};
