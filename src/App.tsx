import { Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "./context/AuthContent";
import { ROUTER_URL } from "./const/router.const";
import { UserRole } from "./model/User";

const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const InstructorLayout = lazy(() => import("./layout/InstructorLayout"));
const StudentLayout = lazy(() => import("./layout/StudentLayout"));

import { adminPaths } from "./routes/path/adminPaths";
import { instructorPaths } from "./routes/path/instructorPaths";
import { studentPaths } from "./routes/path/studentPaths";
import { pathPublic } from "./routes/publish/pathPublic";

import ProtectedRoute from "./routes/protected/navigateRoute";
import PublicRoute from "./routes/publish/navigatePublicRoute";
import { Spin } from "antd";

const App = () => {
  const { role } = useAuth();

  const getDefaultPath = (role: UserRole) => {
    switch (role) {
      case UserRole.admin:
        return ROUTER_URL.ADMIN.DASHBOARD;
      case UserRole.instructor:
        return ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD;
      case UserRole.student:
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
    if (!currentRole) return null;

    const handleAccessDenied = () => {
      const defaultPath = getDefaultPath(currentRole);
      window.location.href = defaultPath;
    };

    return (
      <>
        <Route
          path={ROUTER_URL.ADMIN.DASHBOARD}
          element={
            <ProtectedRoute
              component={<AdminLayout />}
              userRole={currentRole}
              allowedRoles={[UserRole.admin]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {adminPaths[ROUTER_URL.ADMIN.DASHBOARD]?.map((route) => (
            <Route key={route.path || "index"} index={route.index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Instructor routes */}
        <Route
          path={ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD}
          element={
            <ProtectedRoute
              component={<InstructorLayout />}
              userRole={currentRole}
              allowedRoles={[UserRole.instructor]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {instructorPaths[ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD]?.map((route) => (
            <Route key={route.path || "index"} index={route.index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Student routes */}
        <Route
          path={ROUTER_URL.STUDENT.STUDENT_DASHBOARD}
          element={
            <ProtectedRoute
              component={<StudentLayout />}
              userRole={currentRole}
              allowedRoles={[UserRole.student]}
              onAccessDenied={handleAccessDenied}
            />
          }
        >
          {studentPaths[ROUTER_URL.STUDENT.STUDENT_DASHBOARD]?.map((route) => (
            <Route key={route.path || "index"} index={route.index} path={route.path} element={route.element} />
          ))}
        </Route>
      </>
    );
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Spin tip="Loading course details..." />
      </div>}
    >
      <Routes>
        {/* Public Routes */}
        {Object.entries(pathPublic).map(([key, routes]) =>
          routes.map((route) => (
            <Route
              key={route.path || "index"}
              path={route.path}
              element={
                key === ROUTER_URL.COMMON.HOME ? <PublicRoute component={route.element} /> : route.element
              }
            >
              {route.children?.map((childRoute) => (
                <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
              ))}
            </Route>
          ))
        )}

        {/* Protected Routes */}
        {renderProtectedRoutes()}
      </Routes>
    </Suspense>
  );
};

export default App;
