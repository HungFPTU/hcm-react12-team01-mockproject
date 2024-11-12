import apiClient from "../api/apiClient"; // Import axios instance
import { User, UserRole } from "../model/User";

// Dữ liệu người dùng giả
const dummyUser: User = {
  _id: "123456",
  email: "johndoe@example.com",
  password: "password123",
  name: "John Doe",
  google_id: null,
  role: UserRole.student,
  status: true,
  description: "This is a dummy user for testing.",
  phone_number: "0123456789",
  avatar_url: "https://via.placeholder.com/150",
  video_url: null,
  dob: new Date("1995-01-01"),
  is_verified: true,
  verification_token: null,
  verification_token_expires: null,
  token_version: 1,
  balance: 1000,
  balance_total: 5000,
  withdrawn_amount: 4000,
  bank_name: "Test Bank",
  bank_account_no: "1234567890",
  bank_account_name: "John Doe",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  is_deleted: false,
};

// Hàm lấy thông tin người dùng hiện tại từ API hoặc trả về dữ liệu giả nếu lỗi
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      `/api/auth`
    );
    return response.data.data; // Trích xuất dữ liệu người dùng từ response
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
    console.log("Sử dụng dữ liệu người dùng giả...");
    return dummyUser; // Trả về dữ liệu giả nếu API lỗi
  }
};

// Hàm cập nhật thông tin người dùng qua API hoặc giả lập cập nhật nếu lỗi
export const updateUser = async (
  userId: string,
  data: Partial<User>
): Promise<User> => {
  try {
    const response = await apiClient.put<{ success: boolean; data: User }>(
      `/api/users/${userId}`,
      data
    );
    return response.data.data; // Trả về dữ liệu người dùng đã cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    console.log("Giả lập cập nhật người dùng...");

    // Giả lập dữ liệu cập nhật
    const updatedDummyUser = { ...dummyUser, ...data, updated_at: new Date().toISOString() };
    return updatedDummyUser;
  }
};
