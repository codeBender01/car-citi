import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { NewCity, City } from "@/interfaces/regions.interface";

export const useAddCityToTheRegion = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("adminAccessToken");
  return useMutation({
    mutationFn: async (payload: NewCity): Promise<ApiResponse<City>> => {
      const { data } = await apiClient.post("/regions/city-upsert", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    mutationKey: ["addCity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getOneRegion"] });
    },
  });
};
