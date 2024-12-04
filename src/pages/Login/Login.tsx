import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginEmailPassword from '../../components/LoginEmailPassword/LoginEmailPassword';
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { CLIENT_ID } from '../../const/authentication';
import { useAuth } from '../../context/AuthContent';
import { toast } from 'react-toastify';
import { Modal, Form } from 'antd';
import { useState } from 'react';
import { AuthService } from '../../services/authService/auth.service';
import { HTTP_STATUS } from '../../app/enums';
import { ROUTER_URL } from '../../const/router.const';
import { HttpException } from '../../app/toastException';
const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState<boolean>(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate("/");
    window.location.reload();
  }
  const getDefaultPath = (userRole: string) => {
    switch (userRole) {
      case "admin":
        return ROUTER_URL.ADMIN.DASHBOARD;
      case "instructor":
        return ROUTER_URL.COMMON.HOME;
      case "student":
        return ROUTER_URL.COMMON.HOME;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };
  
  const onFinishGoogle = async (googleId: string) => {
    try {
      const result = await AuthService.loginGoogle({ google_id: googleId });
      if (result.status === HTTP_STATUS.SUCCESS && result.data?.data?.token) {
        const token = result.data.data.token;
        localStorage.setItem("token", token);
        await handleLogin(token);

        const userRole = localStorage.getItem("role");
        const defaultPath = getDefaultPath(userRole || "");
        if (typeof defaultPath === "string") {
          toast.success("Login Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { backgroundColor: "#1a237e" }
          });

          // Add small delay to ensure toast is visible
          setTimeout(() => {
            navigate(defaultPath);
          }, 2000);
        } else {
          console.error("Invalid path:", defaultPath);
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.message.includes("is not exists")) {
          setLoginError("Your email is not registered. Please sign up.");
          setIsSignUpModalVisible(true);
        } else {
          setLoginError(error.message);
        }
      } else {
        setLoginError("An unexpected error occurred. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };
  const handleGoogleLoginError = (error: string) => {
    setLoginError(error);
    console.error("Google Login Error:", error);
  };
  const handleSignUpModalCancel = () => {
    setIsSignUpModalVisible(false);
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
      <div className="flex w-full max-w-[1200px] shadow-2xl">
        <div className="hidden md:flex w-1/2 shadow-2xl">
          <img
            src={YOUR_IMAGE}
            alt="Description of image"
            className="w-full h-full object-cover shadow-xl rounded-l-lg "
          />
        </div>

        <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto'>
          <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
            <img src={LOGO} alt="Logo" className="h-9 mr-3" />
            F-Learning
          </h1>
          <div className="w-full flex flex-col mb-4">
            <h3 className="text-xl font-semibold mb-2">Welcome! Hello Friends</h3>
            <p className="text-base mb-2">Please! Login with your account</p>
          </div>
          <div className="flex-grow">
            <LoginEmailPassword />
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <Form.Item>
                  <LoginGoogle
                    onLoginError={handleGoogleLoginError}
                    onLoginSuccess={onFinishGoogle}
                    context="login" // Pass context as "login"
                  />
                </Form.Item>
              </GoogleOAuthProvider>
          </div>
          {loginError && (
              <p className="mt-4 text-center text-red-500">
                {loginError}
                {loginError.includes("ERR_BLOCKED_BY_CLIENT") && <span> This may be due to ad-blocking or privacy protection software. Please disable these and try again.</span>}
              </p>
            )}

          <div className="w-full flex items-center justify-center mt-auto">
            <p className="text-sm font-normal text-black ">
              Don't have an account?
              <span
                className="font-semibold underline underline-offset-2 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                {" "}
                Register
              </span>
            </p>
          </div>
        </div>
      </div>


      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="flex items-center text-[#1f0a23] text-lg group"  
          onClick={handleBackHome}
        >
          <HomeOutlined
            className="mr-2 text-[#1f0a23] text-xl group-hover:text-[#7c3076]" 
          />
          <span className="group-hover:text-[#7c3076]">Back Home</span>  
        </button>
      </div>
      <Modal title="Sign Up" open={isSignUpModalVisible} onCancel={handleSignUpModalCancel} footer={null}>
        <div>Sign Up Test</div>
      </Modal>
    </div>
  );
};

export default Login;
