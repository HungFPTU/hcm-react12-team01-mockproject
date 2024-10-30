export interface ApiResponse<T> {
  token: any;
  success: boolean;
  data: T; 
}