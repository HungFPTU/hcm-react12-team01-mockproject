import { ApiResponse } from "../../model/ApiResponse";
import { ChangePasswordUser, UpdateUser, User } from "../../model/User";
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
  // Thêm phương thức lấy thông tin người dùng theo ID
  getUserById(userId: string) {
    return BaseService.get<ApiResponse<User>>({
      url: `/api/users/${userId}`,
      headers: {
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("User Data:", response); // Log dữ liệu người dùng
        return response; // Trả về dữ liệu người dùng
      })
      .catch((error) => {
        console.error("Error fetching user by ID:", error); // Log lỗi nếu có
        throw error; // Ném lỗi để xử lý bên ngoài
      });
  },

  // Thêm phương thức cập nhật thông tin người dùng
  updateUser(userId: string, data: UpdateUser) {
    return BaseService.put<ApiResponse<User>>({
      url: `/api/users/${userId}`,
      payload: data,
      headers: {
        "Content-Type": "application/json", // Đảm bảo định dạng JSON
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("Update User Response:", response); // Log phản hồi từ API
        return response; // Trả về dữ liệu người dùng đã cập nhật
      })
      .catch((error) => {
        console.error("Error updating user:", error); // Log lỗi nếu có
        throw error; // Ném lỗi để xử lý bên ngoài
      });
  },
  // Thêm vào UserService
  changePassword(data: ChangePasswordUser) {
    return BaseService.put<ApiResponse<any>>({
      url: `/api/users/change-password`,
      payload: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("Change Password Response:", response);
        return response;
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        throw error;
      });
  },
};
