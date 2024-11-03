import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../../services/authService/AuthService";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.location.pathname.split("/").pop();
      if (token) {
        try {
          const res = await AuthService.verifyToken(token);
          console.log(res);
          toast.success("Email is verified!");
          navigate("/login");
        } catch (error) {
          console.log(error);
          // Kiểm tra nội dung phản hồi từ API
          if (error instanceof Error && "response" in error) {
            const errorMessage = (error as any).response.data.message; // Giả sử có một trường message trong phản hồi
            if (errorMessage === "token is not valid") { // Kiểm tra thông điệp lỗi
              toast.error("Token is not valid. Please request a new verification link.");
              navigate("/resend-verification"); // Điều hướng đến trang resend token
            } else {
              toast.error("Failed to verify email!");
              navigate("/login");
            }
          } else {
            toast.error("Failed to verify email!");
            navigate("/login");
          }
        }
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default VerifyEmail;
