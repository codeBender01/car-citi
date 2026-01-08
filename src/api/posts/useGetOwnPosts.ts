import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { PostsList } from "@/interfaces/posts.interface";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useGetOwnPosts = (language: string = "tk") => {
  const token = localStorage.getItem("accessToken");
  return useQuery<ApiResponse<PostsList>>({
    queryKey: ["getOwnPosts"],
    queryFn: async () => {
      const { data } = await apiClient.get("/posts/mine", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,
        },
      });
      return data;
    },
  });
};
