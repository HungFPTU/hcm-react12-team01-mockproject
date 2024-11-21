import { lazy } from "react";

export const DefaultLayout = lazy(() => import("../layout/DefaultLayout"));
export const HomePage = lazy(() => import("../pages/Home"));
export const CourseDetailPage = lazy(() => import("../pages/CourseDetail/CourseDetail"));
export const AllCoursesPage = lazy(() => import("../pages/AllCourses"));
export const VerifyEmail = lazy(() => import("../pages/Verifycaion"));
export const CartPage = lazy(() => import("../pages/cart"));
export const ViewDetailInstructor = lazy(() => import("../components/home/instructorDetail"));
export const LessonDetail = lazy(() => import("../pages/LessonDetail"));
export const SessionDetail = lazy(() => import("../pages/SessionDetail"));

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
export const detailinstructor = { path: "/view-detail/:id", element:<ViewDetailInstructor/>}
export const lesson = { path: "/course/:courseId/lesson/:lessonId", element:<LessonDetail/>}
export const session = { path: "/course/:courseId/session/:sessionId", element:<SessionDetail/>}
