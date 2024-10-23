import { lazy } from "react";

export const DefaultLayout = lazy(() => import("../layout/DefaultLayout"));
export const HomePage = lazy(() => import("../pages/Home"));
export const CourseDetailPage = lazy(() => import("../pages/CourseDetail/CourseDetail"));
export const AllCoursesPage = lazy(() => import("../pages/AllCourses"));

export const homeRoute = { index: true, element: <HomePage /> };
export const coureseDetail = { path: "/course/:id",element: <CourseDetailPage/> };
export const allCourses = { path:"/all",element: <AllCoursesPage/> };