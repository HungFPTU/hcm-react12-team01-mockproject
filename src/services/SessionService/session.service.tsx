import { API } from "../../const/path.api";
import { CreateSessionRequest, GetSessionRequest } from "../../model/admin/request/Sesson.request";
import {
  CreateSessionResponse,
  GetSessionsResponse,
  Session,
} from "../../model/admin/response/Sesson.response";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const SessionService = {
  getSessions(params: GetSessionRequest) {
    return BaseService.post<ApiResponse<GetSessionsResponse>>({
      url: API.SESSION.GET_SESSIONS,
      payload: params
    });
  },
  createSession(params: CreateSessionRequest) {
    return BaseService.post<ApiResponse<CreateSessionResponse>>({
      url: "/api/session",
      payload: params,
      isLoading: true,
    });
  },
  getSessionById(id: string) {
    return BaseService.get<ApiResponse<Session>>({
      url: API.SESSION.GET_SESSION.replace(":id", id),
    });
  },
  deleteSession(id: string) {
    return BaseService.remove<ApiResponse<string>>({
      url: API.SESSION.DELETE_SESSION.replace(":id", id),
      isLoading: true,
    });
  },
};
