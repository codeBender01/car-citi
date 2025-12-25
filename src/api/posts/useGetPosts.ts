import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { PostsFilters, PostsList } from "@/interfaces/posts.interface";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useGetPosts = ({ regionId }: PostsFilters = {}) => {
  return useQuery<ApiResponse<PostsList>>({
    queryKey: ["posts", regionId],
    queryFn: async () => {
      const { data } = await apiClient.get("/posts/all", {
        params: {
          regionId,
        },
      });
      return data;
    },
  });
};
