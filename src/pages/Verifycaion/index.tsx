import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthService } from "../../services/authService/AuthService";

const VerifyEmail: React.FC = () => {
  // const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = window.location.pathname.split("/").pop(); // Extract token from URL
      if (token) {
        try {
          // const response = await fetch(
          //   `your-api-endpoint/verify-email/${token}`,
          //   { method: 'POST' } // Assuming you have a POST endpoint for verification
          // );

          // if (response.ok) {
          //   setMessage('Verify success!');
          //   setTimeout(() => {
          //     navigate('/login');
          //   }, 2000); // Redirect after 2 seconds
          // } else {
          //   const data = await response.json();
          //   setMessage(`Verify failed: ${data.error || 'Unknown error'}`);
          // }
          const res = await AuthService.verifyToken(token);
          console.log(res);
          toast.success("Email is verified!");
        } catch (error) {
          console.log(error);
          toast.error("Failed!");
        }
      }
    };

    verifyToken();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default VerifyEmail;
