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

export interface UsersResp {
  count: number;
  users: OneUser[];
}

export interface OneUser {
  accountType: string;
  created: string;
  id: string;
  phone: string;
  smsSubscribtion: string;
  businesProfile?: {
    baranchAddresses: string[];
    emails: string[];
    id: string;
    logo: string;
    name: string;
    socialMedia: {
      name: string;
      url: string;
    }[];
  };
  userProfile?: {
    avatar: string;
    email: string;
    id: string;
    name: string;
  };
}
