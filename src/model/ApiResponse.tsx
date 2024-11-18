export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: { message: string; field: string }[]; // Optional errors property
}