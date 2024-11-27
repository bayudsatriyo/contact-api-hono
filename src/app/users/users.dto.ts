// users.dto.ts for users

export interface RegisterUserRequest {
  name: string;
  password: string;
  username: string;
}

export interface UserResponse {
  username: string;
  name: string;
  token?: string;
}

export interface UpdateUserRequest {
  name?: string;
  password?: string;
}

export interface LoginUserRequest extends Omit<RegisterUserRequest, "name"> {}
