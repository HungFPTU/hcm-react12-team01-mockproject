import { LoginUser } from "../../model/LoginUser";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";
import { User } from "../../model/User.ts";

// export interface AuthResponse<T> {
//   success : boolean
//   data: T;
// }

export const AuthService = {
  login(params: LoginUser) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: "/api/auth",
      payload: params,
      isLoading: true,
    });
  },
  logout(params: string) {
    return BaseService.get<ApiResponse<any>>({
      url: "/api/auth/logout",
      isLoading: true,
      headers: {
        Authorization: `Bearer ${params}`,
      },
    });
  },
  forgotPassword(email: string) {
    return BaseService.put<ApiResponse<null>>({
      url: "/api/auth/forgot-password",
      payload: { email },
      isLoading: true,
    });
  },
  getCurrentUser() {
    return BaseService.get<ApiResponse<User>>({
      url: "/api/auth",
      isLoading: true,
    });
  },
};
