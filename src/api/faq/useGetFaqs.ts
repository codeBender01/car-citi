import { BASE_URL } from "..";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { RegionsAllRes } from "@/interfaces/regions.interface";

export const useGetFaqs = () => {
  return useQuery({
    queryFn: async (): Promise<ApiResponse<RegionsAllRes>> => {
      const { data } = await axios.get<ApiResponse<RegionsAllRes>>(
        `${BASE_URL}/faq/all`
      );
      return data;
    },
    queryKey: ["getAllFaqs"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
