import { lazy,Suspense } from "react";
import { ROUTER_URL } from "../../const/router.const"
import { RouteObject } from "react-router-dom";
import Loading from "../../app/Loading";

const DefaultLayout = lazy(() => import("../../layout/DefaultLayout"));
const HomePage = lazy(() => import("../../pages/Home"));
const AllCourses = lazy(() => import("../../pages/AllCourses"));
const CoursesDetail = lazy(() => import("../../pages/CourseDetail/CourseDetail"));
const LoginPage = lazy(() => import("../../pages/Login/Login"));
const ForgotPasswordPage = lazy(() => import("../../pages/ForgotPassword"));
const Register = lazy(() => import("../../pages/Register/Register"));
const VerifyEmail = lazy(() => import("../../pages/Verifycaion"));
const ResendVerification = lazy(() => import("../../pages/ResendToken"));
const CartPage = lazy(() => import("../../pages/cart"))
const ViewDetailInstructor = lazy(() => import("../../components/home/instructorDetail"));

export const pathPublic: Record<string, RouteObject[]> = {
  [ROUTER_URL.COMMON.HOME]: [
    {
      element:
      <Suspense fallback={<Loading/>}>
        <DefaultLayout />
      </Suspense> ,
      children: [
        {
          path: ROUTER_URL.COMMON.HOME,
          element: <HomePage />,
        },
        {
          path: ROUTER_URL.COMMON.ALL_COURSES,
          element: <AllCourses />,
        },
        {
          path: ROUTER_URL.COMMON.COURSE_DETAIL,
          element: <CoursesDetail />,
        },
        {
          path: ROUTER_URL.COMMON.CART,
          element: <CartPage />,
        },
        {
          path: ROUTER_URL.COMMON.VIEW_DETAIL_INSTRUCTOR,
          element: <ViewDetailInstructor />,
        }
      ]
    }
  ],
  [ROUTER_URL.LOGIN]: [
    {
      path: ROUTER_URL.LOGIN,
      element: <LoginPage />
    },
    {
      path: ROUTER_URL.REGISTER,
      element: <Register />
    },
    {
      path: ROUTER_URL.VERIFY_EMAIL,
      element: <VerifyEmail />
    },
    {
      path: ROUTER_URL.FORGOT_PASSWORD,
      element: <ForgotPasswordPage />
    },
    {
      path: ROUTER_URL.RESEND_TOKEN,
      element: <ResendVerification />
    },
  ]
}