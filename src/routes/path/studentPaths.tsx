import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";

const StudentDashboard = lazy(() => import("../../pages/Student/dashboard"));
const OrderPage = lazy(() => import("../../pages/Student/order"));
const SettingPage = lazy(() => import("../../pages/Student/setting"));
const SubscriptionPage = lazy(() => import("../../pages/Student/view-subscription"));
const CheckoutPage = lazy(() => import("../../pages/Student/order/checkout"));
const MylearningPage = lazy(() => import("../../pages/MyLearning"));

export const studentPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.STUDENT.STUDENT_DASHBOARD]: [
    {
      index: true,
      element: <StudentDashboard />,
    },
    {
      index: false,
      path: ROUTER_URL.STUDENT.ORDER_PAGE,
      element: <OrderPage />,
    },
    {
      index: false,
      path: ROUTER_URL.STUDENT.SUBSCRIPTION_PAGE,
      element: <SubscriptionPage />,
    },
    {
      index: false,
      path: ROUTER_URL.STUDENT.CHECKOUT_PAGE,
      element: <CheckoutPage />,
    },
    {
      index: false,
      path: ROUTER_URL.STUDENT.SETTING_PAGE,
      element: <SettingPage />,
    },
    {
      index: false,
      path: ROUTER_URL.STUDENT.MY_LEARNING,
      element: <MylearningPage />,
    },
  ],
};
