import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { PostsList } from "@/interfaces/posts.interface";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useGetOwnPosts = (
  language: string = "tk",
  page: number = 1,
  pageSize: number = 10,
) => {
  const token = localStorage.getItem("accessToken");
  return useQuery<ApiResponse<PostsList>>({
    queryKey: ["getOwnPosts", language, page, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get("/posts/mine", {
        params: { page, pageSize },
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,
        },
      });
      return data;
    },
  });
};
