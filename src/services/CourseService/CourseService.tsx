import { API } from "../../const/path.api";
import { ApiResponse } from "../../model/ApiResponse";
import { CourseStatusEnum } from "../../model/Course";
import { BaseService } from "../config/base.service";

export const CourseService = {
  createCourse(
    name: string,
    categoryId: string,
    description: string,
    content: string,
    videoUrl?: string,
    imageUrl?: string,
    price?: number,
    discount?: number
  ) {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/course",
      payload: {
        name: name,
        category_id: categoryId,
        description: description,
        content: content,
        video_url: videoUrl,
        image_url: imageUrl,
        price: price,
        discount: discount,
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("API Response:", response); // Log phản hồi từ API
        return response;
      })
      .catch((error) => {
        console.error("Error creating course:", error); // Log lỗi chi tiết
        throw error; // Ném lỗi lên trên để xử lý thêm nếu cần
      });
  },

  getCourses(
    keyword: string = "",
    categoryId: string = "",
    status: string = "",
    pageNum: number = 1,
    pageSize: number = 10
  ) {
    return BaseService.post<ApiResponse<any>>({
      url: "/api/course/search",
      payload: {
        searchCondition: {
          keyword: keyword,
          category_id: categoryId,
          status: status,
          is_deleted: false,
        },
        pageInfo: {
          pageNum: pageNum,
          pageSize: pageSize,
        },
      },
      isLoading: true,
    })
      .then((response) => {
        console.log("API Response:", response); // Log phản hồi từ API
        return response;
      })
      .catch((error) => {
        console.error("Error searching courses:", error); // Log lỗi chi tiết
        throw error; // Ném lỗi lên trên để xử lý thêm nếu cần
      });
  },
    changeStatus(params: { course_id: string; new_status: CourseStatusEnum }) {
      return BaseService.put<ApiResponse<any>>({
        url: API.INSTRUCTOR.CHANGE_STATUS,
        payload: params,
        isLoading: true,
      });
    },

};
