import { lazy } from "react";
import { RouteObject } from "react-router-dom";

//import lazy
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const RegisterPage = lazy(() => import("../../pages/Register/Register"));
//==============================================================

const authRoutes: RouteObject[] = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];

export default authRoutes;
