import { API } from "../../const/path.api";
import { CreateSessionRequest } from "../../model/admin/request/Sesson.request";
import {
  CreateSessionResponse,
  Session,
} from "../../model/admin/response/Sesson.resonse";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const SessionService = {
  getSessions() {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/session/search",
      payload: {
        searchCondition: {
          keyword: "",
          course_id: "",
          session_id: "",
          lesson_type: "",
          is_position_order: false,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("API Response:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        throw error;
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
