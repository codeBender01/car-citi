import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OnePost } from "@/interfaces/posts.interface";

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (payload: string): Promise<ApiResponse<OnePost>> => {
      const { data } = await apiClient.delete("/posts/mine/" + payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["deletePost"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getOwnPosts", "getAllPosts"],
      });
    },
  });
};
