import { API } from "../../const/path.api";
import { CreateLessonRequest } from "../../model/admin/request/Lesson.request";
import { CreateLessonResponse } from "../../model/admin/response/Lesson.response";
import { ApiResponse } from "../../model/ApiResponse";
import { BaseService } from "../config/base.service";

export const LessonService = {
  //instructor & admin

  //instructor
  createLesson(params: CreateLessonRequest) {
    return BaseService.post<ApiResponse<CreateLessonResponse>>({
      url: API.LESSON.CREATE_LESSON,
      payload: params,
    });
  },
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
  deleteLesson(lessonId: string) {
    return BaseService.remove<ApiResponse<string>>({
      url: API.LESSON.DELETE_LESSON.replace(":id", lessonId),
      isLoading: true,
    });
  },
};
