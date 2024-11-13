import { lazy } from "react";

export const DefaultLayout = lazy(() => import("../layout/DefaultLayout"));
export const HomePage = lazy(() => import("../pages/Home"));
export const CourseDetailPage = lazy(
  () => import("../pages/CourseDetail/CourseDetail")
);
export const AllCoursesPage = lazy(() => import("../pages/AllCourses"));
export const VerifyEmail = lazy(() => import("../pages/Verifycaion"));
export const CartPage = lazy(() => import("../pages/cart"));

export const homeRoute = { index: true, element: <HomePage /> };
export const coureseDetail = {
  path: "/course/:id",
  element: <CourseDetailPage />,
};
export const allCourses = { path: "/all", element: <AllCoursesPage /> };
export const verifyEmail = {
  path: "/verify-email/:token",
  element: <VerifyEmail />,
};
export const cart = { path: "/cart", element: <CartPage /> };
