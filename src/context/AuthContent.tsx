import { createContext, useState,useContext,useEffect } from "react";
import { User, UserRole } from "../model/User"; 
import { ReponseSuccess } from "../app/reponse";
import { AuthService } from "../services/authService/auth.service";
import { HTTP_STATUS } from "../app/enums";
import { HttpException } from "../app/toastException";
// import { ApiResponse } from "../model/ApiResponse";
interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  handleLogin: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  userInfo: ReponseSuccess<User>["data"] | null;
  setUserInfo: (userInfo: ReponseSuccess<User>["data"] | null) => void;
  getCurrentUser: () => Promise<void>;
  forgotPassword: (params: { email: string }) => Promise<ReponseSuccess<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    const storedRole = localStorage.getItem("role");
    return storedRole as UserRole | null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken as string | null;
  });

  const [userInfo, setUserInfo] = useState<ReponseSuccess<User>["data"] | null>(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Store userInfo in localStorage whenever it changes
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  const handleLogin = async (token: string) => {
    try {
      if (!token) {
        throw new HttpException("No token provided", HTTP_STATUS.UNAUTHORIZED);
      }
      localStorage.setItem("token", token);
      setToken(token);
  
      const response = await AuthService.getUserRole({ token });
      if (!response.data?.data) {
        throw new HttpException("Invalid user data", HTTP_STATUS.BADREQUEST);
      }
      const userData = response.data.data;
      setUserInfo(userData);
      setRole(userData.role as UserRole);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userData.role);
    } catch (error) {
      console.error("Failed to get user info:", error);
      throw error instanceof HttpException
        ? error
        : new HttpException("Failed to get user info", HTTP_STATUS.INTERNALSERVER_ERROR);
    }
  };
  
  const logout = () => {
    setToken(null);
    setRole(null);
    setUserInfo(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };
  

  const forgotPassword = async (params: { email: string }): Promise<ReponseSuccess<string>> => {
    try {
      const response = await AuthService.forgotPassword(params.email);
      return response.data;
    } catch (error) {
      console.error("Failed to forgot password:", error);
      throw error instanceof HttpException ? error : new HttpException("Failed to forgot password", HTTP_STATUS.INTERNALSERVER_ERROR);
    }
  };

  const getCurrentUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new HttpException("No token found", HTTP_STATUS.UNAUTHORIZED);
      }
      const response = await AuthService.getUserRole({ token: storedToken });
      if (!response.data?.data) {
        throw new HttpException("Invalid response data", HTTP_STATUS.BADREQUEST);
      }
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Failed to get current user:", error);
      logout();
      throw error instanceof HttpException ? error : new HttpException("Failed to get current user", HTTP_STATUS.INTERNALSERVER_ERROR);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        token,
        setToken,
        userInfo,
        setUserInfo,
        isLoading,
        setIsLoading,
        handleLogin,
        logout,
        forgotPassword,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  ); 
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new HttpException("useAuth must be used within an AuthProvider", HTTP_STATUS.INTERNALSERVER_ERROR);
  }
  return context;
};
