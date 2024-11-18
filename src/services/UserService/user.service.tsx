import { API } from "../../const/path.api";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";
import { User } from "../../model/User";
// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const UserService = {
  getUsers(status: boolean = true, isVerified: boolean = true) {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/users/search",
      payload: {
        searchCondition: {
          keyword: "",
          role: "all",
          status: status, // Sử dụng status từ đối số
          is_verified: isVerified, // Sử dụng isVerified từ đối số
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
      url: API.ADMIN.CHANGE_STATUS,
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

  reviewProfileInstructor({
    userId,
    status,
    comment,
  }: {
    userId: string;
    status: string;
    comment?: string;
  }) {
      const payload: any = {
        user_id: userId,
        status: status,
      };

      if (status === "reject" && comment) {
        payload.comment = comment
      }

      return BaseService.put<ApiResponse<any>>({
        url: API.ADMIN.REVIEW_PROFILE_INSTRUCTOR,
        payload: payload,
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
  createUser(
    name: string,
    email: string,
    password: string,
    role: string,
    status: boolean,
    description?: string,
    avatar_url?: string,
    video_url?: string,
    phone_number?: string,
    bank_name?: string,
    bank_account_no?: string,
    bank_account_name?: string
  ) {
    return BaseService.post<ApiResponse<any>>({
      url: `/api/users/create`,
      payload: {
        name: name,
        email: email,
        password: password,
        role: role,
        status: status,
        description: description,
        avatar_url: avatar_url,
        video_url: video_url,
        phone_number: phone_number,
        bank_name: bank_name,
        bank_account_no: bank_account_no,
        bank_account_name: bank_account_name,
      },
      isLoading: true,
    });
  },
  getUserDetails(instructor_id: string) {
    return BaseService.getById<ApiResponse<User>>({
      url: API.ADMIN.GET_USER_DETAILS.replace(":id", instructor_id)
    });
  },
};
