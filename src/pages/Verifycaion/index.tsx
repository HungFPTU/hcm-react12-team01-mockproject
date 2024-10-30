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
          toast.error("Failed!");
          navigate("/login");
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
