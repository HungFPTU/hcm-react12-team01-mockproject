export enum CourseStatusEnum {
  New = "New",
  WaitingApprove = "WaitingApprove",
  Approved = "Approved",
  Rejected = "Rejected",
  Active = "Active",
  Inactive = "Inactive",
}
  
export interface Course {
  id: string;
  name: string;
  category_id: string;
  user_id: string;
  description: string;
  content: string;
  status: CourseStatusEnum;
  video_url: string;
  image_url: string;
  price: number;
  discount: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}