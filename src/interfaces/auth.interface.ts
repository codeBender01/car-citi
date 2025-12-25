export interface SendOtp {
  phone: string;
  accountType: string;
}

export interface CheckOtp {
  phone: string;
  otp: string;
}

export interface CheckOtpRes {
  user: {
    id: string;
    phone: string;
    accountType: string;
    created: string;
    smsSubscribtion: boolean;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AdminSignInReq {
  login: string;
  password: string;
}

export interface AdminSignInResp {
  token: string;
  admin: {
    id: string;
    login: string;
    created: string;
    password: string;
  };
}
