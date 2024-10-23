import { RouteObject } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContent";
import ProtectedRoute from "./protectedRoute";
import adminRoutes from "../subs/adminRoutes";
import instructorRoutes from "../subs/instrucstorRoutes";
import studentRoutes from "../subs/studentRoutes";
import { UserRole } from "../../model/User";

const useProtectedRoutes = (): RouteObject[] => {
  const { role } = useContext(AuthContext) as { role: UserRole | null };

  let roleBasedRoutes: RouteObject[] = [];

  const wrapWithProtectedRoute = (
    route: RouteObject,
    allowedRoles: UserRole[]
  ): RouteObject => ({
    ...route,
    element: (
      <ProtectedRoute
        component={route.element as unknown as React.ComponentType<object>}
        userRole={role!} // Non-null assertion, since role is checked in switch case
        allowedRoles={allowedRoles}
      />
    ),
  });

  switch (role) {
    case UserRole.admin:
      roleBasedRoutes = adminRoutes.map((route) =>
        wrapWithProtectedRoute(route, [UserRole.admin])
      );
      break;
    case UserRole.instructor:
      roleBasedRoutes = instructorRoutes.map((route) =>
        wrapWithProtectedRoute(route, [UserRole.instructor])
      );
      break;
    case UserRole.student:
      roleBasedRoutes = studentRoutes.map((route) =>
        wrapWithProtectedRoute(route, [UserRole.student])
      );
      break;
    default:
      roleBasedRoutes = [];
  }

  return roleBasedRoutes;
};

export default useProtectedRoutes;
