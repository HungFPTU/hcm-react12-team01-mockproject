import { CourseStatusEnum } from "../../Course";

export interface SearchCondition {
  keyword: string;
  category_id: string;
  status: CourseStatusEnum | undefined;
  is_delete: boolean;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
}

export interface GetCourseRequest {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface CreateCourseRequest {
  name: string;
  category_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
}

export interface ChangeStatusCourseRequest {
  course_id: string;
  new_status: string;
  comment: string;
}

export interface UpdateCourseRequest {
  name: string;
  category_id: string;
  description: string;
  content: string;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
}

//==================CLIENT PUBLIC=======================

export interface GetPublicCourseRequest {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}
