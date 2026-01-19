import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { PostsList } from "@/interfaces/posts.interface";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useGetSimilar = (language: string = "ru", id: string) => {
  const token = localStorage.getItem("accessToken");
  return useQuery<ApiResponse<PostsList>>({
    queryKey: ["getSimilarPosts"],
    queryFn: async () => {
      const { data } = await apiClient.get("/posts/similar/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,
        },
      });
      return data;
    },
  });
};
