import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useAuth } from "../../context/AuthContent";
import { ROUTER_URL } from "../../const/router.const";
import { UserRole } from "../../model/User";

const AdminLayout = lazy(() => import("../../layout/AdminLayout"));
const InstructorLayout = lazy(() => import("../../layout/InstructorLayout"));
const StudentLayout = lazy(() => import("../../layout/StudentLayout"));

import { adminPaths } from "../path/adminPaths";
import { instructorPaths } from "../path/instructorPaths";
import { studentPaths } from "../path/studentPaths";
import { pathPublic } from "../publish/pathPublic";

import ProtectedRoute from "../protected/navigateRoute";
import PublicRoute from "../publish/navigatePublicRoute";



const App = () => {
  const { role } = useAuth();

  const getDefaultPath = (role: string) => {
    switch (role) {
      case "admin":
        return ROUTER_URL.ADMIN.DASHBOARD;
      case "instructor":
        return ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD;
      case "student":
        return ROUTER_URL.STUDENT.STUDENT_DASHBOARD;
      default:
        return ROUTER_URL.COMMON.HOME;
    }
  };

  useEffect(() => {
    const currentRole = role || (localStorage.getItem("role") as UserRole);
    if (currentRole && window.location.pathname === "/") {
      const defaultPath = getDefaultPath(currentRole);
      window.location.href = defaultPath;
    }
  }, [role]); // Add role as a dependency


  const renderProtectedRoutes = () => {
    const currentRole = role || (localStorage.getItem("role") as UserRole);
    if (!currentRole) {
      return null;
    }

    const handleAccessDenied = () => {
      const defaultPath = getDefaultPath(currentRole);
      window.location.href = defaultPath;
    };

    return (
      <>
        <Route path={ROUTER_URL.ADMIN.DASHBOARD} element={<ProtectedRoute component={<AdminLayout />} userRole={currentRole} allowedRoles={["admin"]} onAccessDenied={handleAccessDenied} />}>
          {adminPaths[ROUTER_URL.ADMIN.DASHBOARD]?.map((route) => (
            <Route
              key={route.path || "index"}
              index={route.index} //loading index
              path={route.path?.replace("/admin/", "")} // Remove /admin/ prefix
              element={route.element}
            />
          ))}
        </Route>

        <Route path={ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD} element={<ProtectedRoute component={<InstructorLayout />} userRole={currentRole} allowedRoles={["instructor"]} onAccessDenied={handleAccessDenied} />}>
          {instructorPaths[ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD]?.map((route) => <Route key={route.path || "index"} index={route.index} path={!route.index ? route.path : undefined} element={route.element} />)}
        </Route>

        <Route path={ROUTER_URL.STUDENT.STUDENT_DASHBOARD} element={<ProtectedRoute component={<StudentLayout />} userRole={currentRole} allowedRoles={["student"]} onAccessDenied={handleAccessDenied} />}>
          {studentPaths[ROUTER_URL.STUDENT.STUDENT_DASHBOARD]?.map((route) => <Route key={route.path || "index"} index={route.index} path={!route.index ? route.path : undefined} element={route.element} />)}
        </Route>
      </>
    );
  };

  return (
    <Routes>
    {/* Public Routes */}
    {Object.entries(pathPublic).map(([key, routes]) =>
      routes.map((route) => (
        <Route key={route.path || "index"} path={route.path} element={key === ROUTER_URL.COMMON.HOME ? <PublicRoute component={route.element} /> : route.element}>
          {route.children?.map((childRoute) => <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />)}
        </Route>
      ))
    )}

    {/* Protected Routes */}
    {renderProtectedRoutes()}
  </Routes>
  );
};

export default App;
