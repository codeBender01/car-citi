export interface ProfileRes {
  accountType: string;
  created: string;
  id: string;
  phone: string;
  smsSubscribtion: boolean;
  userProfile?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface AdminProfileRes {
  id: string;
  login: string;
  created: string;
}

export interface UpdatePersonalProfileReq {
  smsSubscribtion: boolean;
  name: string;
  avatar: string;
}

export interface UpdateBusinessProfileReq {
  smsSubscribtion: boolean;
  name: string;
  logo: string;
  emails: string[];
  baranchAddresses: string[];
  socialMedia: {
    name: string;
    url: string;
  }[];
}
