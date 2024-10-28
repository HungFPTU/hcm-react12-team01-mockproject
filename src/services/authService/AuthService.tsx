import { LoginUser } from "../../model/LoginUser";
import { ApiResponse } from "../../model/response/ApiResponse";
import { BaseService } from "../config/base.service";

export interface AuthResponse {
  token: string;
}

export const AuthService = {
  login(params: LoginUser) {
    return BaseService.post<ApiResponse<AuthResponse>>({
      url: 'api/auth',
      payload: params,
      isLoading: true,
    });
  }
  
};