import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

// Lấy token từ localStorage
const token = localStorage.getItem("token");
console.log("Token:", token); // Log token để kiểm tra

export const SessionService = {
  createSession(
    name: string,
    courseId: string,
    description: string,
    positionOrder: number
  ) {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/session",
      payload: {
        name: name,
        course_id: courseId,
        description: description,
        position_order: positionOrder,
      },
      headers: {
        Authorization: token ? `Bearer ${String(token)}` : "",
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("API Response:", response); // Log phản hồi từ API
        return response;
      })
      .catch((error) => {
        console.error("Error creating session:", error); // Log lỗi chi tiết
        throw error; // Ném lỗi lên trên để xử lý thêm nếu cần
      });
  },
};
