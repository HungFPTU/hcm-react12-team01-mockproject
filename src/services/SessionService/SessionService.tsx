import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

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

  getSessons() {
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
        console.log("API Response:", response); // Log phản hồi từ API
        return response;
      })
      .catch((error) => {
        console.error("Error fetching lessons:", error); // Log lỗi chi tiết
        throw error;
      });
  },
};
