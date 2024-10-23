import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { StudentLayout } from "../../layout/studentLayout";
const StudentDashboard = lazy(() => import("../../pages/Student/dashboard"));
const OrderPage = lazy(() => import("../../pages/Student/order"));
const SettingPage = lazy(() => import("../../pages/Student/setting"));
const SubscriptionPage = lazy(() => import("../../pages/Student/view-subscription"));
const CheckoutPage = lazy(() => import("../../pages/Student/order/checkout"));

const studentRoutes: RouteObject[] = [
    {
        path: "/student",
        element: <StudentLayout/>,
        children: [
            { index: true , element:<StudentDashboard/>},
            { path: "order", element:<OrderPage/>},
            { path: "setting", element: <SettingPage/>},
            { path: "subscription", element: <SubscriptionPage/>},
            { path: "order/checkout", element: <CheckoutPage/>},
        ],
    },
    ]
    export default studentRoutes;