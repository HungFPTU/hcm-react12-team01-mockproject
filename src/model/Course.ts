export enum CourseStatusEnum {
  New = "new",
  WaitingApprove = "waiting_approve",
  Approved = "approve",
  Rejected = "reject",
  Active = "active",
  Inactive = "inactive",
}
  
export interface Course {
  _id: string;
  name: string;
  session: string;
  categoryName: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}