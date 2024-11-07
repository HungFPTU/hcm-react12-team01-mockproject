import { BaseService } from "../config/base.service";
import { API } from "../../const/path.api"
import { ApiResponse } from "../../model/ApiResponse";
import { GetCourseRequest, ChangeStatusCourseRequest,CreateCourseRequest,GetPublicCourseRequest,UpdateCourseRequest } from "../../model/admin/request/Course.request";
import { CreateCourseResponse, GetCourseResponse, GetPublicCourseResponse, GetCourseByIdResponse, UpdateCourseResponse, GetPublicCourseDetailResponse} from "../../model/admin/response/Course.response";

export const CourseService = {
  //instructor & admin
  getCourse(params: GetCourseRequest) {
    return BaseService.post<ApiResponse<GetCourseResponse>>({
      url: API.COURSE.GET_COURSES,
      payload: params
    });
  },
  getCourseById(id: string) {
    return BaseService.get<ApiResponse<GetCourseByIdResponse>>({
      url: API.COURSE.GET_COURSE.replace(":id", id)
    });
  },
  //instructor
  createCourse(params: CreateCourseRequest) {
    return BaseService.post<ApiResponse<CreateCourseResponse>>({
      url: API.COURSE.CREATE_COURSE,
      payload: params
    });
  },
  //instructor & admin
  changeStatusCourse(params: ChangeStatusCourseRequest) {
    return BaseService.put<ApiResponse<CreateCourseResponse>>({
      url: API.COURSE.CHANGE_STATUS,
      payload: params
    });
  },
  //instructor
  updateCourse(courseId: string, params: UpdateCourseRequest) {
    return BaseService.put<ApiResponse<UpdateCourseResponse>>({
      url: API.COURSE.UPDATE_COURSE.replace(":id", courseId),
      payload: params
    });
  },
  //instructor
  deleteCourse(courseId: string) {
    return BaseService.remove<ApiResponse<string>>({
      url: API.COURSE.DELETE_COURSE.replace(":id", courseId)
    });
  },
  //=========================================

  //public
  getPublicCourse(params: GetPublicCourseRequest) {
    return BaseService.post<ApiResponse<GetPublicCourseResponse>>({
      url: API.COURSE.GET_PUBLIC_COURSE,
      payload: params
    });
  },
  getPublicCourseDetail(courseId: string) {
    return BaseService.getById<ApiResponse<GetPublicCourseDetailResponse>>({
      url: API.COURSE.GET_PUBLIC_COURSE_DETAIL.replace(":id", courseId)
    });
  }
  //=========================================
};