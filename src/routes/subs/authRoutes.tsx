import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword";

//import lazy
const LoginPage = lazy(() => import("../../pages/Login/Login"));
// const RegisterPage = lazy(() => import("../../pages/register/RegisterPage"));
//==============================================================

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  //   { path: "/register", element: <RegisterPage /> },
];

export default authRoutes;
