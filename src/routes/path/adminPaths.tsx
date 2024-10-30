import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("../../pages/Admin/Dashboard"));
const AllCourses = lazy (() => import("../../pages/Admin/allcourses"));
const CoursesLog = lazy (() => import("../../pages/Admin/courselog"));
const PendingCourses = lazy (() => import("../../pages/Admin/PendingCourses"));
const PurchaseLog = lazy (() => import("../../pages/Admin/purchaselog"));
const CategoryManagement = lazy (() => import("../../pages/Admin/CategoryManagement"));
const RequestManagement = lazy (() => import("../../pages/Admin/RequestManagement"));
const UserManagement = lazy (() => import("../../pages/Admin/UserManagement"));
const PayoutManagement = lazy (() => import ("../../pages/Admin/PayoutManagement"));

export const adminPaths: Record<string, RouteObject[]> = {
    [ROUTER_URL.ADMIN.DASHBOARD]: [
        {
            index: true,
            element: <Dashboard/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.ALLCOURSES ,
            element: <AllCourses/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.COURSESLOG,
            element: <CoursesLog/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.PENDINGCOURSES ,
            element: <PendingCourses/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.PURCHASELOG ,
            element: <PurchaseLog/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.CATEGORY ,
            element: <CategoryManagement/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.REQUESTMANAGEMENT ,
            element: <RequestManagement/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.USERMANAGEMENT ,
            element: <UserManagement/>,
        },
        {
            index: false,
            path: ROUTER_URL.ADMIN.PAYOUTMANAGEMENT ,
            element: <PayoutManagement/>,
        },
    ]
};