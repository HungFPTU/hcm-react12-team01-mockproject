import { LessonTypeEnum } from "../../Lesson";

export interface CreateLessonRequest {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: LessonTypeEnum;
  description: string;
  video_url: string;
  image_url: string;
  full_time: number;
  position_order: number;
}

export interface UpdateLessonRequest {
  name: string;
  course_id: string;
  session_id: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number | null;
}

export interface GetLessonRequest {
  searchCondition: SearchCondition;
  pageInfo: PageInfo;
}

export interface SearchCondition {
  _id: string;
  keyword: string;
  course_id: string;
  is_position_order: boolean;
  is_deleted: boolean;
}
export interface PageInfo {
  pageNum: number;
  pageSize: number;
}
