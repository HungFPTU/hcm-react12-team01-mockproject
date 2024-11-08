
import { API } from "../../const/path.api";
import { CreateSessionRequest } from "../../model/admin/request/Session.request";
import { CreateSessionResponse, Session } from "../../model/admin/response/Session.resonse";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const SessionService = {
    createSession(params: CreateSessionRequest) {
        return BaseService.post<ApiResponse<CreateSessionResponse>>({
            url: "/api/session",
            payload: params,
            isLoading: true,
        });
    },
    getSessionById(id: string) {
        return BaseService.get<ApiResponse<Session>>({
            url: API.SESSION.GET_SESSION.replace(":id", id)
        });
    },
};