import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AdminLayout } from "../../layout";
const Dashboard = lazy(() => import("../../pages/admin/Dashboard"));
const AllCourses = lazy (
    () => import("../../pages/admin/allcourses")
)
const CoursesLog = lazy (
    () => import("../../pages/admin/courselog")
)
const PendingCourses = lazy (
    () => import("../../pages/admin/PendingCourses")
)
const PurchaseLog = lazy (
    () => import("../../pages/admin/purchaselog")
)
const CategoryManagement = lazy (
    () => import("../../pages/admin/CategoryManagement")
)
const RequestManagement = lazy (
    () => import("../../pages/admin/RequestManagement")
)
const UserManagement = lazy (
    () => import("../../pages/admin/UserManagement")
)
const PayoutManagement = lazy (
    () => import ("../../pages/admin/PayoutManagement")
)

const adminRoutes: RouteObject[] = [
{
    path: "/admin",
    element: <AdminLayout/>,
    children: [
        { index: true , element:<Dashboard/>},
        { path: "all-courses", element:<AllCourses/>},
        { path: "courses-log", element: <CoursesLog/>},
        { path: "pending-courses", element: <PendingCourses/>},
        { path: "purchase-log", element: <PurchaseLog/>},
        { path: "category-management", element: <CategoryManagement/>},
        { path: "request-management", element: <RequestManagement/>},
        { path: "user-management", element: <UserManagement/>},
        { path: "payout-management", element: <PayoutManagement/>}
    ],
},
]
export default adminRoutes;
