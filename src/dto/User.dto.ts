export interface UserPayload {
  _id: string;
  email: string;
  verified: boolean;
  role: string
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  verified?: boolean;
  role?: string;
  phone?: number
}
