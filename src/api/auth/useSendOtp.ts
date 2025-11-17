import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../index";
import type { ApiResponse } from "@/interfaces/apiResponse.interface";
import type { SendOtp } from "@/interfaces/auth.interface";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (payload: SendOtp): Promise<ApiResponse<any>> => {
      const { data } = await axios.post(`${BASE_URL}/auth/send-otp`, payload);
      return data;
    },
    mutationKey: ["senOtp"],
  });
};
