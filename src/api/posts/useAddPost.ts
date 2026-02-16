import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewPostReq, OnePost } from "@/interfaces/posts.interface";

export const useAddPost = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");
  return useMutation({
    mutationFn: async (payload: NewPostReq): Promise<ApiResponse<OnePost>> => {
      const { data } = await apiClient.post("/posts/upsert", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["addPost"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOwnPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getHomeClient"] });
    },
  });
};
