
import { LessonTypeEnum } from "../../Lesson";

export interface GetLessonsResponse {
  pageData: GetLessonsResponsePageData[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  pageNum: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface GetLessonsResponsePageData {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface GetLessonResponsePublic {
  pageData: Lesson;
  pageInfo: PageInfo;
}

export interface CreateLessonResponse {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface LessonDetailsResponse {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number ;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface Lesson {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export interface UpdateLessonResponse {
  _id: string;
  name: string;
  course_id: string;
  course_name: string;
  session_id: string;
  session_name: string;
  user_id: string;
  user_name: string;
  lesson_type: LessonTypeEnum;
  description: string | null;
  video_url: string | null;
  image_url: string | null;
  full_time: number;
  position_order: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}
