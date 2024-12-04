import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api";
import { User } from "../../model/User";
import { ReponseSuccess } from "../../app/reponse";
import { RegisterInstructorPublicParams,RegisterStudentPublicParams } from "../../model/admin/request/Register.request";
import { RegisterGooglePublicResponse } from "../../model/admin/response/Register.response";
export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export const AuthService = {
  login(params: { email: string; password: string }) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: API.AUTH.LOGIN,
      payload: params,
      isLoading: true,
    });
  },
  loginGoogle(params: { google_id: string }) {
    return BaseService.post<ApiResponse<{ token: string }>>({
      url: API.AUTH.LOGIN_GOOGLE,
      payload: params,
      isLoading: true
    });
  },
  registerGooglePublic(params: RegisterStudentPublicParams | RegisterInstructorPublicParams) {
    return BaseService.post<ApiResponse<RegisterGooglePublicResponse>>({
      url: API.AUTH.REGISTER_GOOGLE_PUBLIC,
      payload: params,
      isLoading: true
    });
  },
  logout() {
    return BaseService.get<ApiResponse<any>>({
      url: API.AUTH.LOGOUT,
      isLoading: true,
    });
  },
  verifyToken(token: string) {
    return BaseService.post<ApiResponse<any>>({
      url: API.AUTH.VERIFY_TOKEN,
      payload: { token },
      isLoading: true,
    });
  },
  forgotPassword(email: string) {
    return BaseService.put<ReponseSuccess<string>>({
      url: API.AUTH.FORGOT_PASSWORD,
      payload: { email },
      isLoading: true,
    });
  },

  getUserRole(params: { token: string }) {
    return BaseService.get<ApiResponse<User>>({
      url: API.AUTH.LOGIN,
      payload: params,
    });
  },

  register(params: RegisterUser) {
    return BaseService.post<ApiResponse<User>>({
      url: API.AUTH.REGISTER,
      payload: params,
      isLoading: true,
    });
  },

  resendToken(params: { email: string }) {
    return BaseService.post<ApiResponse<string>>({
      url: API.AUTH.RESEND_TOKEN,
      payload: params,
      isLoading: true
    });
  },

  
};
