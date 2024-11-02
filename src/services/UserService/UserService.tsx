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

  changeStatus(userId: string, status: boolean) {
    return BaseService.put<ApiResponse<any>>({
      url: "/api/users/change-status",
      payload: {
        user_id: userId,
        status: status,
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

  changeRole(userId: string, role: string) {
    const token = localStorage.getItem("token");

    console.log("Token:", token); // Kiểm tra token
    console.log("Payload:", { user_id: userId, role }); // Kiểm tra payload

    return BaseService.put<ApiResponse<any>>({
      url: "/api/users/change-role",
      payload: {
        user_id: userId,
        role: role,
      },
      headers: {
        "Content-Type": "application/json", // Đảm bảo định dạng JSON
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("API Response:", response); // Log phản hồi từ API
        return response;
      })
      .catch((error) => {
        console.error("Error changing role:", error); // Log lỗi chi tiết
        throw error; // Ném lỗi lên trên để xử lý thêm nếu cần
      });

  },
};
