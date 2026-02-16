export interface AdminsList {
  count: number;
  admins: OneAdmin[];
}

export interface OneAdmin {
  created: string;
  id: string;
  login: string;
  password: string;
  roles: string[];
}

export interface NewAdmin {
  login: string;
  password: string;
  roles: string[];
}

export interface EditAdminReq {
  id: string;
  login: string;
  roles: string[];
}

export interface ChangePasswordReq {
  id: string;
  oldPassword: string;
  newPassword: string;
}
