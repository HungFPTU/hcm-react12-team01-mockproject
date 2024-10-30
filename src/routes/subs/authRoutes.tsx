import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import ForgotPassword from "../../pages/ForgotPassword";
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const VerificationPage = lazy(() => import("../../pages/Verifycaion"));
const RegisterPage = lazy(() => import("../../pages/Register/Register"));

//==============================================================

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/verify-email/:token", element: <VerificationPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
];

export default authRoutes;
