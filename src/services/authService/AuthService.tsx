import { LoginUser } from "../../model/LoginUser";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

export const AuthService = {
  login(params: LoginUser) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: '/api/auth',
      payload: params,
      isLoading: true,
    });
  },
  logout(params: string) {
    return BaseService.get<ApiResponse<any>>({
      url: '/api/auth/logout',
      isLoading: true,
      headers: {
        'Authorization': `Bearer ${params}`
      },
    });
  },
  verifyToken(token: string) {
    return BaseService.post<ApiResponse<any>>({
      url: '/api/auth/verify-token',
      payload: {token},
      isLoading: true,
    });
  },
};