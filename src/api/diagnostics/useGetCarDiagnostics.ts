import { apiClient } from "..";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type {
  DiagnosticsList,
  DiagnosticsParams,
} from "@/interfaces/diagnostics.interface";

export const useGetCarDiagnostics = (params?: DiagnosticsParams) => {
  const {
    page = 1,
    pageSize = 10,
    search,
    carMarkId,
    carModelId,
    regionId,
    cityId,
  } = params || {};

  return useQuery({
    queryFn: async (): Promise<ApiResponse<DiagnosticsList>> => {
      const token = localStorage.getItem("adminAccessToken");
      const queryParams: Record<string, unknown> = { page, pageSize };
      if (search) queryParams.search = search;
      if (carMarkId) queryParams.carMarkId = carMarkId;
      if (carModelId) queryParams.carModelId = carModelId;
      if (regionId) queryParams.regionId = regionId;
      if (cityId) queryParams.cityId = cityId;

      const { data } = await apiClient.get<ApiResponse<DiagnosticsList>>(
        "/cars/diagnostics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        },
      );
      return data;
    },
    queryKey: [
      "getCarDiagnostics",
      page,
      pageSize,
      search,
      carMarkId,
      carModelId,
      regionId,
      cityId,
    ],
  });
};
