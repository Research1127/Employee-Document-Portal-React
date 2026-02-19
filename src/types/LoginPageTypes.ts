export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  name: string;
}

export interface LoginError {
  error: string;
}