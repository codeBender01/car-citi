import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { OnePost } from "@/interfaces/posts.interface";

export const useGetOnePost = (language: string, id: string) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<OnePost>> => {
      const { data } = await apiClient.get<ApiResponse<OnePost>>(
        "/posts/details/" + id,

        {
          headers: {
            "Accept-Language": language,
          },
        },
      );
      return data;
    },
    queryKey: ["getOnePost", id, language],
    refetchOnWindowFocus: false,
  });
};
