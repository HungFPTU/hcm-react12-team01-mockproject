import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";


const InstructorDashboard = lazy(() => import("../../pages/InstructorPage/InstructorDashboard"));
const ManageCourse = lazy(() => import("../../pages/InstructorPage/ManageCourse"));
const ViewDetailCourse = lazy(() => import("../../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse"));
const ViewDetailSession = lazy(() => import("../../components/InstructorComponents/ManageCourse/Session/ViewDetailSession"));
const ViewDetailLesson = lazy(() => import("../../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson"));
const SalesHistory = lazy(() => import("../../components/InstructorComponents/SalesHistory"));
const InstructorCourseLog = lazy(() => import("../../pages/InstructorPage/InstructorCourseLog"));
const Review = lazy(() => import("../../components/InstructorComponents/Review"));
const InstructorSub = lazy(() => import("../../pages/InstructorPage/InstructorSub"));
const PayoutInstructorPage = lazy(() => import("../../pages/InstructorPage/PayoutInstructorPage"));
const PurchaseLog = lazy(() => import("../../pages/Admin/purchaselog"));
// const SettingPage = lazy(() => import("../../pages/Student/setting"));

export const instructorPaths: Record<string, RouteObject[]> = {
    [ROUTER_URL.INSTRUCTOR.INSTRUCTORDASHBOARD]: [
        {
            index: true,
            element: <InstructorDashboard/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.MANAGECOURSE ,
            element: <ManageCourse/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.VIEWDETAILCOURSE,
            element: <ViewDetailCourse/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.VIEWDETAILSESSION ,
            element: <ViewDetailSession/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.VIEWDETAILSESSION ,
            element: <ViewDetailLesson/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.SALESHISTORY ,
            element: <SalesHistory/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.INTRUCTORCOURSELOG ,
            element: <InstructorCourseLog/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.REVIEW ,
            element: <Review/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.INSTRUCTORSUB ,
            element: <InstructorSub/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.PAYOUTINSTRUCTORPAGE ,
            element: <PayoutInstructorPage/>,
        },
        {
            index: false,
            path: ROUTER_URL.INSTRUCTOR.PURCHASELOG ,
            element: <PurchaseLog/>,
        },
        // {
        //     index: false,
        //     path: ROUTER_URL.INSTRUCTOR.SETTING ,
        //     element: <SettingPage/>,
        // },

    ]
};