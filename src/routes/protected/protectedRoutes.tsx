import { RouteObject,Navigate } from "react-router-dom";
import { useState,useEffect, Suspense } from "react";

import Loading from "../../app/Loading";
import adminRoutes from "../subs/adminRoutes";
import instructorRoutes from "../subs/instrucstorRoutes";
import studentRoutes from "../subs/studentRoutes";
import { UserRole } from "../../model/User";

const useProtectedRoutes = (): RouteObject[] => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("storedRole", storedRole); // Kiểm tra giá trị storedRole
    if (storedRole) {
      setRole(storedRole as UserRole);
      console.log("Role set to:", storedRole); // Kiểm tra sau khi setRole
    }
  }, []);

  let roleBasedRoutes: RouteObject[] = [];

  if (role == null) {
    return[
      {
        path:"*",
        element:<Navigate to="/"/>,
      }
    ]
  }

  const wrapWithProtectedRoute = (routes: RouteObject[], allowedRole: UserRole): RouteObject[] => {
    return routes.map((route) => {
      if ("index" in route && route.index) {
        return {
          ...route,
          element: <Suspense fallback={<Loading />}>{role === allowedRole ? route.element : <Navigate to="/" replace />}</Suspense>
        };
      }
      return {
        ...route,
        element: (<Suspense fallback={<Loading />}>{role === allowedRole && route.element ? (route.element as JSX.Element) : <Navigate to="/" replace />}</Suspense>) as JSX.Element,
        children: Array.isArray(route.children) ? wrapWithProtectedRoute(route.children, allowedRole) : undefined
      };
    });
  };

  switch (role) {
    case UserRole.admin:
      console.log("admin routes:", adminRoutes);
      roleBasedRoutes = wrapWithProtectedRoute(adminRoutes, UserRole.admin) as RouteObject[];
      break;
    case UserRole.instructor:
      console.log("instructor routes:", instructorRoutes);
      roleBasedRoutes = wrapWithProtectedRoute(instructorRoutes, UserRole.instructor) as RouteObject[];
      break;
    case UserRole.student:
      console.log("Student routes:", studentRoutes);
      roleBasedRoutes = wrapWithProtectedRoute(studentRoutes, UserRole.student) as RouteObject[];
      break;
    default:
      roleBasedRoutes = [
        {
          path: "*",
          element: <Navigate to="/" />
        }
      ];
  }

  return roleBasedRoutes;
};

export default useProtectedRoutes;
