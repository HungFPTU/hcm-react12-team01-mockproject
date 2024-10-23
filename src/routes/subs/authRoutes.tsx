import { lazy } from "react";
import { RouteObject } from "react-router-dom";

//import lazy
const LoginPage = lazy(() => import("../../pages/login/Login"));
// const RegisterPage = lazy(() => import("../../pages/register/RegisterPage"));
//==============================================================

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
//   { path: "/register", element: <RegisterPage /> },
];

export default authRoutes;
