import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api";
import { CreateLessonRequest, GetLessonParams, UpdateLessonRequest } from "../../model/admin/request/Lesson.request";
import { ApiResponse } from "../../model/ApiResponse";
import { CreateLessonResponse, LessonDetailsResponse } from "../../model/admin/response/Lesson.response";

export const LessonService = {
  getLesson(params: GetLessonParams) {
    return BaseService.post<ApiResponse<CreateLessonResponse>>({
      url: API.LESSON.GET_LESSONS,
      payload: params
    });
  },
  getLessonDetails(lessonId: string) {
    return BaseService.get<ApiResponse<LessonDetailsResponse>>({
      url: API.LESSON.GET_LESSON.replace(":id", lessonId)
    });
  },
  createLesson(params: CreateLessonRequest) {
    return BaseService.post<ApiResponse<CreateLessonResponse>>({
      url: API.LESSON.CREATE_LESSON,
      payload: params
    });
  },
  updateLesson: (lessonId: string, params: UpdateLessonRequest) => {
    return BaseService.put<ApiResponse<LessonDetailsResponse>>({
      url: API.LESSON.UPDATE_LESSON.replace(":id", lessonId),
      payload: params
    });
  },
  deleteLesson: (lessonId: string) => {
    return BaseService.remove<ApiResponse<string>>({
      url: API.LESSON.DELETE_LESSON.replace(":id", lessonId)
    });
  }
};
