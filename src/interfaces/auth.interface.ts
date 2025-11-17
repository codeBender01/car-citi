export interface SendOtp {
  phone: string;
  accountType: string;
}

export interface CheckOtp {
  phone: string;
  otp: string;
}
