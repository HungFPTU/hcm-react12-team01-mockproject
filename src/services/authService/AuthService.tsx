// import { LoginUser } from "../../model/LoginUser";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api";
import { User } from "../../model/User";
import { ReponseSuccess } from "../../app/reponse";


export const AuthService = {
  login(params: { email: string; password: string }) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: API.AUTH.LOGIN,
      payload: params,
      isLoading: true
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
    return BaseService.put<ReponseSuccess<string>>({
      url: "/api/auth/forgot-password",
      payload: { email },
      isLoading: true,
    });
  },
  getUserRole(params: { token: string }) {
    return BaseService.get<ApiResponse<User>>({
      url: API.AUTH.LOGIN,
      payload: params
    });
  }
};
