import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const UserService = {
  getUsers() {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/users/search",
      payload: {
        searchCondition: {
          keyword: "",
          role: "all",
          status: true,
          is_verified: "",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      headers: {
        Authorization: token ? `Bearer ${String(token)}` : "",
      },

      isLoading: true,
    });
  },
  deleteUser(id: string) {
    return BaseService.remove<ApiResponse<any>>({
      url: `/api/users/${id}`,
      headers: {
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    });
  },
  getUsersWatingManager() {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/users/search",
      payload: {
        searchCondition: {
          keyword: "",
          role: "instructor",
          status: true,
          is_verified: "false",
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      },
      headers: {
        Authorization: token ? `Bearer ${String(token)}` : "",
      },

      isLoading: true,
    });
  },
  reviewProfileInstructor(userId: string, status: string) {
    return BaseService.put<ApiResponse<any>>({
      url: `/api/users/review-profile-instructor`,
      payload: {
        user_id: userId,
        status: status,
      },
      isLoading: true,
    });
  },
};
