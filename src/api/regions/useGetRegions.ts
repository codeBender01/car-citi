import { BASE_URL } from "..";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

export const useGetRegions = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<RegionsAllRes>> => {
      const { data } = await axios.get<ApiResponse<RegionsAllRes>>(
        `${BASE_URL}/regions/all`
      );
      return data;
    },
    queryKey: ["getAllRegions"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
