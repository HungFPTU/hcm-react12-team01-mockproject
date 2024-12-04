import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface LoginGoogleProps {
  onLoginError: (error: string) => void;
  onLoginSuccess: (token: string, googleId: string) => void;
  context: "login" | "register"; // Add context prop
}

const LoginGoogle: React.FC<LoginGoogleProps> = ({ onLoginError, onLoginSuccess, context }) => {
  const onSuccess = (credentialResponse: any) => {
    try {
      if (typeof onLoginSuccess !== "function") {
        throw new Error("onLoginSuccess callback is not properly defined");
      }

      if (!credentialResponse.credential) {
        throw new Error("No credential received");
      }

      const decodedToken: any = jwtDecode(credentialResponse.credential);
      const googleId = decodedToken.sub; 

      localStorage.setItem("googleToken", credentialResponse.credential);
      onLoginSuccess(credentialResponse.credential, googleId);
    } catch (error) {
      onLoginError("Error decoding token: " + (error as Error).message);
    }
  };

  const onError = () => {
    const errorMessage = "Google Login Failed.";
    onLoginError(errorMessage + " (ERR_BLOCKED_BY_CLIENT)");
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        useOneTap={false}
        auto_select={false}
        context="signin"
        text={context === "login" ? "signin_with" : "signup_with"} 
      />
    </div>
  );
};

export default LoginGoogle;
