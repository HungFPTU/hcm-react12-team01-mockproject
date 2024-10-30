import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";

const StudentDashboard = lazy(() => import("../../pages/Student/dashboard"));
const OrderPage = lazy(() => import("../../pages/Student/order"));
const SettingPage = lazy(() => import("../../pages/Student/setting"));
const SubscriptionPage = lazy(() => import("../../pages/Student/view-subscription"));
const CheckoutPage = lazy(() => import("../../pages/Student/order/checkout"));


export const studentPaths: Record<string, RouteObject[]> = {
    [ROUTER_URL.STUDENT.STUDENTDASHBOARD]: [
        {
            index: true,
            element: <StudentDashboard/>,
        },
        {
            index: false,
            path: ROUTER_URL.STUDENT.ORDERPAGE ,
            element: <OrderPage/>,
        },
        {
            index: false,
            path: ROUTER_URL.STUDENT.SUBSCRIPTIONPAGE,
            element: <SubscriptionPage/>,
        },
        {
            index: false,
            path: ROUTER_URL.STUDENT.CHECKOUTPAGE ,
            element: <CheckoutPage/>,
        },
        {
            index: false,
            path: ROUTER_URL.STUDENT.SETTINGPAGE ,
            element: <SettingPage/>,
        },

    ]
};