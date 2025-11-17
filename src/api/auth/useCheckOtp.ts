import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { CheckOtp } from "@/interfaces/auth.interface";

export const useCheckOtp = () => {
  return useMutation({
    mutationFn: async (payload: CheckOtp): Promise<ApiResponse<any>> => {
      const { data } = await axios.post(`${BASE_URL}/auth/check-otp`, payload);
      return data;
    },
    mutationKey: ["checkOtp"],
  });
};
