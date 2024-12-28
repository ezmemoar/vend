export type User = {
  uid: string;
  name: string;
  email: string;
};

export type UserAuth = {
  access_token: string;
  refresh_token: string;
  expired_at: string;
  expires_in: number;
  data: User;
};
