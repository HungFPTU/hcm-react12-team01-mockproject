import { LoginUser } from "../../model/LoginUser";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

export const AuthService = {
  login(params: LoginUser) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: "/api/auth",
      payload: params,
      isLoading: true,
    });
  },
  logout() {
    return BaseService.get<ApiResponse<any>>({
      url: "/api/auth/logout",
      isLoading: true,
    });
  },
  verifyToken(token: string) {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/auth/verify-token",
      payload: { token },
      isLoading: true,
    });
  },
  forgotPassword(email: string) {
    return BaseService.put<ApiResponse<null>>({
      url: "/api/auth/forgot-password",
      payload: { email },
      isLoading: true,
    });
  },
  
};
