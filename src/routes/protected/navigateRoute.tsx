// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { UserRole } from "../../model/User";
import { ROUTER_URL } from "../../const/router.const";
interface ProtectedRouteProps {
  component: JSX.Element;
  userRole: UserRole | null;
  allowedRoles: UserRole[];
  onAccessDenied: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, userRole, allowedRoles }) => {
  if (window.location.pathname === ROUTER_URL.COMMON.HOME && (userRole === UserRole.student || userRole === UserRole.instructor)) {
    return component;
  }

  if (!allowedRoles.includes(userRole!)) {
    return <Navigate to="/" />;
  }
  
  return component;
};

export default ProtectedRoute;
