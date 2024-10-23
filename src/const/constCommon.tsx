import { lazy } from "react";

export const DefaultLayout = lazy(() => import("../layout/defaultLayout"));
export const HomePage = lazy(() => import("../pages/home"));
export const CourseDetailPage = lazy(() => import("../pages/courseDetail/CourseDetail"));
export const AllCoursesPage = lazy(() => import("../pages/allCourses"));

export const homeRoute = { index: true, element: <HomePage /> };
export const coureseDetail = { path: "/course/:id",element: <CourseDetailPage/> };
export const allCourses = { path:"/all",element: <AllCoursesPage/> };