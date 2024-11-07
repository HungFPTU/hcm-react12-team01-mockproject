import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

export const LessonService = {
  getLessons() {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/lesson/search",
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
