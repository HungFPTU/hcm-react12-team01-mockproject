import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/authService/auth.service";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const hasMounted = useRef(false); // Khởi tạo ref để theo dõi trạng thái

  useEffect(() => {
    if (hasMounted.current) return; // Trả về nếu đã mount
    hasMounted.current = true; // Đánh dấu là đã mount

    const verifyToken = async () => {
      const token = window.location.pathname.split("/").pop();
      if (token) {
        try {
          const res = await AuthService.verifyToken(token);
          if (res) {
            navigate("/login");
          } else {
            navigate("/resend-verification");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default VerifyEmail;
