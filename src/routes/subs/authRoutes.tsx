import { lazy } from "react";
import { RouteObject } from "react-router-dom";

//import lazy
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const VerificationPage = lazy(() => import("../../pages/Verifycaion"));

// const RegisterPage = lazy(() => import("../../pages/register/RegisterPage"));
//==============================================================

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/verify-email/:token", element: <VerificationPage /> },
  //   { path: "/register", element: <RegisterPage /> },
];

export default authRoutes;
