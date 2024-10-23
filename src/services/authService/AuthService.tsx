import { BaseService } from "../config/base.service";
import { LoginUser, Token } from "../../model/LoginUser";
// import { ApiResponse } from "../../model/ApiResponse";
export const AuthService = {
  login(params: LoginUser){
        return BaseService.post<Token>({
            url: 'api/auth',
            payload: params,
            isLoading: true,
        }
    )
  }
};
