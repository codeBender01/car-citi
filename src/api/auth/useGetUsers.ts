import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { UsersResp } from "@/interfaces/auth.interface";

export const useGetUsers = (
  page: number = 1,
  pageSize: number = 10,
  accountType: string = "Business",
  search?: string,
) => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<UsersResp>> => {
      const { data } = await apiClient.get<ApiResponse<UsersResp>>(
        "/auth/users",
        {
          params: {
            page,
            pageSize,
            accountType,
            search,
          },
        },
      );
      return data;
    },
    queryKey: ["getAllCarMarks", page, pageSize, accountType, search],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
