import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { PostsList, AdminCarsParams } from "@/interfaces/posts.interface";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";

export const useGetAdminCars = (params?: AdminCarsParams) => {
  const { page = 1, pageSize = 10, search, status, language = "ru" } = params || {};
  const token = localStorage.getItem("adminAccessToken");

  return useQuery<ApiResponse<PostsList>>({
    queryKey: ["adminCars", page, pageSize, search, status, language],
    queryFn: async () => {
      const queryParams: Record<string, any> = {
        page,
        pageSize,
      };

      if (search) {
        queryParams.search = search;
      }

      if (status) {
        queryParams.status = status;
      }

      const { data } = await apiClient.get("/cars/fetch-cars", {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,
        },
      });
      return data;
    },
  });
};
