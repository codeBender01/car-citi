import { BASE_URL } from "..";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { ProfileRes } from "@/interfaces/profile.interface";

export const useGetProfile = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<ProfileRes>> => {
      const token = localStorage.getItem("accessToken");

      const { data } = await axios.get<ApiResponse<ProfileRes>>(
        `${BASE_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    queryKey: ["getCurrentUser"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
