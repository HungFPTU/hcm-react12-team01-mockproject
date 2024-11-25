import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";

const InstructorDashboard = lazy(
  () => import("../../pages/InstructorPage/InstructorDashboard")
);
const ManageCourse = lazy(
  () => import("../../pages/InstructorPage/ManageCourse")
);
const ViewDetailCourse = lazy(
  () =>
    import(
      "../../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse"
    )
);
const ViewDetailSession = lazy(
  () =>
    import(
      "../../components/InstructorComponents/ManageCourse/Session/ViewDetailSession"
    )
);
const ViewDetailLesson = lazy(
  () =>
    import(
      "../../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson"
    )
);
const SalesHistory = lazy(
  () => import("../../components/InstructorComponents/SalesHistory")
);
const InstructorCourseLog = lazy(
  () => import("../../pages/InstructorPage/InstructorCourseLog")
);
const Review = lazy(
  () => import("../../components/InstructorComponents/Review")
);
const InstructorSub = lazy(
  () => import("../../pages/InstructorPage/InstructorSub")
);
const PayoutInstructorPage = lazy(
  () => import("../../pages/InstructorPage/PayoutInstructorPage")
);
const PurchaseLog = lazy(() => import("../../pages/InstructorPage/PurchaseLog"));
const MylearningPage = lazy(() => import("../../pages/MyLearning"));

// const SettingPage = lazy(() => import("../../pages/Student/setting"));

export const instructorPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.INSTRUCTOR.INSTRUCTOR_DASHBOARD]: [
    {
      index: true,
      element: <InstructorDashboard />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.MANAGE_COURSE,
      element: <ManageCourse />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.VIEW_DETAIL_COURSE,
      element: <ViewDetailCourse />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.VIEW_DETAIL_SESSION,
      element: <ViewDetailSession />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.VIEW_DETAIL_LESSON,
      element: <ViewDetailLesson />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.SALES_HISTORY,
      element: <SalesHistory />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.INSTRUCTOR_COURSE_LOG,
      element: <InstructorCourseLog />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.REVIEW,
      element: <Review />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.INSTRUCTOR_SUB,
      element: <InstructorSub />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.PAYOUT_INSTRUCTOR_PAGE,
      element: <PayoutInstructorPage />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.PURCHASE_LOG,
      element: <PurchaseLog />,
    },
    {
      index: false,
      path: ROUTER_URL.INSTRUCTOR.MY_LEARNING,
      element: <MylearningPage />,
    },
    // {
    //     index: false,
    //     path: ROUTER_URL.INSTRUCTOR.SETTING ,
    //     element: <SettingPage/>,
    // },
  ],
};
