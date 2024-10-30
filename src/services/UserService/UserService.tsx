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
};
